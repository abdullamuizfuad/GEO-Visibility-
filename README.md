# Found, chosen, booked: Unique Marketing Issues

A 10-minute teaching demonstration for the **MNU Business School** lecturer assessment (5 November 2026).
Topic: *Unique Marketing Issues* (segmentation, targeting and positioning; brand; 4Ps; seven-step sales process), taught through one running case, **Ruka Maldives (Dhiffushi)**, and the new problem of **visibility to AI assistants (GEO)**.

## What's in this repo

| File | What it is |
|---|---|
| `index.html` | **The presentation.** 14 editorial-style slides with motion and click-by-click builds; runs offline. |
| `fonts/` | Playfair Display, Cormorant Garamond and Plus Jakarta Sans, bundled so the deck looks right without internet. Keep this folder next to `index.html`. |
| `demo/index.html` | **The phone demo** ("Ruka Visibility Lab") that the QR code opens. |
| `slides.pdf` | PDF backup of every slide, fully built. |
| `speaker-notes.md` | A script timed to 10 minutes, with discussion questions and fallbacks. |
| `assets/` | Cropped screenshots of the real Baidu and Google AI Mode answers (slide 4). |

## Put it live (GitHub Pages)

The phone demo must be online so the panel can open it from the QR code.

1. Push this repo to GitHub (already done if you're reading this there).
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
4. Wait 1–2 minutes. The site will be at:
   - Presentation: https://abdullamuizfuad.github.io/GEO-Visibility-/
   - Phone demo (the QR target): https://abdullamuizfuad.github.io/GEO-Visibility-/demo/
5. **Test the QR code** from the projected slide with one iPhone and one Android.

> The repository must stay **public** for GitHub Pages to work on a free account.
> If you rename the repo, the QR code will break. Ask for it to be regenerated.

## Run it locally (backup)

You don't need the internet for the slides.

1. On GitHub: **Code → Download ZIP**, then unzip it.
2. Double-click `index.html`. It opens in Chrome, Edge or Safari.
3. Press **F** for fullscreen.

If the internet fails in the room, open `demo/index.html` on your laptop and walk the panel through it on the projector.

**Last resort:** open `slides.pdf`.

## Real AI evidence (slide 4)

Tested on 4 Nov 2026 with Gemini, Google AI Mode and Baidu, using the everyday questions travellers actually type, in English and Chinese. The cropped screenshots are in `assets/`:

| File | What it shows |
|---|---|
| `assets/baidu-couple.png` | Baidu, couple question in Chinese: **Arena Beach Hotel** listed first (highlighted) |
| `assets/google-ai.png` | Google AI Mode, "near the airport": every pick has a rating, map pin and website |
| `assets/baidu-dhiffushi.png` | Baidu, "near airport, local island": Dhiffushi recommended with **Athiri Residence**, not Ruka (for Q&A) |

Across all the questions, **Ruka Maldives was named 0 times.**

## Presenting controls

| Key | Action |
|---|---|
| ↓ · → · Space · Page Down · clicker | Next build / slide |
| ↑ · ← · Page Up | Back |
| **F** | Fullscreen |
| **H** | Hidden timer + slide counter (turns red at 9:30) |
| **B** | Black screen |

## Day-of checklist

- [ ] GitHub Pages is live and the demo URL opens on a phone
- [ ] QR code tested from the projector screen (iPhone + Android)
- [ ] ZIP copy on the laptop desktop **and** on a USB stick, with `slides.pdf`
- [ ] HDMI adapter + clicker + charger
- [ ] Rehearsed twice with the timer (press **H**)
- [ ] Arrive by 9:00 to test the projector in A3

## Sources

- Barringer, B. R., & Ireland, R. D. *Entrepreneurship: Successfully launching new ventures*. Pearson. Chapter: Unique marketing issues.
- Morand, J.-C., & Schegg, R. (2026). *Be visible to AI: The keys to semantic optimization and GEO for hotels* [White paper]. HES-SO Valais-Wallis. https://doi.org/10.5281/zenodo.19109201
- Aggarwal, P., et al. (2024). GEO: Generative engine optimization. *Proceedings of the 30th ACM SIGKDD Conference*.

## Notes on the case

- Ruka Maldives is a real guesthouse, used with the owner's permission.
- Ruka, Stone Hotels Dhiffushi, Reveries Diving Village (Gan, Laamu) and Arena Beach Hotel (Maafushi) are described only with publicly listed facts.
- The "before" problems (mismatched names, no price, booking by message) are a **teaching scenario**, not claims about any listing.
- The phone demo is a **scripted simulation** of how AI shortlisting works, not a live AI.
