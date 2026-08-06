# Shop Lake Norman LKN — Design Direction

## Three stylistic approaches

### Theme Name: Carolina Editorial
A refined, print-inspired community directory with warm paper tones, deep ink, and a confident lake-blue accent. It makes local businesses feel collected, credible, and worth exploring.

**Probability:** 0.07

### Theme Name: Dockside Utility
A crisp, modern directory system inspired by marina wayfinding, nautical charts, and neighborhood bulletin boards. It emphasizes quick scanning, strong filters, and practical local discovery.

**Probability:** 0.03

### Theme Name: Sunday Market
A relaxed, optimistic community marketplace aesthetic using sun-washed color blocks, generous whitespace, and friendly typography. It feels welcoming and human without becoming playful or childish.

**Probability:** 0.06

## Selected approach: Carolina Editorial

**Design Movement:** Contemporary editorial design with Southern print ephemera and understated civic wayfinding.

**Core Principles:**
1. Make local discovery feel curated rather than cluttered.
2. Pair editorial confidence with practical directory utility.
3. Use warm surfaces, ink-like type, and restrained lake-blue accents instead of generic gradients.
4. Let the business-card imagery remain the hero; the interface frames it without competing.

**Color Philosophy:** The foundation is warm oyster paper and deep ink, echoing a well-kept local magazine. Carolina blue is used as a signature signal for links, filters, and active states, while clay and pine accents add regional warmth. Color should guide attention, not decorate every surface.

**Layout Paradigm:** A magazine-like composition with a strong left rail / editorial column and an offset directory field. On desktop, hero copy sits beside a framed directory preview, then transitions into a filter toolbar and a broad card archive. Content pages use a narrow reading column paired with a quiet metadata rail.

**Signature Elements:** Thin rule lines, oversized alphabet markers, and small all-caps eyebrow labels that behave like print section markers.

**Interaction Philosophy:** Every interaction should feel like turning to a section of a local guide: quick, legible, and satisfying. Filters update in place, active states are visibly underlined, cards lift slightly on hover, and external links clearly announce that they open a business website.

**Animation:** Use short 160–220ms ease-out transitions for buttons, card elevation, filter changes, and navigation. Editorial sections may fade and translate upward by 8px on entry. Avoid decorative looping motion. Respect reduced-motion settings.

**Typography System:** Use Fraunces for display headlines and section titles, DM Sans for body/interface copy, and IBM Plex Mono for metadata, labels, and alphabet navigation. Headlines use tight leading and occasional italic emphasis; body copy remains open and highly readable.

**Brand Essence:** A trusted local index for finding and supporting the people who make Lake Norman businesses distinctive. Personality adjectives: grounded, curious, neighborly.

**Brand Voice:** Headlines are clear and inviting, never salesy. CTAs use active verbs that imply discovery. Microcopy is concise, warm, and specific.

Example lines: “Find the people behind the places you love.” “Browse the local businesses shaping Lake Norman.”

**Wordmark & Logo:** A compact monogram built from an L and N joined by a single horizontal lake line, paired with a wordmark in a high-contrast editorial serif. The mark should work as a small stamp in the header and favicon.

**Signature Brand Color:** Lake Norman Blue — `#2D6F8F`, a muted, confident blue that feels like water under a clear Carolina sky.

## Content architecture

The public navigation will include **Directory**, **Stories**, **About**, and **Contact**. The home route will be the directory hub and will retain the complete business-card archive with three prominent modes: alphabetical by last name, business name, and category. The directory will provide search, category filtering, and a clear external-link affordance on each card.

The story system will use a reusable article shell for `/blogs/:slug` routes. The first two editorial entries are `/lknsbn-annual-holiday-party/` and `/introducing-lnsbn/`, preserving the supplied copy while improving hierarchy, spacing, and readability. About will explain the Lake Norman Small Business Network in a compact mission-led layout. Contact will provide the supplied email destination and a simple front-end contact form with clear success feedback.

The footer will carry the organization name, a concise invitation to support local businesses, the primary navigation, and the original site credit in a quieter legal/utility line.
