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

1. **Write the article** in DOCX
2. **Open `admin.html`** in any browser
3. **Upload the DOCX** — Mammoth.js converts it to clean HTML
4. **Fill in the metadata fields** (title, date, category, subtitle, excerpt, read time)
5. **Copy the generated JSON snippet** into `posts/index.json` and `en/posts/index.json`
6. **Add the theme(s)** for the new article (see below)
7. **Save the HTML body** as `posts/<slug>.html` (and `en/posts/<slug>.html` for the English version)
8. **Update `sitemap.xml`** with the new URL
9. **Commit and push** — GitHub Pages deploys automatically

---

## Assigning an article to a thematic dossier

Add a `"themes"` array to the post's JSON entry:

```json
{
  "title": "...",
  "slug": "my-article-slug",
  "themes": ["economic-pressure"],
  "related": ["slug-of-related-article-1", "slug-of-related-article-2"]
}
```

**Available theme keys:**
- `"economic-pressure"` — Hub 1: Economic pressure, migration, AfD
- `"culture-war"` — Hub 2: Culture war, class, moralization
- `"geopolitics"` — Hub 3: Germany in a harder geopolitical world

A post may belong to more than one hub. The `"related"` field is optional — it defines explicit hand-picked cross-links shown at the end of each article. If omitted, the system falls back to theme-based matching.

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
hub.js              Hub page rendering engine (shared)
dossiers.html       Dossier overview (DE)
en/dossiers.html    Dossier overview (EN)
styles.css          Shared stylesheet
main.js             Homepage card rendering (DE)
en/main.js          Homepage card rendering (EN)
admin.html          Local publishing tool
posts/index.json    German post metadata
en/posts/index.json English post metadata
posts/<slug>.html   German article body HTML
en/posts/<slug>.html English article body HTML
robots.txt          Search engine crawler rules
sitemap.xml         Full site sitemap
```
