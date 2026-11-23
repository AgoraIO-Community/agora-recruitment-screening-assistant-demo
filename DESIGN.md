# Design Guide

This guide records the visual and interaction decisions for this demo. Read it before you change JSX, styles, copy weight or action placement. [AGENTS.md](AGENTS.md) owns behavior and ownership rules; this file owns appearance.

## Sources of truth

| Topic | Source |
| --- | --- |
| Brand foundation: palette, type roles, technical corner | Agora Website foundation in [shczhen/agent-ui](https://github.com/shczhen/agent-ui) (`systems/agora-website/tokens.css`, `DESIGN.md`) |
| Button shape and primary color | The public website, [agora.io](https://www.agora.io/en/): square controls, signal-color primary, outline secondary |
| Adopted components | `components/ui/`, `components/agent-ui/`, `styles/agent-ui/recipes.css` |
| Theme mapping for this demo | `styles/agent-ui/website-theme.css` |
| Page-level layout and demo-only styles | `app/globals.css`, classes prefixed `demo-` |

Change a value at its source. Do not restyle an adopted component from `app/globals.css` when a token in `website-theme.css` controls it.

## Do not regress

1. **Three action weights, each shown once.** The start action is the only primary button. "Build your own" is the outline link button. "Run it locally" is the underlined text button. Do not add a second primary button, a Build card, a command band, or a duplicate entry in another place.
2. **Square controls.** `--radius` is `2px` in `website-theme.css`. Do not restore `6px` or larger corners on buttons, cards, bubbles, code fields or the setup dialog.
3. **Signal-color primary.** The primary button fill is `--primary` (cyan on dark). Do not change it to a white or neutral fill.
4. **Short entry page.** One heading, one sentence, three actions, one expectations line and the sample conversation. Put further explanation in FAQ or the setup dialog.
5. **Key features through the sample.** At most three Agent lines carry a feature tag. Do not add a feature list, icon grid, emoji chips or technology badges.
6. **No decoration.** No gradients, glows, background imagery, entrance animation or hover movement on the entry page. The Agent Signal is the only animated element.
7. **No bundled fonts.** Use `"Helvetica Neue", sans-serif`. See [Typography in AGENTS.md](AGENTS.md#typography).
8. **Dark appearance only.** `app/layout.tsx` sets the `dark` class. Light tokens exist in the theme files and are not verified for these pages.

## Tokens used on these pages

Use these custom properties. Do not write raw color values in `app/globals.css`.

| Role | Token | Dark value |
| --- | --- | --- |
| Page background | `--background` | `#000` |
| Raised plane (sample card) | `--demo-raised` | `#0a0a0a` |
| Card plane (user bubble, code field) | `--card` | `#1a1a1a` |
| Text | `--foreground` | `#fcf9f8` |
| Secondary text | `--muted-foreground` | `#b3b3b3` |
| Boundary | `--border` | `#383838` |
| Outline control boundary | `--input` | `#8a8a8a` |
| Signal: primary fill, feature tags, hover on text links | `--primary` | `#00c2ff` |
| Focus ring | `--ring` | `#a0faff` |
| Corner | `--radius` | `2px` |
| Monospace | `--font-mono` | system monospace stack |

Structure comes from 1px boundaries and tonal planes. Do not add shadows to entry-page elements.

## Type

| Role | Size | Line height | Weight | Tracking | Used for |
| --- | --- | --- | --- | --- | --- |
| Hero | `clamp(3rem, 4.35vw, 4rem)`; `2.5rem` at 800px and below | `0.94` | 400 | `-0.052em` | Entry heading |
| Title | `clamp(1.4rem, 1.65vw, 1.75rem)` | `1.08` | 400 | `-0.035em` | Setup dialog title |
| Body | `16px` | `1.58` | 400 | 0 | Entry sentence, maximum `55ch` |
| Sample text | `14px` | `1.58` | 400 | 0 | Sample conversation lines |
| Control label | `13px` | `20px` | 400 | 0 | Buttons, text button, expectations, dialog body |
| Label | `12px` | `1.3` | 400 | 0 | Sample caption, feature tags |
| Code | `12px` | `18px` | 400 | 0 | Code fields |

Headings use weight 400. Do not use bold or uppercase for emphasis on the entry page.

## Layout

- Entry workspace: maximum width `1200px`, page gutter `40px` (`20px` at 800px and below).
- Two columns at widths above 800px: flexible left column and a sample column of at most `440px`, with a `64px` gap, vertically centered in the first viewport.
- One column at 800px and below, in this order: Agent Signal, heading, sentence, actions, expectations, sample.
- The page must not scroll horizontally at 320px.

## Components

### Actions

| Action | Component | Size | Behavior |
| --- | --- | --- | --- |
| Start | `Button` default variant, microphone icon at the start | `lg` (44px) | Starts the session. Shows "Connecting…" while starting. |
| Build your own | `BuildLink`: `Button` outline variant rendered as a link, up-right arrow at the end | `lg` on the entry page, `sm` in the header | Opens Agora sign-up in a new tab. The arrow marks an external destination. |
| Run it locally | `.demo-run-link`: underlined text button | 32px, 44px with a coarse pointer | Opens the setup dialog. Hover changes color to `--primary`. |

Placement: one row on the entry page, in the order above. During and after a session, "Run it locally" and "Build your own" are the last header actions, in that order. They never appear in the voice dock.

### Agent Signal

On the entry page it sits above the heading, `280px` wide at most and `88px` high, with its pause control to the right. Its status text is for screen readers only on the entry page; the start button and the inline alert carry visible feedback.

### Sample conversation (`ScenarioSample`)

- A raised plane with a 1px boundary and the `--radius` corner.
- Caption "Sample conversation" in the label role.
- Agent lines are plain text aligned to the start. User lines are bubbles on `--card` aligned to the end.
- A feature tag is plain `--primary` text above the Agent line. It has no fill and no border.
- Content comes from `sample` in `lib/presentation.ts`. Sample questions must exist in `lib/scenario-knowledge.ts`.

### Code field (`CopyField`)

One 1px boundary on `--card`, code at the start, one icon-only copy button at the end. Success swaps the icon to a check in `--primary` and announces "Copied to clipboard". Do not add a title bar, a text "Copy" button or a nested container.

### Setup dialog (`DeveloperGuide`)

- Centered dialog, maximum width `760px`, `--radius` corner, `32px` padding (`24px 20px` on phones).
- Two line-style tabs: "Use the CLI" (default) and "Use an AI assistant".
- "Use the CLI" is a label and content table: Create, Configure, Run, Customize. Labels use secondary text in a `96px` column. Rows stack on phones.
- Footer links are plain underlined text without icons.
- Focus returns to the control that opened the dialog.

## Views not yet aligned with this guide

These views keep their earlier styles. They were not tested with a live session after the `--radius` change. Verify them with Agora credentials before you restyle them, and change one view at a time.

| View | Current state |
| --- | --- |
| Live session (`QuickstartConversationLayout`, `VoiceDock`, transcript) | Heading "Conversation" at 30px, weight 500. Voice dock uses the glass material from `recipes.css`; its buttons now inherit the 2px corner. |
| Ended view | Heading "Session ended." at 30px, weight 500, then the transcript and "Start again". |
| FAQ drawer (`ScenarioFaq`, `styles/faq.css`) | Right-side drawer, title at 24px, weight 500. |
| Inspector drawer (`ScenarioInspector`) | Right-side drawer with three tabs, title at 24px, weight 500. |
| Start error | Inline alert below the expectations line. |

When you align one of these views, reuse the tokens and type roles above. Do not introduce a second scale.

## Checks after a visual change

1. Run `pnpm run verify`.
2. Inspect the entry page at 1440px, 390px and 320px. Confirm there is no horizontal scroll.
3. Open the setup dialog, switch tabs, copy a command, close with Escape and confirm focus returns.
4. Trigger a start failure and confirm the inline alert.
5. With Agora credentials, run a session and inspect the live and ended views, including the two header actions.
6. Compare button shape and primary color with the public website.
