# FactsWrangler

Portfolio site for Guilherme Oliveira, a data engineer and analyst.
Built with Next.js (App Router), Tailwind CSS v4 and MDX, and deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
```

## Where things live

| What | Where |
| --- | --- |
| Your name, tagline, email, booking link, services, testimonials, about, experience | `site.config.ts` |
| Projects (one file each) | `content/projects/*.mdx` |
| Interactive demos | `components/demos/*.tsx` |
| Components usable inside MDX | `components/mdx/index.tsx` |
| Colours (light and dark) | `app/globals.css` (`--accent` changes the brand colour) |
| CV | `public/cv.pdf` |
| Project cover images | `public/projects/` |

## Add a project

1. Copy `content/projects/_template.mdx` to `content/projects/my-project.mdx`.
   The file name becomes the URL: `/projects/my-project`.
2. Fill in the frontmatter (`title`, `summary` and `date` are required; everything else is optional).
3. Write the case study in Markdown. You can use these components:
   - `<Video src="https://www.loom.com/share/..." />` (YouTube, Loom or Vimeo)
   - `<Callout title="Key insight">...</Callout>`
   - `<Columns><Card title="Before">...</Card><Card title="After">...</Card></Columns>`
   - any registered demo, e.g. `<ForecastDemo />`
4. Set `draft: true` while you're working on it. Drafts show in `npm run dev` but not in production.

If you set `video:` in the frontmatter, the walkthrough is shown at the top of the page in place of the cover.

## Add an interactive demo

1. Create `components/demos/my-demo.tsx`:

   ```tsx
   "use client";
   import { useState } from "react";
   import { DemoFrame } from "../mdx/blocks";

   export function MyDemo() {
     const [n, setN] = useState(0);
     return (
       <DemoFrame title="My demo">
         <button onClick={() => setN(n + 1)}>Clicked {n} times</button>
       </DemoFrame>
     );
   }
   ```

2. Register it in `components/mdx/index.tsx`.
3. Use `<MyDemo />` in any project's MDX and set `interactive: true` in its frontmatter.

## Deploy

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new) and accept the defaults.
Every push to `main` deploys automatically.
