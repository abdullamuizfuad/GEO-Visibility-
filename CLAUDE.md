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
- Keys: → ↓ Space PgDn = next build/slide; ← ↑ PgUp = back; F fullscreen; H timer/HUD; B black screen.
- Slide map: 1 cover · 2 Ruka dilemma (dots funnel) · 3 QR "be the traveller" · 4 real AI evidence (optional) · 5 outcomes · 6 STP · 7 brand · 8 4Ps · 9 seven-step sales · 10 think-pair-share (green) · 11 QR "make Ruka visible" · 12 assessment · 13 wrap-up + philosophy · 14 references.
- The user's 11-slide outlines omit slides 3, 4 and 11. Keep them (engagement and evidence) unless the user explicitly says otherwise.

## Design system
Ruka Maldives brand on tan: green `#0B332D` (text/headers), copper `#C4876C` (decor), deeper copper `#A9674B` (small accent text), tan `#F6F1EA`. **Poppins** only, bundled in `fonts/` (works offline; never link a CDN). Editorial layout: hairline rules, large faint numerals, no rounded shadow cards. A muted looping beach scene sits behind the slides. It is paused for reduced-motion users and hidden in print.

## Facts: never invent; only these are verified
- **Ruka Maldives:** Dhiffushi, North Malé Atoll; 12 rooms; opened 2025; a few steps from the beach; ~10 min walk to Kite Beach; A/C rooms, private bathrooms, some balconies; breakfast included; **no website of its own**. Used **with the owner's permission**. ("20 steps", exact prices, ratings: not verified, don't use.)
- **Stone Hotels Dhiffushi:** rooftop infinity pool, spa, private beach. **Reveries Diving Village** (Gan, Laamu): Emperor Divers dive centre on site. **Arena Beach Hotel:** **Maafushi** (not Dhiffushi), private beach, 50 rooms.
- The "fractured listings" (Ruka Inn / Ruka Guest House / two phone numbers) are a **labelled teaching scenario**, not real listings.
- **AI field test, 4 Nov 2026** (Gemini, Google AI Mode, Baidu; EN + 中文): Ruka named **0 times**; Baidu's couple answer put **Arena Beach Hotel first**; Baidu recommended Dhiffushi with **Athiri Residence**; Google AI Mode picks all had a rating, map pin and website. Cropped screenshots are in `assets/`.
- Source paper: Morand & Schegg (2026), *Be Visible to AI*, HES-SO Valais-Wallis, doi 10.5281/zenodo.19109201 (practitioner white paper, not peer-reviewed).
- To confirm with the user: module code "MKT101 / ENT101"; textbook chapter number (varies by edition).

## Deploy
Repo `abdullamuizfuad/GEO-Visibility-`, branch `main`, GitHub Pages from root. The QR code points to `https://abdullamuizfuad.github.io/GEO-Visibility-/demo/`; don't rename the repo or move `demo/`. The user enables Pages themselves (Settings → Pages). Offline backup = ZIP of the repo + `slides.pdf`.
