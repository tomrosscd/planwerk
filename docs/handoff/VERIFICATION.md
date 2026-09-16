# Verification and completion criteria

Run commands from the workspace root unless stated otherwise. Do not use git reset/clean or discard unrelated files.

## Starting inspection

```sh
git -C planwerk status --short --branch
ls planwerk
```

Expected before implementation: main clean except untracked loading.html and these new docs. Subsequent files are tracked in PROGRESS.md. The user requested LOCAL ONLY.

## Browser tooling

Node require:
```js
const { chromium } = require('/Users/tomross/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox']
});
```

Save test scripts and screenshots in `/tmp/planwerk-new-pages/` (or another clear temporary directory). Close browser in finally. Network/sandbox approval may be needed to start browser/server.

## Responsive visual QA

For university.html, compare.html, open-letter.html:
- Capture full-page screenshots at widths 375, 768 and 1440, heights around 900.
- Await document.fonts.ready when possible and decode relevant images.
- Verify no page errors and no body horizontal overflow.
- Ensure original header is About/Team only, logo links home.
- Check footer wraps and contains every intended link exactly once.
- The comparison table may scroll internally; verify all last-column cells can be reached and first-column labels are legible.
- Newspaper columns collapse logically for phone/tablet, with readable font sizes and no cut-off headlines.
- Open/close the existing visitor prank on at least one new page, including Escape and focus restoration.

## University interaction QA

- Empty name and missing answer cannot produce a certificate.
- All THREE answer choices pass and display their distinct feedback.
- Submit with an ordinary name, a long name near max length, an accented/Unicode name, and an HTML-looking input (e.g. `<img src=x onerror=alert(1)>`). User input must render as text, never execute.
- Names are not sent through network requests, URL query strings or stored in localStorage.
- Certificate date/ID remain unchanged across repeated downloads for the same completion.
- Retaking/editing resets intended state and creates a new accurate certificate.
- Download event produces a real PDF with application/pdf bytes and a valid %PDF header.
- PDF is ONE landscape A4 page with correct name, credential title, date/ID, signers and humour note.
- Raster certificate PDFs are acceptable for Unicode handling, but inspect actual PDF render, not only canvas screenshot.
- Download both light/dark badge PNGs and SVGs. Check PNG signatures and SVG viewBoxes; inspect images on contrasting backgrounds.
- All download buttons recover from errors and re-enable.
- Buttons have keyboard focus, result is announced and no hidden result control can receive focus early.

## PDF verification

PDF generation is a browser feature, not a static downloadable sample file to publish. Save a downloaded sample PDF in `/tmp/planwerk-new-pages/` for verification.

Use Python runtime:
`/Users/tomross/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`

Inspect sample with pypdf. Render with pdftoppm if available, or bundled PDF rendering dependencies. Inspect PNG visually for clipped names, missing glyphs, logo quality, layout and signature roles. If embedding canvas as image, text extraction won't work: inspect metadata/page dimensions and rendered image instead.

The PDF skill was read from:
`/Users/tomross/.codex/plugins/cache/openai-primary-runtime/pdf/26.909.12148/skills/pdf/SKILL.md`
Its artifact-operation marker was successfully run once at the start of the task. It is not a generated certificate.

## Copy and scope QA

- Search new pages for Luke, co-founder, technical director, Petra. These should not appear in page content except the permitted shared Luke footer trigger.
- Domain letter refers to independent third party; legal proceedings explicitly fictional.
- Signers: Sebastian Klett, Founder & CEO; Tom Ross, Head of Gemini.
- Minimum letter substance: approximately 900-1200 words, coherent and funny, not filler.
- All links resolve locally; no dead `href="#"` actions.
- All new asset paths exist; library licences retained.
- Existing home waitlist/investor demo, team images, status details and footer prank still work.
- `loading.html` remains intact and unlinked from normal navigation.

## Final checks

```sh
git -C planwerk diff --check
git -C planwerk status --short
```

Update PROGRESS.md with files completed, tests run (actual results), and anything unverified. Open the three local previews for review. Final response should state LOCAL ONLY and link to pages. Do not commit/push/deploy; await the user's separate instruction.

## Saved executable checks

The scripts used for this implementation are preserved alongside these docs:
- `browser-checks.cjs`: main responsive, exam, certificate, badges, prank, print and no-JS checks.
- `fallback-checks.cjs`: missing-answer, PDF-library-error recovery and existing-page footer checks.

Run them from the workspace root as described in PROGRESS.md. They save QA artifacts only to /tmp. Current checks are complete; only repeat after changes or to resolve a specific concern.
