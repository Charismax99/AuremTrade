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
