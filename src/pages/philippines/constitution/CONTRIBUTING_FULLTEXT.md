# Adding Full Constitutional Text

This page can show the complete, section-by-section text of each constitution
inline, below its summary. Right now only the summaries exist — nobody has
transcribed the full text yet. This guide walks through adding it for one
version at a time.

## Why this is manual

These documents are long (the 1987 Constitution alone has 18 articles and
roughly 300 sections) and accuracy matters a lot for a legal document. The
safest way to get it right is to copy text directly from an official or
reliable public-domain source, rather than have it generated or
paraphrased. Good sources:

- **LawPhil Project** (recommended — clean, single-page, plain text):
  - 1899 Malolos: https://lawphil.net/consti/consmalo.html
  - 1935: https://lawphil.net/consti/cons1935.html
  - 1973: https://lawphil.net/consti/cons1973.html
  - 1987: https://lawphil.net/consti/cons1987.html
- **Official Gazette**: https://www.officialgazette.gov.ph/constitutions/
- **Chan Robles Virtual Law Library**: https://chanrobles.com (search by year)
- **Constitute Project** (1987 only, with English): https://www.constituteproject.org/constitution/Philippines_1987

Philippine government works, including constitutions, are not subject to
copyright under Republic Act No. 8293 (the Intellectual Property Code),
Section 176. So reproducing the full text here is legitimate — the goal of
this guide is accuracy, not copyright avoidance.

## Step 1 — Pick a version and find its slug

Slugs are defined in `data.ts`:

| Slug | Constitution |
|---|---|
| `1987-constitution` | 1987 Constitution |
| `freedom-constitution-1986` | 1986 Freedom Constitution |
| `1973-constitution` | 1973 Constitution |
| `1943-constitution` | 1943 Constitution |
| `1935-constitution` | 1935 Constitution |
| `jones-law-1916` | Jones Law |
| `organic-act-1902` | Organic Act of 1902 |
| `malolos-1899` | 1899 Malolos Constitution |

## Step 2 — Create a file for the full text

Create a new file at:

```
src/pages/philippines/constitution/versions/fullText<Slug>.ts
```

For example, for the 1987 Constitution:
`src/pages/philippines/constitution/versions/fullText1987.ts`

Use this template (matches the `ConstitutionFullText` shape in `schema.ts`):

```ts
import type { ConstitutionFullText } from '../schema';

// Transcribed verbatim from [SOURCE NAME]. See sourceUrl below.
export const fullText1987: ConstitutionFullText = {
  sourceUrl: 'https://lawphil.net/consti/cons1987.html',
  retrievedDate: '2026-06-19', // the date you copied this text
  preamble: 'We, the sovereign Filipino people, imploring the aid of...',
  articles: [
    {
      heading: 'Article I',
      title: 'National Territory',
      sections: [
        {
          // omit `number` for an article with a single unnumbered paragraph
          text: 'The national territory comprises the Philippine archipelago...',
        },
      ],
    },
    {
      heading: 'Article II',
      title: 'Declaration of Principles and State Policies',
      sections: [
        { number: '1', text: 'The Philippines is a democratic and republican State...' },
        { number: '2', text: 'The Philippines renounces war as an instrument...' },
        // ...one entry per Section
      ],
    },
    // ...one entry per Article, in order
  ],
};
```

### Formatting tips

- **One `section` per numbered Section** (or per paragraph, for older
  constitutions that use "Article" instead of "Section"). Don't merge
  multiple sections into one block — it breaks the per-section rendering
  and makes the text harder to scan.
- **Sub-clauses within a section** (e.g. "(1)... (2)... (3)...") can stay
  inside one `text` string. Separate them with `\n\n` so they render as
  separate paragraphs — see `Section 12` of Article III in the source for
  an example pattern.
- **Copy text exactly**, including capitalization and punctuation quirks
  in the original (e.g. some older transcriptions have inconsistent
  spacing or minor typos in the source itself — that's fine, leave them
  as-is rather than "fixing" them, so the text matches what you can
  verify against the source).
- For very old constitutions that use "Title" instead of "Article" (like
  the 1899 Malolos Constitution), just put "Title I" etc. in `heading`.

## Step 3 — Wire it into `data.ts`

At the top of `data.ts`, import the file you just created:

```ts
import { fullText1987 } from './versions/fullText1987';
```

Then add a `fullText: fullText1987,` line to that version's entry in the
`rawData` array. For example:

```ts
{
  slug: '1987-constitution',
  name: 'The 1987 Constitution of the Republic of the Philippines',
  // ...existing fields...
  fullText: fullText1987, // <-- add this line
},
```

That's it — the page will automatically render the full text inline below
the summary, with no other code changes needed. If you don't add this line,
the page just shows a "full text hasn't been added yet" note with a link
out to the source, which is the current default for all 8 versions.

## Step 4 — Verify

```bash
npm install
npx tsc --noEmit -p tsconfig.app.json   # zod will reject malformed entries
npm run dev
```

Visit `/philippines/constitution/<slug>` and read through it once against
the source tab open side-by-side, spot-checking a few sections at random.

## Doing this for all 8 versions

Repeat Steps 2–3 for each remaining slug. There's no need to do them all at
once — each version works independently, so you can ship 1987 first (it's
the one currently in force and the one most people will look for) and add
the rest over time.
