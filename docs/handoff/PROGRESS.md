# Progress checkpoint: implementation complete, local review pending

Last updated: 2026-09-16.

## Current status

All three requested pages are built and tested locally. Nothing has been committed, pushed or deployed. The next step is USER REVIEW, followed by requested refinements or explicit publication approval. Do not rebuild from the old scaffolding scripts.

## Completed checklist

- [x] Wrote the five Markdown handoff documents FIRST, before creating page code.
- [x] University page and three-course parody curriculum.
- [x] Name + one-question exam; all three choices pass with different feedback.
- [x] Personalised certificate preview and real PDF/PNG downloads.
- [x] Light/dark certification SVG and PNG badges for email signatures.
- [x] Competitor Comparison page with responsive scrollable table.
- [x] Original cream-and-black broadsheet open letter, about 1,150 words including furniture/signatures.
- [x] University / Compare / Open Letter footer links on all seven normal pages.
- [x] Existing header navigation and page copy preserved.
- [x] Responsive/interactivity/download QA.
- [x] PDF and badge visual inspection.
- [x] Download-error and no-JavaScript fallbacks verified.

## Actual deliverable files

Pages:
- `university.html`
- `compare.html`
- `open-letter.html`

New assets:
- `assets/page-shell.css`: extracted original shell/background/nav/footer CSS.
- `assets/new-pages.css`: responsive new-page styles and letter print rules.
- `assets/university.js`: exam, canvas certificate, PDF/PNG download logic.
- `assets/open-letter.js`: print/save-as-PDF button.
- `assets/university-seal.svg`
- `assets/certified-dark.svg`, `assets/certified-dark.png`
- `assets/certified-light.svg`, `assets/certified-light.png`
- `assets/vendor/pdf-lib.min.js`, `assets/vendor/pdf-lib-LICENSE.md`

Modified existing files:
- `index.html`, `about.html`, `team.html`, `operations.html`: ONLY three additional footer links, verified against git HEAD.
- `assets/site-extras.css`: added responsive wrapping/alignment for more footer links. Existing prank JavaScript is unchanged.

Preserved:
- `loading.html` remains the existing untracked standalone motion demo, untouched and not linked in normal navigation.
- Existing images, forms, team copy, operations reports and footer prank.

## Local preview URLs

- http://127.0.0.1:8765/university.html
- http://127.0.0.1:8765/compare.html
- http://127.0.0.1:8765/open-letter.html

Serve the repository root with Python's HTTP server on port 8765 if the existing server is no longer running. Use HTTP rather than file:// so root-relative assets and downloads resolve.

## Verification evidence

Browser checks at 375, 768, 1440px:
- All three pages have no horizontal body overflow or JS errors.
- Header remains About / Team; logo links home.
- Footers contain University, Compare, Open Letter, Operations & Systems and the Luke trigger.
- Comparison scroll region exposes all columns on mobile.
- Existing footer visitor prank opens, closes with Escape, and restores focus.

University:
- Empty/whitespace names and missing answer rejected.
- All three exam answers pass with distinct feedback.
- Tested ordinary name, long name, `Zoë 李`, and literal HTML-like name; no HTML execution.
- Correct recipient name/roles rendered in certificate.
- PDF download is a valid one-page A4 landscape PDF (841.89 x 595.28 points).
- Canvas export is 2526 x 1785; Unicode handled by browser font rendering. PDF uses a high-resolution image, so text is not selectable. This is an intentional Unicode-compatible implementation tradeoff.
- Certificate credential/date stable across PDF/PNG downloads for the same submission.
- Dark/light PNG/SVG badge downloads work.
- No localStorage use; names never submitted over network.
- Missing PDF library displays a recovery message and leaves PNG alternative available.
- No-JavaScript page displays a clear fallback and hides the non-working exam form.

Visual review:
- Inspected desktop University, Comparison and broadsheet screenshots, mobile University, sample certificate, long-name certificate and badge.
- Rendered actual downloaded sample PDF with pdftoppm and inspected it.
- Rendered Unicode PDF and confirmed glyphs.
- Letter browser print generates four readable A4 pages. Inspected all pages; no clipping. The offer/signatures occupy the final partial page. Web layout is a continuous broadsheet, not four separate web pages.

Static:
- JS syntax checks passed.
- git diff --check passed.
- Asset paths exist.
- Existing four pages match HEAD exactly after removing the added footer links.
- Domain owner anonymous in letter; proceedings explicitly fictional; signers correct.

## Reproducible checks

Saved browser scripts:
- `docs/handoff/browser-checks.cjs`
- `docs/handoff/fallback-checks.cjs`

Run from workspace root:
`node planwerk/docs/handoff/browser-checks.cjs`
`node planwerk/docs/handoff/fallback-checks.cjs`

They use installed Chrome and the bundled Playwright module documented in START_HERE. Temporary samples/screenshots go under `/tmp/planwerk-new-pages/`. The original main test's last no-JavaScript assertion matched a hidden noscript wrapper; the selector was corrected in the saved script. The visible notice was separately verified in a real no-JavaScript browser.

## Known scope boundaries / next actions

- Await user feedback. Do not push/deploy without an explicit request.
- Do not add new pages to header.
- If publishing later, review git status carefully: loading.html is an older local-only experiment. Do not accidentally include it unless approved.
- Handoff docs and QA scripts contain workspace/runtime paths. Before publishing to a public Pages repo, consider excluding docs/handoff from the publishing commit or relocating internal handoff files outside the deployed root. User asked for local handoff docs, not their publication.
- There is no server-side name storage or certificate verification service. Credential IDs are decorative local identifiers.
- Example PDFs are QA samples in /tmp, not site assets or deliverables to publish.

## Latest revision: shorter conventional open letter

User requested removing the fake-newspaper treatment and making the letter much shorter.
- `open-letter.html` now uses a single-column letter, straightforward heading/salutation, approximately 320 body words, and two signatures.
- Removed masthead, edition metadata, newspaper columns, pull quote and oversized offer panel.
- Retained anonymous owner, fictional Court of Deeply Held Feelings, $14.95/plant/certificate proposal, and correct roles.
- New `assets/open-letter.css` owns letter and print styling. Obsolete broadsheet CSS removed from `assets/new-pages.css`.
- This supersedes the old 1,150-word broadsheet design and four-page print description above. The latest HTML/CSS are authoritative.
- Still local only; no commit, push or deployment.

User clarified the letter should keep the funny, pompous CEO voice of the original, NOT technical-documentation style. Restored the Domain Repatriation committee and working-group jokes while retaining the short letter format. Do not use tech-doc-style for future letter edits.
