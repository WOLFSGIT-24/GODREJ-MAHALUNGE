# Godrej Mahalunge

Landing site for **Godrej Mahalunge**, French-inspired luxury living in West Pune. Premium 3 BHK residences & limited 4 BHK duplex homes starting ₹1.90 Cr onwards*.

Built with Astro, React and Tailwind CSS.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build for production

Set the live domain so canonical URLs, `sitemap.xml`, `robots.txt` and social-share previews use absolute links:

```bash
SITE_URL=https://www.your-domain.com npm run build      # macOS / Linux
$env:SITE_URL="https://www.your-domain.com"; npm run build   # Windows PowerShell
```

The static site is written to `dist/`.

## Pages

| Path | Purpose |
|---|---|
| `/` | Landing page |
| `/thank-you` | Shown after a successful enquiry (not indexed) |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms & Conditions |
