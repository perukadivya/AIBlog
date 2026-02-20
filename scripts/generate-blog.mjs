/**
 * AI Blog Generator Script
 *
 * Reads a draft markdown/txt file from blog_drafts/,
 * sends it to an AI provider (Gemini or Claude),
 * and saves the generated blog post to content/blog/.
 *
 * Usage: node scripts/generate-blog.mjs <path-to-draft>
 *
 * Environment Variables:
 *   AI_PROVIDER   - "gemini" or "claude" (default: "gemini")
 *   GEMINI_API_KEY - Google Gemini API key
 *   CLAUDE_API_KEY - Anthropic Claude API key
 */

import fs from "fs";
import path from "path";

const DRAFT_PATH = process.argv[2];

if (!DRAFT_PATH) {
    console.error("Usage: node scripts/generate-blog.mjs <path-to-draft>");
    process.exit(1);
}

const AI_PROVIDER = process.env.AI_PROVIDER || "gemini";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

// ─── Read the draft ──────────────────────────────────────────
const draftContent = fs.readFileSync(DRAFT_PATH, "utf-8");
const draftName = path.basename(DRAFT_PATH, path.extname(DRAFT_PATH));

// Check for images in the same directory
const draftDir = path.dirname(DRAFT_PATH);
const imageFiles = fs.existsSync(draftDir)
    ? fs
        .readdirSync(draftDir)
        .filter((f) =>
            /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f)
        )
    : [];

const imageContext = imageFiles.length
    ? `\n\nThe author has included these images which should be referenced in the blog post:\n${imageFiles.map((f) => `- /images/blog/${f}`).join("\n")}`
    : "";

// ─── AI System Prompt ────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert blog post writer. Your job is to take a user's rough draft, notes, analysis, or data and transform it into a polished, engaging, and well-structured blog post.

Rules:
1. Keep the author's original voice, insights, and data points
2. Expand on their analysis with clear explanations
3. Add proper structure: introduction, sections with headers, conclusion
4. Keep technical accuracy — don't invent data or facts
5. Use engaging writing that's easy to read
6. Include relevant code examples if the topic is technical
7. Maintain a professional but conversational tone
8. If the draft includes image references, include them naturally in the post
9. Output ONLY the blog post content in Markdown format
10. Do NOT include frontmatter — it will be added separately

Your output should be a complete, ready-to-publish blog post in Markdown.`;

const USER_PROMPT = `Transform the following draft into a polished blog post. The draft may contain rough notes, data points, analysis, or incomplete thoughts. Turn it into a comprehensive, engaging article.

${imageContext}

---

DRAFT:

${draftContent}

---

Generate a complete, polished blog post in Markdown format. Do NOT include frontmatter (---) at the top.`;

// ─── Metadata prompt ─────────────────────────────────────────
const METADATA_PROMPT = `Based on the following blog draft, generate metadata in JSON format ONLY (no markdown, no explanation).

Draft: ${draftContent.substring(0, 1000)}

Return this exact JSON structure:
{
  "title": "A compelling, SEO-friendly title",
  "description": "A 1-2 sentence description for SEO",
  "tags": ["tag1", "tag2", "tag3"]
}`;

// ─── AI Providers ────────────────────────────────────────────

async function generateWithGemini(prompt, systemPrompt) {
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY not set");
    }

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemPrompt }],
                },
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 8192,
                },
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function generateWithClaude(prompt, systemPrompt) {
    if (!CLAUDE_API_KEY) {
        throw new Error("CLAUDE_API_KEY not set");
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": CLAUDE_API_KEY,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 8192,
            system: systemPrompt,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        }),
    });

    if (!response.ok) {
        throw new Error(`Claude API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || "";
}

async function generate(prompt, systemPrompt) {
    console.log(`Using AI provider: ${AI_PROVIDER}`);

    if (AI_PROVIDER === "claude") {
        return generateWithClaude(prompt, systemPrompt);
    }
    return generateWithGemini(prompt, systemPrompt);
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
    console.log(`\n📝 Processing draft: ${DRAFT_PATH}`);
    console.log(`📏 Draft length: ${draftContent.length} characters`);

    // Generate the blog post content
    console.log(`\n🤖 Generating blog post with ${AI_PROVIDER}...`);
    const blogContent = await generate(USER_PROMPT, SYSTEM_PROMPT);

    if (!blogContent) {
        throw new Error("AI returned empty content");
    }

    console.log(`✅ Generated ${blogContent.length} characters`);

    // Generate metadata
    console.log(`\n🏷️  Generating metadata...`);
    let metadata = {
        title: draftName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: "",
        tags: [],
    };

    try {
        const metadataRaw = await generate(METADATA_PROMPT, "Return only valid JSON, no markdown formatting.");
        // Extract JSON from potential markdown code blocks
        const jsonMatch = metadataRaw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            metadata = { ...metadata, ...parsed };
        }
    } catch (err) {
        console.warn("⚠️  Could not parse metadata, using defaults:", err.message);
    }

    // Build the final blog post with frontmatter
    const today = new Date().toISOString().split("T")[0];
    const slug = draftName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const fullPost = `---
title: "${metadata.title}"
date: "${today}"
tags: ${JSON.stringify(metadata.tags)}
description: "${metadata.description}"
coverImage: ""
---

${blogContent}
`;

    // Save to content/blog/
    const outputDir = path.join(process.cwd(), "content", "blog");
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(outputPath, fullPost, "utf-8");

    console.log(`\n🎉 Blog post saved to: ${outputPath}`);
    console.log(`   Title: ${metadata.title}`);
    console.log(`   Tags: ${metadata.tags.join(", ")}`);
    console.log(`   Date: ${today}`);
}

main().catch((err) => {
    console.error("\n❌ Error generating blog:", err.message);
    process.exit(1);
});
