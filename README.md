# Credix Loan Marketplace

React + TypeScript + Vite + Tailwind CSS project prepared for Netlify.

## Run locally
1. Install Node.js (LTS).
2. Run `npm install`.
3. Run `npm run dev`.

## Production build
Run `npm run build`. The generated website is in `dist/`.

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`

The included `netlify.toml` already configures these values.

## Important before publishing
This package is a frontend-only project. It does not include a backend, real lender integrations, customer database, authentication service, or actual loan approval/disbursal workflow. Verify all lender-partner, regulatory, registration, security, pricing, and rate claims before making the site public. Do not collect real customer financial or identity data without a properly secured backend and appropriate compliance review.
