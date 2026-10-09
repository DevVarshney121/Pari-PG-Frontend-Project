# Pari PG Frontend Website

A responsive multi-page frontend built using HTML5, CSS3 and vanilla JavaScript only.

## Pages
- `index.html` — Home
- `about.html` — About Pari PG
- `rooms.html` — Room listings, demo prices, filters and details modal
- `facilities.html` — Facility categories and meal inspiration
- `gallery.html` — Category filters and image lightbox
- `contact.html` — Contact form demo, WhatsApp preparation and Google Maps location

## Run
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Use the Live Server extension and open `index.html`.
4. Most navigation works from local files too; Live Server is recommended.

## Configure real contact details
Open `js/main.js` and update:
- `whatsappNumber`: country code plus number, digits only (example format `91XXXXXXXXXX`)
- `phoneDisplay`
- `email`

The address is configured as:
`Pari PG, B-132, Beta 1, near Jagat Farm, Greater Noida, Uttar Pradesh, India`

Google Maps uses a search query for that address. Verify the correct property pin before publishing.

## Important content notes
- Room prices (₹7,000 / ₹8,000 / ₹9,000 / ₹11,000) are demo placeholders, not verified current rates.
- Images are external Unsplash stock/inspiration images and are not verified photos of the actual Pari PG property. Replace with real property images before publishing.
- Some facility descriptions are intentionally phrased as items to confirm.
- Testimonials, real occupancy counts, contact details and social accounts are not fabricated.
- The Submit Inquiry button is frontend-only. It stores a temporary demo copy in the browser session and does not send data to a server.
- WhatsApp opens only after a real number is added to `js/main.js`; the user must press Send inside WhatsApp.
- Form verification, CAPTCHA, backend integration and database storage are not included, as requested.

## Interactions included
- Floating WhatsApp button on every page (configure the real number first)
- Distinct page-specific banner styling while keeping the blue-gradient brand
- Responsive mobile navigation
- Room type filters
- Room details modal
- Gallery filters and lightbox (previous/next, Escape to close)
- FAQ accordions
- Contact form browser validation
- WhatsApp message preparation
- Demo-only submit notice
- Google Maps embed and directions links
- Back-to-top button

## Project structure
```
pari_pg_website/
├── index.html
├── about.html
├── rooms.html
├── facilities.html
├── gallery.html
├── contact.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        └── README.txt
```
