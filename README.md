# Danny Declassified

A bilingual German/English essay portal on politics, economics, and society. Essays are grouped into three **thematic dossiers** that build connected lines of argument rather than isolated posts.

**Live site:** https://hugomaier.github.io/danny-declassified/

---

## What this is

Danny Declassified publishes analytical essays on contemporary German and European politics. The writing is opinion-led but evidence-grounded, aimed at readers who want more than headlines.

**Three thematic dossiers:**

| Dossier | Topic |
|---|---|
| [Economic Pressure, Migration, and the Rise of the AfD](https://hugomaier.github.io/danny-declassified/hub.html?hub=economic-pressure) | How labour market pressure, housing shortages, and the refugee crisis fuelled the far right |
| [Culture War, Class, and Moralization](https://hugomaier.github.io/danny-declassified/hub.html?hub=culture-war) | Symbolic conflicts, class distinction, and material inequality |
| [Germany in a Harder Geopolitical World](https://hugomaier.github.io/danny-declassified/hub.html?hub=geopolitics) | Strategic dependencies, conflict scenarios, and societal resilience |

---

## Bilingual structure

```
/                  → German homepage
/en/               → English homepage
/post.html?slug=X  → German article
/en/post.html?slug=X → English article
/dossiers.html     → German dossier overview
/en/dossiers.html  → English dossier overview
/hub.html?hub=KEY  → German thematic hub
/en/hub.html?hub=KEY → English thematic hub
```

The German and English editions share the same article slugs. Articles are stored as HTML body fragments under `posts/<slug>.html` and `en/posts/<slug>.html`. Metadata lives in `posts/index.json` and `en/posts/index.json`.

---

## Publishing a new article

1. **Write the article** (DOCX or Markdown)
2. **Open `admin.html`** in any browser (for DOCX: Mammoth.js converts it to clean HTML; for Markdown: convert to HTML manually)
3. **Fill in the metadata fields** (title, date, category, subtitle, excerpt, read time)
4. **Copy the generated JSON snippet** into `posts/index.json` and `en/posts/index.json` — prepend it at the top of the array (newest first). Set `"isNew": true` on the new entry and **remove** `"isNew"` from the previously newest entry
5. **Add the theme(s)** for the new article (see below)
6. **Update `hub.js` `readingOrder` arrays** — for each hub the article belongs to, append the new slug to both the `de.readingOrder` and `en.readingOrder` arrays inside `HUB_DATA`
7. **Update the article counts** in `dossiers.html` and `en/dossiers.html` — the counts per dossier are hardcoded and must be incremented manually
8. **Save the HTML body** as `posts/<slug>.html` (and `en/posts/<slug>.html` for the English version)
9. **Update `sitemap.xml`** — add two new `<url>` entries (DE + EN) at the top of their respective article blocks, keeping entries sorted newest date first. Also update the homepage `<lastmod>` to today's date
10. **Commit and push** — GitHub Pages deploys automatically

---

## Assigning an article to a thematic dossier

Add a `"themes"` array to the post's JSON entry. A complete metadata entry looks like this:

```json
{
  "title": "Article title",
  "date": "2026-03-24",
  "category": "Wirtschaft",
  "slug": "20260324-my-article-slug",
  "subtitle": "A short explanatory subtitle",
  "excerpt": "One or two sentences shown on the homepage card and used as the meta description.",
  "readTime": "7 min Lesezeit",
  "isNew": true,
  "themes": ["economic-pressure"],
  "related": ["slug-of-related-article-1", "slug-of-related-article-2"]
}
```

**`isNew`** — only the single most recent article should have this. It triggers the NEU/NEW badge on the hero card. Remove it from the previously newest article when publishing a new one.

**Available theme keys:**
- `"economic-pressure"` — Hub 1: Economic pressure, migration, AfD
- `"culture-war"` — Hub 2: Culture war, class, moralization
- `"geopolitics"` — Hub 3: Germany in a harder geopolitical world

A post may belong to more than one hub.

**`related`** is optional. When present, those slugs appear as hand-picked cross-links at the bottom of the article. When absent, the article page falls back to theme-based matches (same `themes[]`), then to category-based matches, to fill the "related articles" section.

---

## Category names (DE vs EN)

Categories must use the correct language-specific name or the coloured card border and pill will not render. The CSS includes aliases for each pair:

| DE category | EN category | Colour |
|---|---|---|
| `Wirtschaft` | `Economy` | Amber |
| `Geopolitik` | `Geopolitics` | Rose |
| `Germany` | `Germany` | Blue (unchanged) |
| `Technology` | `Technology` | Purple (unchanged) |

---

## Tech stack

- **HTML / CSS / JavaScript** — no framework, no build step
- **Mammoth.js** (client-side DOCX → HTML conversion in `admin.html`)
- **GitHub Pages** (static hosting, automatic deployment on push)
- **hits.sh** (view count tracking per article)

---

## Repo structure

```
index.html          German homepage
en/index.html       English homepage
post.html           German article page
en/post.html        English article page
hub.html            Thematic hub template (DE)
en/hub.html         Thematic hub template (EN)
hub.js              Hub page rendering engine (shared) — contains hardcoded readingOrder arrays
dossiers.html       Dossier overview (DE) — contains hardcoded article counts
en/dossiers.html    Dossier overview (EN) — contains hardcoded article counts
styles.css          Shared stylesheet
main.js             Homepage card rendering (DE)
en/main.js          Homepage card rendering (EN)
admin.html          Local publishing tool
posts/index.json    German post metadata
en/posts/index.json English post metadata
posts/<slug>.html   German article body HTML
en/posts/<slug>.html English article body HTML
robots.txt          Search engine crawler rules
sitemap.xml         Full site sitemap (sorted newest first)
```
