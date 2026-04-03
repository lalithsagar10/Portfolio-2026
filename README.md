# Portfolio

Personal site for **Lalith Sagar Kambala** — software engineer portfolio built with the Next.js App Router, TypeScript, and Tailwind CSS v4.

## Tech stack

| Area        | Choice                          |
| ----------- | ------------------------------- |
| Framework   | Next.js 16 (App Router)         |
| UI          | React 19, Tailwind CSS 4        |
| Fonts       | DM Sans, Fraunces (Google Fonts)|
| Tooling     | TypeScript 5, ESLint            |

## Requirements

- **Node.js** ≥ 20.9.0

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm install`  | Install dependencies     |
| `npm run dev`  | Dev server → `:3000`     |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

After `npm run dev`, open [http://localhost:3000](http://localhost:3000).

## Customizing content

Almost all copy, links, and media paths live in **`lib/content.ts`**:

- **`site`** — name, role, tagline, contact, social links, résumé PDF, hero video path & location caption
- **`summary`** — About / Summary section (`kicker` + `paragraphs`)
- **`travelMoments`** — Travel carousel entries (`/videos/...` under `public/videos/`)
- **`experience`**, **`education`**, **`projects`**, **`skills`**, **`achievements`** — respective sections

### Static assets

| Location            | Use case                          |
| ------------------- | --------------------------------- |
| `public/videos/`    | Hero background + travel clips    |
| `public/Resume/`    | Résumé PDF                        |
| `public/companies/` | Logos referenced in content       |

Hero video: prefer **MP4 (H.264)** for broad browser support; see comments in `content.ts` for `.mov` caveats.

## Project layout

```
app/           # App Router — layout, page, global styles
components/    # UI sections (Hero, Header, Travel, etc.)
lib/           # content.ts, video MIME helper
public/        # Static files served as-is
```

## Deploy

Deploy like any Next.js app — e.g. [Vercel](https://vercel.com) or your host of choice. Ensure **`public/`** assets and any env vars your host needs are included in the build.

---

© Lalith Sagar Kambala
