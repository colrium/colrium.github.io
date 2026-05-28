# Mutugi Portfolio

A personal portfolio for Mutugi, a Nairobi-based software engineer. The site presents selected work, experience, skills, process, credentials, and contact details through a custom single-page Next.js application.

## What Is Inside

- Custom hero section with an interactive SpiderWeb visual.
- Selected work covering non-profit CRM, fixed-asset tracking, and climate-accounting experiments.
- Skills, experience, impact highlights, credentials, and engagement sections.
- Contact section for starting a project conversation.
- Responsive layout styled with Tailwind CSS.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl
- Material Symbols

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/app/                  App entry, layout, global styles, and metadata
src/components/sections/  Portfolio page sections
src/components/ui/        Reusable interactive and visual UI components
```

The main page composition lives in `src/app/page.tsx`.
