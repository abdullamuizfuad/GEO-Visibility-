# Project brief: "Found, Chosen, Booked" (MNU teaching demo)

10-minute teaching demonstration for the **MNU Business School Lecturer** selection, **5 Nov 2026, 9:30, room A3** (Central Administration, 3rd floor).
Presenter: **Abdulla Muiz Fuad** ("Associate Lecturer Candidate"). Topic: **Unique Marketing Issues** (Barringer & Ireland, *Entrepreneurship*).
The panel scores engagement, facilitating discussion (not just answering), pitch level, assessment, timing, readable slides, wrap-up and teaching philosophy.

## Files: edit only what you need
| Change | File |
|---|---|
| Slide wording / order | `index.html` (14 `<section class="slide">`; speaker notes in `data-notes`) |
| Design: colours, type, layout, beach animation styles | `css/deck.css` (tokens in `:root` at the top) |
| Beach background markup (waves, palm, sun, birds) | `js/scene.js` |
| Navigation, builds, timer, print mode | `js/deck.js` |
| Phone demo wording (personas, competitors, fixes) | `demo/data.js` |
| Phone demo flow / styles | `demo/demo.js`, `demo/demo.css` |
| Presenter script and timings | `speaker-notes.md` |
| Images: Ruka logo variants, AI screenshots, QR code | `assets/` |

**Check after every change:** `node tools/check.js` renders all slides to `.check/`, rebuilds `slides.pdf`, tests the phone demo, and prints `No errors.` or a list of problems. Look at the affected `.check/slide-NN.png`.

## How the deck works
- Builds: an element with `data-b="N"` appears on click N. The slide also gets classes `b1..bN` for CSS-driven animations. `?print` shows everything (used for the PDF).
- Keys: → ↓ Space PgDn = next build/slide; ← ↑ PgUp = back; F fullscreen; H timer/HUD; B black screen; T light/dark.
- Slide changes use the View Transitions API (crossfade + drift), with a CSS fade fallback and an instant jump for reduced motion. Theme follows the system; the toggle/T choice is saved in localStorage. `?print` and @media print force light.
- Slide 12 builds: clicks 1–4 = Brand, Product, Price, Place fixes; click 5 = "Now tap Search again" + result.
- Phone demo flow: pick traveller (Couple/Honeymoon, Solo, Family, Dive) → Search → answer without Ruka → "Watch the screen" → "Search again" shows the after state (Ruka #1 couple, #2 solo, #3 family; dive: Reveries wins). No fix taps on the phone, no percentages. Ids: #personas, #q, #search, #stop, #again, #after, #theme.
- Slide map (17): 1 cover "Exploring Unique Marketing Issues" · 2 meet Ruka + four questions (4 builds) · 3 QR "be the traveller" · 4 simulated search (self-running, js/search-sim.js + css/search-sim.css; print = final state) · 5 segmentation · 6 targeting + positioning map (logos in assets/logo-*.png, lecturer's perception) · 7 brand · 8 AI lens (STP + brand together, 5 builds) · 9 marketing mix 4P → GEO → 7P (Booms & Bitner 1981; Wirtz & Lovelock 2022; Kotler et al. 2021 Marketing 5.0) · 10 seven-step sales blocks · 11 think-pair-share (green) · 12 QR "make Ruka visible" · 13 questions for discussion · 14 tutorial activity (3 AI assistants) + group assignment (1-year plan, timeline, budget) · 15 conclusion Found/Chosen/Booked · 16 teaching philosophy · 17 references.
- Keep the QR slides (3, 12) and the search slide (4) unless the user explicitly says otherwise. Hotel logos (Ruka, Stone, Arena, Crystal Sands) used with permission; state nothing about Crystal Sands beyond its name.

## Design system
Ruka Maldives brand on tan: green `#0B332D` (text/headers), copper `#C4876C` (decor), deeper copper `#A9674B` (small accent text), tan `#F6F1EA`. **Poppins** only, bundled in `fonts/` (works offline; never link a CDN). "Organic modern": rounded cards (24–32px), pill labels, soft glass cards (backdrop blur only on the main card per slide), staggered entrances with cubic-bezier(.16,1,.3,1). Dark mode = deep green #082A25 with tan text; QR always on a tan plate. A muted looping beach scene sits behind the slides. It is paused for reduced-motion users and hidden in print.

## Facts: never invent; only these are verified
- **Ruka Maldives:** cosy boutique guesthouse, "personal island villa" feel, boho style, open-courtyard + indoor dining, serviced living, budget-friendly (user-confirmed; do NOT add housekeeping frequency, Wi-Fi, work nooks, distances or percentages). Positioning = one core brand + proof points for couples/honeymoon, solo, families; divers are not a fit. Dhiffushi, North Malé Atoll; 12 rooms; opened 2025; a few steps from the beach; ~10 min walk to Kite Beach; A/C rooms, private bathrooms, some balconies; breakfast included; **no website of its own**. Used **with the owner's permission**. ("20 steps", exact prices, ratings: not verified, don't use.)
- **Stone Hotels Dhiffushi:** rooftop infinity pool, spa, private beach. **Reveries Diving Village** (Gan, Laamu): Emperor Divers dive centre on site. **Arena Beach Hotel:** **Maafushi** (not Dhiffushi), private beach, 50 rooms.
- The "fractured listings" (Ruka Inn / Ruka Guest House / two phone numbers) are a **labelled teaching scenario**, not real listings.
- **AI field test, 4 Nov 2026** (Gemini, Google AI Mode, Baidu; EN + 中文): Ruka named **0 times**; Baidu's couple answer put **Arena Beach Hotel first**; Baidu recommended Dhiffushi with **Athiri Residence**; Google AI Mode picks all had a rating, map pin and website. Cropped screenshots are in `assets/`.
- Source paper: Morand & Schegg (2026), *Be Visible to AI*, HES-SO Valais-Wallis, doi 10.5281/zenodo.19109201 (practitioner white paper, not peer-reviewed).
- Cite the textbook as "Barringer & Ireland, Unique Marketing Issues" with no chapter number. Also cited: Osterwalder & Pigneur (2010), Business Model Canvas (mapped on slide 5); "liability of newness" on slides 5 and 7.
- To confirm with the user: module code "MKT101 / ENT101". Demo 中文 prompts are machine translations; have them checked.

## Deploy
Display short link: iocdrp.s.gy/ruka → https://abdullamuizfuad.github.io/GEO-Visibility-/demo/ (shown as text under the QR on slide 3; the QR image itself encodes the full URL).
Repo `abdullamuizfuad/GEO-Visibility-`, branch `main`, GitHub Pages from root. The QR code points to `https://abdullamuizfuad.github.io/GEO-Visibility-/demo/`; don't rename the repo or move `demo/`. The user enables Pages themselves (Settings → Pages). Offline backup = ZIP of the repo + `slides.pdf`.
