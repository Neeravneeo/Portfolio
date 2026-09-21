# Your workplace has the answer. Just ask Dala for it. — Style Reference
> constellation floating on black velvet

**Theme:** dark

---

## 1. Aesthetic Direction

Dala operates as a dark-stage environment where black voids meet a single vivid violet accent, punctuated by amber sparks. Typography is monolithic and weightless — display sizes carry headlines at weight 400 with aggressive negative tracking (-0.04em), so headlines feel sculptural rather than informational. The visual centerpiece is a constellation of tiny multicolored triangular particles forming an organic brain shape, which acts as the brand's signature gesture: knowledge visualized as distributed intelligence rather than hierarchical data. Layout follows a spacious two-column rhythm — oversized left-aligned headlines paired with generous body copy, floating on pure black with no panels, borders, or cards. Components are intentionally reduced to their most essential form: one violet pill button, ghost text links, and large-format text blocks.

---

## 2. Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| **Void** | `#000000` | `--color-void` | Page canvas, section backgrounds, negative space — pure black is the dominant surface |
| **Bone White** | `#ffffff` | `--color-bone-white` | Headlines, body text, icon fills, nav active state |
| **Ash Gray** | `#9a9a9a` | `--color-ash-gray` | Muted nav text, ghost link color, secondary labels |
| **Silver Mist** | `#bdbdbd` | `--color-silver-mist` | Tertiary body text, caption-level information |
| **Electric Iris** | `#8052ff` | `--color-electric-iris` | Primary action buttons, logo mark, brand accents — the single saturated violet |
| **Saffron Spark** | `#ffb829` | `--color-saffron-spark` | Highlight emphasis text, accent links, attention punctuation |
| **Deep Verdant** | `#15846e` | `--color-deep-verdant` | Secondary surface tint, logo gradient stop |

---

## 3. Tokens — Typography

### Display Headings & Body Rules
- **Display sizes (78–113px):** Weight 400 with -0.04em tracking. Massive scale creates hierarchy, not font weight.
- **Body text (18px):** Weight 200 (ultra-light) — signature choice making paragraphs feel airy and non-aggressive.
- **Nav & small labels (14px):** Weight 600 with 0.025em tracking, uppercase.

### Type Scale

| Role | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|------|-------------|----------------|-------|
| caption | 400 | 12px | 1.5 | normal | `--text-caption` |
| nav-label | 600 | 14px | 1.2 | 0.35px | `--text-nav-label` |
| body | 200 | 18px | 1.5 | normal | `--text-body` |
| heading-2xs | 400 | 24px | 1.25 | -0.48px | `--text-heading-2xs` |
| heading-xs | 400 | 27px | 1.0 | normal | `--text-heading-xs` |
| subheading | 400 | 36px | 1.2 | normal | `--text-subheading` |
| heading-sm | 400 | 42px | 1.2 | -1.68px | `--text-heading-sm` |
| heading | 400 | 48px | 1.1 | -1.68px | `--text-heading` |
| heading-lg | 400 | 78px | 1.1 | -3.12px | `--text-heading-lg` |
| display | 400 | 113px | 1.1 | -4.52px | `--text-display` |

---

## 4. Tokens — Spacing & Radius

- **Base unit:** 6px
- **Radius:** 24px for buttons, cards, and nav elements; 9999px for full pills
- **Page max-width:** 1280px
- **Section gap:** 60–120px

---

## 5. Components

- **Primary Action Button:** Filled violet pill `#8052ff` (Electric Iris), white text, 22.5px radius, 14px weight 600 uppercase, tracking 0.025em.
- **Ghost Text Button:** Bare text link, `#ffffff` or `#9a9a9a`, no borders, weight 400.
- **Logo Lockup:** Triangular geometric icon in `#8052ff` with a gradient fade through `#15846e`, paired with white wordmark.
- **Hero Constellation Visualization:** Dense constellation cloud of thousands of tiny triangular glyphs (1–2px) in a full spectrum of vivid colors (violet, amber, teal, magenta, blue) forming an organic distributed intelligence / neural shape against pure black.

---

## 6. Do's and Don'ts

### Do
- Use `#8052ff` (Electric Iris) exclusively for filled action buttons.
- Set every headline at weight 400, never bold — achieve hierarchy through scale and tracking (-0.04em).
- Use weight 200 for 18px body text.
- Maintain pure `#000000` black as every section background.
- Let the particle constellation be the signature hero imagery.

### Don't
- Do not use filled violet (`#8052ff`) for large background blocks — it is a button and accent color, not a surface.
- Do not set body text at weight 400 — preserve the ultra-light weight 200.
- Do not introduce card containers with heavy borders or shadows — elements float on black with whitespace alone.
- Do not place multiple filled buttons in proximity — the violet pill is reserved for singular primary actions.
