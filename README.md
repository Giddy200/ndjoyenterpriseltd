# NDJOY Enterprise Limited — Website

A responsive, multi-page HTML/CSS/JavaScript website using the supplied company logo and a navy / electric-blue / cyan visual identity.

The homepage includes image-led service highlights, and every page hero cycles through three subtle background photos every seven seconds. Photos are loaded from Unsplash and require an internet connection.

The customer-care chat widget provides scripted answers based on the information published on this website and can carry enquiry details into the quote form for the current browser session. It does not connect to a live agent or send/store messages. The quote form prepares an email in the visitor's email app; configure a verified destination email or a secure server-side form service before launch to receive enquiries reliably.

## Pages
- `index.html` — Home
- `about.html` — About the company
- `contact.html` — Contact information and enquiry form
- `quote.html` — Quote and service booking request
- `services/construction-materials.html` — Wholesale wood, construction materials and sanitary equipment
- `services/hardware-retail.html` — Hardware, paints and glass
- `services/staffing.html` — Temporary employment agency services
- `services/cleaning.html` — General building cleaning

## Run locally
Open `index.html` in a browser, or use the VS Code Live Server extension for a local preview.

## Important before launch
1. The company details on the site are based on the Companies House public record accessed on 2 November 2026:
   - NDJOY ENTERPRISE LIMITED
   - Company number: 17542338
   - Registered office: 61 Bridge Street, Kington, United Kingdom, HR5 3DJ
   - Status: Active
   - Incorporated: 26 October 2026
   - SIC codes: 46730, 47520, 78200, 81210
2. No public phone number, customer email, trading hours, or customer-facing service area was supplied, so the site does not invent any. Add these before launch.
3. The quote/contact forms validate input and prepare an email using the visitor's default mail app (`mailto:`). This is a front-end starter, not a secure server-side submission system. For reliable lead capture, connect the forms to a backend/API or a form provider and configure email delivery, spam protection, consent/privacy wording, and secure storage.
4. Review the service descriptions and confirm the exact services, coverage, pricing, and any relevant insurance/certifications before publishing.
5. Add a privacy notice and cookie notice if required for the final deployment and analytics/cookie choices.

## Structure
```text
ndjoy-enterprise-website/
├── assets/
│   ├── ndjoy-mark.png
│   ├── ndjoy-logo.png
│   ├── styles.css
│   └── script.js
├── services/
│   ├── construction-materials.html
│   ├── hardware-retail.html
│   ├── staffing.html
│   └── cleaning.html
├── index.html
├── about.html
├── contact.html
├── quote.html
└── README.md
```
