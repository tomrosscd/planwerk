# PlanWerk: resume this work

## User request and authority

Build THREE new pages, locally only:
1. PlanWerk University: absurdly prestigious parody university, personalised one-question exam, downloadable PDF certificate, certification image badges suitable for email signatures.
2. Competitor Comparison: straight-faced, funny comparison with Excel, a whiteboard, asking someone, and having a rough idea.
3. Open Letter: substantial, newspaper/broadsheet-style public letter concerning planwerk.com.au. Mock hostile-takeover/CEO rhetoric, anonymous third-party owner, signed by Sebastian Klett (Founder & CEO) and Tom Ross (Head of Gemini).

All three belong in the FOOTER, not the header. User approved all three and explicitly said LOCAL FOR NOW. Do not commit, push, deploy, or change the live site without a new publishing request. User explicitly requested these handoff documents before implementation in case they continue with Claude. Update these files as work proceeds.

## Read order

1. This document.
2. `IMPLEMENTATION_PLAN.md`: architecture, page design and interactions.
3. `COPY_AND_CONSTRAINTS.md`: approved tone, facts, proposed copy.
4. `VERIFICATION.md`: executable local verification procedures.
5. `PROGRESS.md`: factual checkpoint. Inspect actual files and git status before trusting an old checkpoint.

## Workspace

Workspace root:
`/Users/tomross/Library/CloudStorage/GoogleDrive-tom@convertdigital.com.au/My Drive/Tom - Project Working Files/Internal/Planwerk/Landing Page`

Actual Git repository is the `planwerk/` child directory, NOT the workspace root. All paths in these handoff docs are repository-relative unless explicitly absolute.

Remote: `https://github.com/tomrosscd/planwerk.git`
Branch: `main`
Hosting: GitHub Pages from main, repository root; custom domain `planwerk.life`.
There is no package/build pipeline. Existing pages are plain HTML/CSS/JS.

## Existing site

- `index.html`: coming-soon landing page. Inline fonts, backgrounds, CSS, SVG data URI logos. Fake early-access and investor flows; preserve their existing behaviour.
- `about.html`: existing About page. Contains older fictional team names; do not rewrite unrelated content during this task.
- `team.html`: approved team story, seven timeline entries, photos and bios. Sebastian is SOLE founder. Tom is Head of Gemini, NOT co-founder.
- `operations.html`: approved parody status page with four incident reports.
- `assets/site-extras.css`, `assets/site-extras.js`: shared footer styling and visitor Easter egg.
- `images/visitor.png`: transparent photo used by Easter egg. Do not replace or edit it.
- `loading.html`: completed standalone loading animation experiment, UNTRACKED/local-only at start of this task. Preserve it. Do not add these new footer links to its standalone presentation unless requested.
- The other four pages are already published from prior work. Treat their existing content as approved.

Existing footer includes Operations & Systems and `Luke, Don’t click this`. The prank uses a native dialog, stable close control, Escape, three pointer/touch dodges, reduced-motion support, and focus restoration. Preserve these.

## Important user preferences

- Ask necessary questions in NORMAL CHAT. The question wizard is broken for this user. Do not use it.
- The user has already answered the relevant scope questions. No need to ask again.
- They prefer action, specific humour, and concise progress updates.
- Keep correct roles: Sebastian Klett = Founder & CEO, Tom Ross = Head of Gemini.
- Domain owner must remain anonymous in the letter and domain incident report. Never describe them as PlanWerk's technical director/team member.
- The footer prank may explicitly name Luke; this does not authorise naming him in the domain dispute.
- Do not create a real allegation of theft or real litigation. Play the requested legal joke as proceedings in the fictional Court of Deeply Held Feelings. The user was told this interpretation before implementation.

## Environment and reusable tools

Browser QA uses Playwright with installed Google Chrome:
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

Bundled modules:
`/Users/tomross/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules`
Packages available: playwright, pdf-lib, sharp, pdfjs-dist.

Bundled Python:
`/Users/tomross/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`
Includes Pillow, reportlab, pypdf/pdfplumber, rendering tools through runtime fallback paths.

Preview: serve repository root at `http://127.0.0.1:8765/`.
A server from previous work may already be running. Inspect/reuse rather than starting a competing server. If not:
`python3 -m http.server 8765 --bind 127.0.0.1 --directory planwerk`
(run from workspace root).

Sandbox may require approval for localhost server and headless Chrome. They are authorised read-only QA actions. Do not infer publication permission from tool approvals.

## Latest checkpoint

Implementation is now complete and locally verified. Read PROGRESS.md for actual files, QA evidence and remaining approval boundary. The plan/copy documents record the intended approach; the actual HTML/CSS/JS files are the current implementation. Do not rerun one-time scaffolders.
