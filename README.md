# Cloud Bridge Tours & Travels — Website

React + Vite build of the Cloud Bridge Figma design. Rebuilt from `Root.svg` and the
Figma PDF export, with all layout, spacing and colours matched to the design.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Node 18+ required.

---

## 1. Read this first — the icon situation

**The icons in your Figma file are not vectors.** They are small raster PNGs that
were pasted into the design. I confirmed this by parsing `Root.svg` and extracting
all 169 embedded images with their native resolutions:

| Asset group | Native resolution inside Figma |
|---|---|
| Booking tabs / form field icons | 23×26 – 31×27 px |
| Service icons | 64×72 – 79×75 px |
| Star rating icons | 7×7 px |
| Social icons | 42×46 – 52×48 px |
| Feature bar icons | 60×60 – 63×63 px |

Exporting from Figma at 2x or 3x **will not fix this**. Figma would upscale a 26px
bitmap, which produces a larger blurry file, not a sharper one. The limitation is in
the design file itself.

**What I did instead:** every UI icon is now a real vector SVG. There are 41 of them,
drawn to match the shapes in your design, using your navy `#0E2A5C` and gold `#C69543`.
They are sharp at any size and on any screen, they can be recoloured with CSS, and
none of them can go missing.

They ship in two forms:

- `src/components/Icon.jsx` — inline SVG, used by the site. No network request, no
  broken-image states.
- `public/icons/*.svg` — the same 41 icons as standalone files, in case you want them
  elsewhere (email templates, print, another project).

Usage:

```jsx
import Icon from './components/Icon.jsx';

<Icon name="plane" size={24} />
```

Colour is inherited from CSS `color`, so `.services__icon { color: var(--gold); }`
recolours it. Full list in `ICON_NAMES` exported from the same file.

---

## 2. Icon reference

| Name | Used in |
|---|---|
| `phone`, `mail`, `pin`, `globe` | Header call block, footer contact |
| `facebook`, `instagram`, `youtube`, `tiktok` | Footer socials |
| `plane`, `hotel`, `briefcase`, `kaaba` | Booking card tabs |
| `pin`, `swap`, `calendar`, `user`, `search` | Booking card form fields |
| `tag-price`, `handshake`, `headset`, `shield-check` | Hero trust badges |
| `cursor-click`, `compass`, `percent-deal`, `headset` | Feature strip |
| `plane`, `hotel`, `kaaba`, `map`, `visa-doc`, `insurance`, `bus`, `headset` | Services (8) |
| `car`, `bed`, `binoculars`, `utensils` | Package amenity row |
| `clock`, `pin` | Package duration and location |
| `tag-price`, `handshake`, `sliders`, `headset`, `lock`, `users` | Why Choose Us (6) |
| `star` | Testimonial ratings |
| `chevron-left`, `chevron-right`, `arrow-right` | Sliders and links |
| `menu`, `close` | Mobile drawer |
| `plane` | Section heading divider |

---

## 3. Where every image came from

Photos are still raster — they have to be. Here is the exact source of each file
now in `public/`:

### Good quality — no action needed

| File | Source | Resolution |
|---|---|---|
| `images/hero-bg.jpg` | `Cloud_Bridge_Images/header.png` | 1774×887 |
| `images/about-1.jpg` | `Cloud_Bridge_Images/About Us.png` | 1200×800 |
| `icons/logo-footer.png` | `Root.svg` (embedded) | 1024×1024 |
| `icons/logo-mark.png` | `Cloud_Bridge_Images/logo.png` | 1024×1024 |
| `images/pkg-*.jpg` (5 files) | `Root.svg` (embedded) | ~428×240 |
| `images/avatar-*.jpg` (3 files) | `Root.svg` (embedded) | ~133×133 |
| `images/about-3.jpg` | `Root.svg` (embedded) | 284×459 |

### Acceptable but tight

| File | Resolution | Note |
|---|---|---|
| `images/partner-*.png` (5 files) | 47×55 – 87×71 | Shown at max 40px tall, so they hold up. Replace with official press-kit SVGs when you can. |
| `images/about-2.jpg` | 119×151 | Small tile in the collage. Noticeable but not terrible. |

### Confirmed too small — these need replacing

Measured in the browser at 1440px, these are the only assets being stretched:

| File | Source | Displayed | Stretch |
|---|---|---|---|
| `images/dest-turkey.jpg` | 87px wide | 177px | **2.0×** |
| `images/dest-malaysia.jpg` | 88px | 177px | **2.0×** |
| `images/dest-switzerland.jpg` | 87px | 177px | **2.0×** |
| `images/dest-dubai.jpg` | 87px | 177px | **2.0×** |
| `images/dest-saudi-arabia.jpg` | 89px | 177px | **2.0×** |
| `images/dest-baku.jpg` | 90px | 177px | **2.0×** |
| `icons/logo.png` (header) | 95px | 106px | 1.1× |

On a retina phone the destination cards are effectively being stretched 4×. They
will look visibly soft.

---

## 4. What you still need to supply

Nothing here breaks the site. Every one of these has a working fallback already in
place — the layout holds its shape and shows a neutral placeholder.

### 4.1 Destination photos — 6 files, **highest priority**

Drop into `public/images/` keeping the exact filenames. Portrait, roughly **600×800**.

- `dest-turkey.jpg`
- `dest-malaysia.jpg`
- `dest-switzerland.jpg`
- `dest-dubai.jpg`
- `dest-saudi-arabia.jpg`
- `dest-baku.jpg`

These cannot be recovered from anything you sent — the source file only ever
contained them at 87px. You'll need the original photos.

### 4.2 Header logo

`public/icons/logo.png` is only 95px wide. Export the header logo from Figma at
**400×190 or larger**, transparent PNG, same filename. If you have the logo as an
`.ai`, `.eps` or `.svg`, use that instead — put it at `public/icons/logo.svg` and
change the extension in `src/components/Navbar.jsx`.

### 4.3 Partner airline logos — optional upgrade

`public/images/partner-*.png` currently come from the design at 47–87px. Official
press-kit SVGs from each airline would be sharper and are freely available:

- `partner-emirates.png`
- `partner-qatar.png`
- `partner-turkish.png`
- `partner-saudia.png`
- `partner-pia.png`

If a logo file is missing, the airline name shows as text instead — the row does
not break.

### 4.4 About collage middle image

`public/images/about-2.jpg` is 119×151. A **700×700** replacement would help.

### 4.5 Not in your design — skipped deliberately

- **Blog section.** The nav links to `#blog` but no blog section exists in the Figma
  design, so none was built. Remove the link from `navLinks` in `src/data.js` or
  build the section.
- **Fourth testimonial.** The design shows 3 review cards. If you want a 4th, add it
  to `testimonials` in `src/data.js` along with `images/avatar-<name>.jpg`.

---

## 5. Editing content

Everything is in **`src/data.js`** — one file, no component edits needed.

| What | Key |
|---|---|
| Phone, email, address, website | `company` |
| Menu items | `navLinks` |
| Hero heading and trust badges | `hero` |
| Feature strip | `features` |
| Services grid | `services` |
| Destination cards and prices | `destinations` |
| About text, stats, badge | `about` |
| Packages, prices, amenities | `packages` |
| Why Choose Us items | `whyChooseUs` |
| Reviews | `testimonials` |
| Airline logos | `partners` |
| Footer columns | `footer` |

Adding a destination or package is a copy-paste of one object into the array. The
grid adjusts itself.

---

## 6. Colours and fonts

| Token | Value | Used for |
|---|---|---|
| `--navy` | `#0E2A5C` | Buttons, Why Choose Us band, headings |
| `--navy-deep` | `#0A1F45` | Footer |
| `--gold` | `#C69543` | Eyebrows, Book Now, Subscribe, accents |
| `--gold-light` | `#E8C987` | Hero script text "Our Priority" |
| `--bg-alt` | `#F5F7FC` | Alternating section backgrounds |
| `--ink` | `#16233A` | Headings |
| `--body` | `#4A5568` | Body copy |

Fonts load from Google Fonts in `index.html`: **Poppins** for everything, **Yellowtail**
for the hero script line.

All tokens live in `src/styles/tokens.css`. Change a value there and it propagates
site-wide.

---

## 7. Structure

```
cloud-bridge/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── icons/          41 vector SVGs + logo.png, logo-footer.png,
│   │                   logo-mark.png, favicon.png
│   └── images/         25 photos
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js         ← all content
    ├── styles/         ← one stylesheet per component (see below)
    │   ├── tokens.css       colours, spacing, fonts (:root variables)
    │   ├── base.css         reset + global element defaults
    │   ├── layout.css       .container, .section, shared helpers
    │   ├── buttons.css      .btn and its variants
    │   ├── Navbar.css       ┐
    │   ├── Hero.css         │
    │   ├── BookingCard.css  │
    │   ├── FeatureBar.css   │
    │   ├── SectionHeading.css
    │   ├── Services.css     ├─ each file is named after its component and
    │   ├── Destinations.css │  holds that component's rules AND its own
    │   ├── About.css        │  media queries — nothing global in here
    │   ├── Packages.css     │
    │   ├── WhyChooseUs.css  │
    │   ├── Testimonials.css │
    │   ├── Partners.css     │
    │   └── Footer.css       ┘
    └── components/
        ├── Icon.jsx           vector icon set
        ├── Img.jsx            image with missing-file fallback
        ├── SectionHeading.jsx eyebrow + title + plane divider
        ├── Navbar.jsx         sticky header + mobile drawer
        ├── Hero.jsx           headline, badges, background
        ├── BookingCard.jsx    tabs + form (inside the hero, right side)
        ├── FeatureBar.jsx
        ├── Services.jsx
        ├── Destinations.jsx
        ├── About.jsx
        ├── Packages.jsx
        ├── WhyChooseUs.jsx
        ├── Testimonials.jsx   auto-rotating, pauses on hover
        ├── Partners.jsx
        └── Footer.jsx
```

---

## 8. Responsive behaviour

Verified in Chromium at each width — no horizontal overflow at any breakpoint.

| Width | Layout |
|---|---|
| **1200px+** | As designed. Booking card sits inside the hero on the right. 8 services, 6 destinations, 5 packages, 6 why-items per row. |
| **992–1200px** | Services 4/row, destinations 3/row, packages 3/row, why 3/row. Booking card narrows to 400px. |
| **768–992px** | Nav collapses to a hamburger drawer. Hero stacks — headline first, booking card below. Testimonials show one card. |
| **576–768px** | Services 2/row, destinations 2/row, packages 2/row, footer 2 columns, About collage stacks. |
| **< 576px** | Single column throughout. Booking tabs 2×2. From/To stack with a full-width swap button. |

Also handled: visible keyboard focus rings, `prefers-reduced-motion` respected,
`aria-label` on icon-only buttons, `role="tablist"` on the booking tabs.

---

## 9. Still wired to nothing

Three things are UI-only and need connecting to your backend:

1. **Search Flights** — `submit()` in `src/components/BookingCard.jsx` currently
   only `console.log`s. Point it at your API or a WhatsApp deep link.
2. **Newsletter Subscribe** — `subscribe()` in `src/components/Footer.jsx` sets a
   local success message. Point it at Mailchimp or your own endpoint.
3. **Book Now / View All / Get a Quote** — all link to `#contact`. If you build
   separate pages, install `react-router-dom` and swap these for `<Link>`.

---

## 10. Two known deviations from the Figma file

1. **Icon shapes.** The vector icons match the meaning and weight of your design's
   icons but are redrawn, not traced. A few differ slightly in detail. This was the
   trade for sharpness — see section 1.
2. **Trip-type radio labels.** The design's first radio has no visible label. It is
   labelled "One Way" here, since an unlabelled radio button is not usable. Change
   it in `src/components/BookingCard.jsx` if you want it blank.


---

## 9. Styling architecture

The old single `styles.css` has been split. Two layers:

**Global layer** — imported once, in this exact order, at the top of `src/main.jsx`:

```js
import './styles/tokens.css'   // :root design tokens
import './styles/base.css'     // reset + element defaults
import './styles/layout.css'   // .container, .section, .icon, .img-fallback
import './styles/buttons.css'  // .btn, .btn--navy, .btn--gold, .btn--sm
import App from './App.jsx'    // must come AFTER the CSS above
```

The `App` import comes last on purpose. ES modules evaluate in declaration order,
so this guarantees the global sheets are injected before any component sheet.
Component rules then win on equal specificity instead of losing at random.

**Component layer** — every component imports its own sheet:

```js
// src/components/Navbar.jsx
import '../styles/Navbar.css';
```

Rules of thumb when editing:

- A component's media queries live in that component's file, not in a shared
  responsive block. If you delete a component, its CSS leaves with it.
- When a component needs to override a `.btn` rule, use a compound selector
  (`.btn.nav__cta`, `.btn.bookcard__submit`). Bundlers reorder files; compound
  selectors are order-proof.
- Anything genuinely shared by three or more components belongs in the global
  layer, not copy-pasted into each file.
