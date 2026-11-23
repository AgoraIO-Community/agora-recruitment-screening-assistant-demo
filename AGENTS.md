# Agent Development Guide

This guide is for coding agents making changes in `agora-recruitment-screening-assistant-demo`.

## Shared scenario UI requirements

1. **Open the main page directly**: show the scenario explanation and task-specific start action inline. Do not add an introductory dialog, automatic welcome overlay, or Preview first step. Connecting, errors and retry feedback stay inline. Loading the page must not start a session or request microphone access.
2. **Keep the public scenario identity visible**: the public scenario name and short purpose remain visible on desktop and mobile from first load and throughout the session. The header and main heading use the same public name. Keep internal numeric IDs out of visible page and Build copy. Activity status must not replace the scenario name.
3. **Use our UIkit components**: adopt actual component source and accompanying theme/styles from [shczhen/agent-ui](https://github.com/shczhen/agent-ui), connected to real session data and actions. Preserve source provenance and RTC/RTM ownership.

Inspect desktop/mobile direct entry, reload and inline startup failure/retry states. Confirm there is no introductory overlay and that the main start control directly starts the existing session flow. Inspect actual screenshots before acceptance. Inspector, the setup dialog and the coach phrasebook open only on explicit user actions.

For transcript changes, verify desktop/mobile live text growth, hidden arrivals and showing the conversation again. Restore following only if it was active before hiding; preserve deliberate history reading and verify that Scroll to end resumes following.

This direct-entry rule applies to the base template and all scenarios. It supersedes earlier introductory-dialog requirements and per-scenario exceptions. Keep this self-contained section synchronized with the workspace SCENARIO_UI_RULES.md.

## U.S. scenario content

Use a United States setting for fictional business examples, UI copy, Agent context and sample data. Use U.S. cities and addresses, American English (`en-US`), USD for configured prices, and U.S. local dates and times. Use an explicit IANA time zone and the date-correct UTC offset, including daylight saving time; keep data, prompts, tools, exports and UI labels consistent. Do not introduce East Asian locations, regional currencies or time zones into scenario examples. Keep fictional data clearly distinguished from live business facts. Preserve original source citations and third-party license attribution accurately.

## Repository language

Maintain `README.md` in English, `README.zh-CN.md` in Simplified Chinese, and `README.ja.md` in Japanese. These localized README files are an explicit exception to the English-only rule below. Keep all three READMEs aligned on features, setup, deployment, FAQ and limitations, with reciprocal language links. Documentation language does not change the application or Agent language.

Use English for repository content, including documentation, code comments, UI copy and examples. Keep future additions and edits free of Chinese text.

## First-version scope

Practice a structured screening conversation with follow-up questions and a verbal recap.

This first version is conversation-only. No business data lookup, external tools, database, record writes, saved results, or cross-session business history are available. Keep user-provided details only in the current conversation. Never claim an order, appointment, registration, feedback submission, callback, payment, shipment or other external action was created, saved or completed. Offer a verbal summary and explain the appropriate human next step instead. Do not request passwords, verification codes, payment details or unnecessary personal identifiers.

## Start here

Read [README](README.md) for setup and deployment, [architecture](ARCHITECTURE.md) for ownership, [the design guide](DESIGN.md) before any change to JSX, styles, copy weight or action placement, [the public recipe](RECIPE.md) and [verification guidance](AGENTS.md#verification-and-maintenance) for behavior and evidence boundaries.

Use Node.js 24 from .nvmrc and pnpm 9.15.9. Install with pnpm install --frozen-lockfile. Copy env.local.example to .env.local only when absent; preserve existing credentials. Run pnpm run doctor, pnpm run dev and pnpm run verify. Docker checks use pnpm run verify:docker separately.

## Ownership and runtime contracts

- LandingPage owns token/invite bootstrap, RTM, renewal, stop and current-page state. ConversationComponent owns guarded RTC/toolkit initialization and transcripts.
- Preserve RtcTokenBuilder.buildTokenWithRtm, matching RTC/RTM identities and RTM readiness before RTC/toolkit mount.
- Keep the isReady StrictMode guard and stable RTC client ref. useJoin owns leave, the microphone hook owns track cleanup and usePublish owns publication. Never manually close hook-owned tracks or disable StrictMode.
- Remap the toolkit local uid=0 sentinel; keep interrupted turns. Preserve deliberate transcript history reading and restore following across hide/show only when it was previously active.
- lib/agent-config.ts owns instructions and greeting; lib/prompt-context.ts owns concise conversation rules and business-local date/calendar context where present. lib/runtime-profile.ts owns non-secret provider defaults.
- lib/scenario-knowledge.ts supplies static public prompt reference; it is not a live customer, stock or booking service.
- Keep startup independent of business state. No business tools, saved results or persistent customer/learner history are available. Business API routes are not provided.
- NEXT_PUBLIC_AGORA_APP_ID is public and required at build/runtime. Keep NEXT_AGORA_APP_CERTIFICATE and optional vendor keys server-only. Never log, commit or screenshot credentials.
- Sample token/start/stop endpoints are not production login or abuse controls. Provider retention is external to this source. Keep missing measurements unknown and Inspector outcomes manual.
- Keep Inspector, the Build link, adopted UIkit source, source licenses and Docker support.

## Prompt behavior contract — 2026-11-05

Keep `lib/agent-config.ts` as the prompt entry point. Use `lib/scenario-knowledge.ts` for public scenario material and `lib/prompt-context.ts` for concise conversation rules and business-local date/calendar context. Keep the source classification visible in the prompt: configured fictional business facts and static public references are not live customer records.

Answer supported questions and continue useful advice after identifying one unavailable action. Preserve one-question turns, corrected details, honest uncertainty and the conversation-only boundary. Do not reactivate retired business fixtures or tools while changing a prompt. Keep README and architecture aligned with behavior changes; run `pnpm run verify` and report real-model/voice acceptance separately.

## Public presentation ownership

`lib/presentation.ts` owns the single public `name`, purpose and summary. It also owns the entry copy: `lead` (one sentence), `expectations` (a few words each), `sample` (a short static exchange) and `developer.buildLabel`. Show key features through the sample conversation: tag at most three Agent lines with a feature name instead of adding a feature list. Sample questions must come from `lib/scenario-knowledge.ts`; `pnpm run verify:scenario` checks this. Keep the entry page short: one heading, one sentence, the start action, the expectations line and the sample. [DESIGN.md](DESIGN.md) owns tokens, type roles, component rules and the list of views not yet aligned; follow its "Do not regress" list. Entry typography, boundaries and the primary action follow the Agora Website foundation and Basic controls in [shczhen/agent-ui](https://github.com/shczhen/agent-ui): hero type role, 2px technical corners, 13px labels and the signal-color primary action. The header and main heading both render that name; `app/layout.tsx` derives browser metadata from it. There is no separate headline field. Internal IDs stay available for diagnostics and configuration, without being rendered as public identity text.

## Verification and maintenance

Run pnpm run verify for repository checks, lint, types, mocked API/startup, transcript/Inspector, scenario rules and production build. Keep synthetic checks, rendered UI, Docker and actual human speech evidence distinct.

Inspect actual desktop/mobile screenshots after visible changes, including direct entry and inline startup error/retry. Transcript changes also need live growth, hidden arrivals, paused history and Scroll to end checks.

Keep README, AGENTS, RECIPE and ARCHITECTURE aligned with behavior. Contributor guidance is consolidated here.

## Git Conventions

### Commit messages — conventional commits

- **Format:** `type: description` or `type(scope): description`
- **Types:** `feat:` (new feature), `fix:` (bug fix), `chore:` (maintenance, version bumps), `test:` (test additions/changes), `docs:` (documentation)
- **Scoped variant:** `feat(scope):`, `fix(scope):` — e.g. `feat(api): add stop-conversation status flag`
- **Lowercase after prefix** — `feat: add feature`, not `feat: Add feature`
- **Present tense** — "add feature", not "added feature"
- **PR number appended** — `feat: add feature (#123)`

### Branch names

- **Format:** `type/short-description` — lowercase, hyphen-separated
- **Types match commit types:** `feat/`, `fix/`, `chore/`, `test/`, `docs/`
- **Examples:** `feat/agent-metrics`, `fix/transcript-uid`, `docs/progressive-disclosure`

### General rules

- **No AI tool names** — never mention claude, cursor, copilot, cody, aider, gemini, codex, chatgpt, or gpt-3/4 in commit messages or PR descriptions.
- **No Co-Authored-By trailers** — omit AI attribution lines.
- **No `--no-verify`** — let git hooks run normally.
- **No git config changes** — do not modify `user.name` or `user.email`.

Local implementation does not authorize a commit. A commit does not authorize a push or GitHub write; each requires explicit current-conversation authorization. Preserve unrelated local changes and never alter Git identity or bypass hooks.

## Usage FAQ contract

Keep FAQ in the upper-right header beside Inspector. Developer actions have three fixed weights. The start action is the only primary button. Build is the outline link button labeled by `developer.buildLabel` ("Build your own"); it opens `developer.signupUrl` (Agora sign-up) in a new tab. `lib/build-link.ts` adds UTM: when the page URL has a valid `utm_source`, forward the page's UTM fields as a complete set and do not fill missing fields; otherwise use `developer.buildAttribution`. Forward UTM fields only. The underlined text button labeled by `developer.runLabel` ("Run it locally") opens the setup dialog with the create command, the AI assistant prompt and the files to customize. Before a session the three actions sit in one row; during and after a session Run and Build are the last header actions. Each action appears once. Keep them out of the voice dock. `components/ScenarioFaq.tsx` and `styles/faq.css` follow the Voice Shopping drawer pattern: closed on entry, right-side on desktop, full-width on mobile, internally scrollable, and keyboard accessible. Opening FAQ must not start a session or request microphone access. Keep answers consistent with this scenario’s conversation-only scope. Preserve the coach Phrasebook where present.

## Typography

Use the installed Helvetica Neue/sans-serif fallback and keep the shared font tokens consistent with global/form-control styles. Do not bundle or download font assets. Preserve UI source attribution and other third-party notices. Check desktop/mobile rendering after typography changes.

## Session time limit

LandingPage owns the ten-minute browser deadline and reuses the guarded stop flow. Preserve wall-time checks on focus/visibility, five-second stop retries, cleanup, transcript retention and reset on restart. A failed stop must keep the session open with retry feedback. This is not a server-side usage cap.

The header countdown sits immediately before connection status in 12px muted text. Highlight the last minute with light gray (#D4D4D8); announce only the final-minute and expiry notices to screen readers.

## npm scaffold releases

The application remains private. In the upstream Community repository, `pnpm run npm:build` creates the separate public creator package and `pnpm run npm:test` tests the installed tarball offline. Generated projects omit `scripts/npm/`, those two npm scripts, the npm release workflow, the official production deployment workflow and maintainer-only release documentation. They retain application verification, general CI and Docker verification. See the upstream [release setup](https://github.com/AgoraIO-Community/agora-recruitment-screening-assistant-demo/blob/main/docs/npm-release.md) for publishing and official website deployment. The official deployment workflow filters main updates by runtime/build paths and calls CI before publishing; README-only updates do not deploy. Keep native Vercel Git deployment disconnected for the official site. Do not publish or change remote configuration without separate authorization.
