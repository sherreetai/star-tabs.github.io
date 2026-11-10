# Project structure

The short version: **`src/` is what Astro processes and turns into the website. `public/` is copied across untouched.**

```
sher-site/
├── src/                  ← the "source": everything Astro reads, processes and builds
│   ├── pages/            ← one file = one page on the site
│   ├── layouts/          ← page shells that pages sit inside
│   ├── components/       ← reusable building blocks (card, footer, media…)
│   ├── content/work/     ← the case studies, one .mdx file each
│   ├── content.config.ts ← the rules for what a case study file must contain
│   ├── styles/global.css ← colours, font, text styles, pop-in effect
│   └── site.ts           ← email + LinkedIn links
├── public/images/        ← images/videos, served exactly as-is
├── docs/                 ← notes like this one
├── dist/                 ← the finished website (generated, never edit)
├── node_modules/         ← downloaded tools like Astro and Tailwind (generated, never edit)
├── .github/workflows/    ← instructions GitHub follows to publish the site
├── astro.config.mjs      ← Astro settings (site address, plugins)
├── package.json          ← list of tools the project needs + the dev/build commands
└── README.md / CLAUDE.md ← editing guide for people, and conventions for AI tools
```

## Why `src` and `public` are separate

Astro is a **build tool**. The files in this project aren't the website itself. Astro reads them and *generates* plain HTML/CSS files into `dist/`, and `dist/` is what goes online.

- **`src/`** holds files that need processing. A `.astro` page gets combined with its layout, header and footer. A `.mdx` case study gets turned from Markdown into HTML. Tailwind scans everything and writes only the CSS that's actually used. None of these files would work if a browser opened them directly.
- **`public/`** holds files that need no processing. Astro copies them straight into the finished site, so `public/images/mercer/hero.jpg` ends up at `yoursite.com/images/mercer/hero.jpg`. That's why the case study files refer to images as `/images/...` with no `public` in the path.

## Inside `src/`, from big to small

1. **`pages/`**: the file and folder names *are* the site's addresses. Astro calls this file-based routing.
   - `index.astro` → `/`
   - `about.astro` → `/about/`
   - `work.astro` → `/work/`
   - `work/[slug].astro` → the square brackets mean "fill in the blank". This one file creates a page for every case study, e.g. `/work/mercer-us-health-blog/`.
2. **`layouts/`**: the shell a page sits inside.
   - `BaseLayout` is the `<head>`, header, footer and pop-in script, and every page uses it.
   - `CaseStudyLayout` adds the tinted intro, hero banner and "Next project" link on top of that.
3. **`components/`**: smaller pieces, each written once and used wherever needed. This is how the project cards avoid being duplicated: Home and Work both just say `<ProjectGrid />`.
4. **`content/work/`**: the *words and pictures* of each case study, kept separate from the *design*. A case study can be rewritten without touching any layout code. And because the cards read from these same files, there's only one place to update a project's title or cover.
5. **`content.config.ts`**: a checklist for case study files. If one is missing a `title`, or `order` isn't a number, the build stops and says exactly which file is wrong, instead of quietly showing a broken page.

## The generated folders

- **`node_modules/`** is created by `npm install` from the list in `package.json`.
- **`dist/`** is created by `npm run build`.

Both are listed in `.gitignore`, so they never go into git, and they can be deleted and regenerated at any time.

## How it all flows

```
npm run dev    →  Astro serves src/ + public/ live at localhost:4321 (reloads on save)
npm run build  →  Astro writes the finished site into dist/
git push       →  GitHub runs .github/workflows/deploy.yml, which runs the build and publishes dist/
```

This is the standard Astro layout, so AI tools and [Astro's own docs](https://docs.astro.build) will both recognise it straight away.
