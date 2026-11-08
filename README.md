# For You ✦ A Little Universe of Us

A cinematic, animated love-confession website.
Scroll-driven story: intro → four chapters → the final question → celebration 🎉

---

## 🚀 Deploy to Vercel (recommended — free)

### Option 1: Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login          # opens your browser
vercel --prod         # deploy! (run from inside this folder)
```

You'll get a live URL like `https://for-you-website.vercel.app`

### Option 2: GitHub + Vercel (auto-updates later)

1. Create a repo at https://github.com/new
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "For you"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. Go to https://vercel.com/new → Import the repo → Deploy

### Custom domain (optional, ~$10/yr)

Buy a domain (Namecheap / Cloudflare) → Vercel Dashboard → your project →
Settings → Domains → add it. Done.

---

## 💻 Run locally (to preview or edit)

Requires [Node.js 18+](https://nodejs.org).

```bash
npm install
npm run dev          # open http://localhost:3000
```

---

## 💌 Where to edit the words

All the text lives in `src/components/confession/`:

| File | What it says |
|---|---|
| `intro-scene.tsx` | Opening lines ("hey, you ✦" / "There's something I've been aching to tell you...") |
| `chapter-one.tsx` | Word-by-word reveal lines |
| `chapter-two.tsx` | Constellation chapter |
| `chapter-three.tsx` | Heartbeat / ECG chapter |
| `chapter-four.tsx` | Typewriter love letter ← **edit your personal letter here** |
| `finale.tsx` | The question, Yes/No buttons, celebration text |

Also update the page title in `src/app/layout.tsx` (metadata).

> Tip: after editing, just redeploy (`vercel --prod` again) and the changes go live.

---

## ✨ Tech

Next.js 16 · React 19 · Tailwind CSS 4 · Framer Motion · Canvas particle fireworks
