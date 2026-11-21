# Aurem Capital

Premium one-page corporate website for Aurem Capital — a financial trading and market research company.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Playfair Display + Inter

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/` — Next.js App Router pages and layouts
- `src/components/sections/` — Full-width page sections
- `src/components/ui/` — Reusable UI components
- `src/components/layout/` — Navbar and Footer
- `src/lib/` — Constants, metadata, and utilities
- `src/fonts/` — Font configuration
- `public/` — Static assets (logo, images)

## Content

All placeholder copy is centralized in `src/lib/constants.ts` for easy replacement with verified company information.

## Lead delivery

The lead form posts to the server-only `POST /api/leads` Route Handler. The handler validates the submission and sends the inquiry to `info@aurem.trade` through the official Hostinger mailbox using Nodemailer and SMTP. No SMTP credentials are included in the client bundle.

Create a root-level `.env.local` file with:

```bash
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@aurem.trade
SMTP_PASSWORD=
LEAD_TO_EMAIL=info@aurem.trade
```

Port `465` uses an SSL/TLS connection from the start (`secure: true`). `SMTP_USER` is used as the authenticated account and sender address, while the submitted lead email is set as `Reply-To`.

Keep `SMTP_PASSWORD` only in local or deployment environment configuration and never commit it. Without all five variables, the form remains visible and validates normally, but the server returns a configuration error and does not claim that the inquiry was delivered.

## Pending production assets

SEO metadata currently references `/og-image.jpg`, but that verified brand asset has not yet been supplied. Add a 1200×630 approved Open Graph image before production launch.

## Blog and Sanity Studio

Run `npm run dev` and `npm run studio` in separate terminals. The public blog is at
[localhost:3000/blog](http://localhost:3000/blog) and the standalone Studio is at
[localhost:3333](http://localhost:3333). Studio and the website use Sanity project
`7hwvx32u` and the public `production` dataset.

- Studio requires Node.js 22.12 or later. Sign in with a Sanity account that
  belongs to the project and can publish. The project allows
  `http://localhost:3333` with credentials. If you change the port or host, add
  the new origin under the API CORS settings in [Sanity Manage](https://www.sanity.io/manage).
- Select **مقال جديد**, enter the article and cover details, then type the part
  after `/blog/`, such as `market-outlook`. Studio saves edits as a draft.
  The permalink can be edited until the first publication, which locks it.
  Publish when the article is ready. The blog index and sitemap revalidate
  every 60 seconds without a redeployment. Individual articles load on demand.
- For private preview, create a read-only (Viewer) Sanity API token. Put it in
  the site's server environment as `SANITY_API_READ_TOKEN` (root `.env.local`
  locally), then restart Next.js. After entering the permalink and letting
  Studio save the draft, click **معاينة** beside **Publish**. Visitors and the sitemap always use the published
  perspective. Draft text is private, while uploaded images use Sanity's public CDN.
- On hosting, set the site's `SITE_URL` to the confirmed production origin and
  run Next.js with server support. Build the Studio separately with
  `npm run studio:build` and host `studio/dist`, or use Sanity's hosted Studio.
  Set the Studio build variable `SANITY_STUDIO_PREVIEW_URL` to the public site's
  origin and add the hosted Studio origin to Sanity CORS with credentials.
  Keep the read token in the Next.js server environment only.
