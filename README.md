# AI Blog Generator 🚀

An open-source, AI-powered personal website & blog platform. Push your markdown drafts and let AI generate polished, publication-ready blog posts automatically.

**[Live Demo](https://your-site.vercel.app)** · **[Deploy Your Own](#-quick-start)**

---

## ✨ Features

- 🎨 **Beautiful UI** — Modern design with shadcn/ui, dark/light mode, glassmorphism effects
- 🤖 **AI Blog Generation** — Push `.md` drafts → AI generates polished blog posts automatically
- 🔄 **Dual AI Support** — Works with both **Google Gemini** (free tier) and **Anthropic Claude**
- 📝 **Rich Markdown** — Syntax highlighting, embedded videos, tables, images
- ⚡ **One-Click Deploy** — Fork, configure, deploy to Vercel in minutes
- 📱 **Fully Responsive** — Looks great on desktop, tablet, and mobile
- 🔍 **SEO Optimized** — Meta tags, Open Graph, structured data
- 📄 **Resume Page** — Timeline-style resume pulled from config
- 💼 **Projects Page** — Showcase your work with filterable project cards

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: Google Gemini / Anthropic Claude
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel
- **Content**: Markdown with gray-matter

## 🚀 Quick Start

### 1. Fork & Clone

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ai-blog.git
cd ai-blog
npm install
```

### 2. Configure Your Site

Edit `site.config.ts` with your details:

```typescript
export const siteConfig = {
  name: "Your Name",
  profession: "Your Profession",
  tagline: "Your tagline",
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://x.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "you@example.com",
  },
  // ... projects, resume, etc.
};
```

### 3. Set Up AI (GitHub Secrets)

Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Description |
|---|---|
| `GEMINI_API_KEY` | Get from [Google AI Studio](https://aistudio.google.com/apikey) (free) |
| `CLAUDE_API_KEY` | Get from [Anthropic Console](https://console.anthropic.com/) (paid) |

Also set the **Variable** (under Variables tab):
| Variable Name | Value |
|---|---|
| `AI_PROVIDER` | `gemini` or `claude` |

### 4. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-blog)

Or manually:
```bash
npm i -g vercel
vercel
```

### 5. Start Blogging!

```bash
# Create a draft
echo "# My First Analysis\n\nKey findings: ..." > blog_drafts/my-analysis.md

# Push it
git add blog_drafts/my-analysis.md
git commit -m "New draft: my analysis"
git push
```

The GitHub Action will:
1. ✅ Detect the new draft
2. 🤖 Generate a polished blog post using AI
3. 📝 Save it to `content/blog/`
4. 🚀 Auto-trigger Vercel rebuild

## 📁 Project Structure

```
ai-blog/
├── .github/
│   └── workflows/
│       └── generate-blog.yml    # GitHub Action for AI blog generation
├── blog_drafts/                 # 📝 Put your drafts here!
│   └── sample-draft.md
├── content/
│   └── blog/                    # 📄 Generated blog posts (auto-generated)
│       └── getting-started.md
├── public/
│   └── images/                  # 🖼️ Images (blog covers, avatar)
├── scripts/
│   └── generate-blog.mjs       # 🤖 AI generation script
├── src/
│   ├── app/                     # 📱 Next.js pages
│   │   ├── page.tsx             # Home
│   │   ├── blog/                # Blog listing & posts
│   │   ├── projects/            # Projects showcase
│   │   └── resume/              # Resume/CV
│   ├── components/              # 🧩 Reusable components
│   └── lib/                     # 🔧 Utilities
├── site.config.ts               # ⚙️ Your site configuration
└── package.json
```

## 📝 Writing Drafts

Your draft can be rough notes, data analysis, or structured content:

```markdown
# My Research on AI Trends

## Key Findings
- LLM costs dropped 90%
- Open-source models catching up

## Data
| Metric | 2023 | 2024 |
|--------|------|------|
| Cost/1M tokens | $30 | $3 |
| Open-source accuracy | 70% | 92% |

## My Analysis
I believe the trend indicates...
```

### Including Media

- **Images**: Place `.png/.jpg/.webp` files in `blog_drafts/` alongside your markdown
- **Videos**: Paste YouTube URLs on their own line — they auto-embed
- **Charts**: Include as images or describe the data for AI to reference

## 🎨 Customization

### Theming
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --primary: 262 83% 58%;        /* Purple accent */
  --gradient-start: 262 83% 58%; /* Gradient from */
  --gradient-end: 330 81% 60%;   /* Gradient to */
}
```

### Adding Pages
Create new files in `src/app/` — Next.js App Router handles routing automatically.

### Changing AI Behavior
Edit the prompts in `scripts/generate-blog.mjs` to customize the AI's writing style, tone, or structure.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- ✨ Suggest features
- 📝 Improve documentation
- 🔧 Submit PRs

## 📄 License

MIT License — use it freely for personal or commercial projects.

---

Built with ❤️ and AI. Star ⭐ this repo if you find it useful!
