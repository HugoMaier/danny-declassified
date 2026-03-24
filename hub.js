// hub.js — Thematic hub page renderer
// Shared by hub.html (DE) and en/hub.html (EN)

const IS_EN = window.location.pathname.includes('/en/');
const LANG = IS_EN ? 'en' : 'de';
const hubKey = new URLSearchParams(window.location.search).get('hub');

// ── Editorial hub data ───────────────────────────────────────────────
const HUB_DATA = {
  'economic-pressure': {
    de: {
      title: 'Wirtschaftsdruck, Migration und der Aufstieg der AfD',
      intro: 'Deutschland hat von Globalisierung und EU-Erweiterung profitiert – aber nicht alle gleichermaßen. Wer unter hohem Wettbewerbsdruck stand, in Mietwohnungen lebte oder wenig Reserven hatte, dem nützte abstraktes Wohlstandswachstum wenig. Diese Essayreihe zeigt, wie Arbeitsmarktdruck, Wohnungsknappheit, die Flüchtlingskrise und der Aufstieg der AfD strukturell zusammenhängen – und warum die Sozialdemokratie an dieser Aufgabe gescheitert ist.',
      startHere: '20260318-die-auswirkung-der-globalisierung-auf-arbeits-und-wohnungsmarkt',
      readingOrder: [
        '20260318-die-auswirkung-der-globalisierung-auf-arbeits-und-wohnungsmarkt',
        '20260318-die-auswirkung-der-eu-osterweiterung-auf-arbeits-und-wohnungsmarkt',
        '20260320-deutschlands-stille-soziale-wende-1997-2006',
        '20260318-die-europ-ische-sozialdemokratie-seit-2000-ffnung-soziale-sicherung-und-der-preis-ungleicher-globalisierung',
        '20260318-fl-chtlingskrise-konomischer-wandel-und-der-aufstieg-der-afd',
        '20260318-der-auftieg-der-afd-im-kontext-der-entwicklung-des-arbeits-und-des-wohnungsmarktes',
        '20260320-deutschlands-ungleiche-wende',
        '20260319-warum-der-kulturkampf-so-erbittert-werden-konnte',
        '20260318-wie-deutschland-seine-gesellschaft-stabilisieren-und-strategisch-unabh-ngiger-werden-k-nnte'
      ]
    },
    en: {
      title: 'Economic Pressure, Migration, and the Rise of the AfD',
      intro: 'Germany has benefited from globalisation and EU enlargement — but not everyone equally. Those working under high competitive pressure, renting their homes, or with few reserves saw little advantage from abstract prosperity growth. This essay series shows how labour market pressure, housing shortages, the refugee crisis, and the AfD\'s rise are structurally connected — and why social democracy failed to meet this challenge.',
      startHere: '20260318-die-auswirkung-der-globalisierung-auf-arbeits-und-wohnungsmarkt',
      readingOrder: [
        '20260318-die-auswirkung-der-globalisierung-auf-arbeits-und-wohnungsmarkt',
        '20260318-die-auswirkung-der-eu-osterweiterung-auf-arbeits-und-wohnungsmarkt',
        '20260320-deutschlands-stille-soziale-wende-1997-2006',
        '20260318-die-europ-ische-sozialdemokratie-seit-2000-ffnung-soziale-sicherung-und-der-preis-ungleicher-globalisierung',
        '20260318-fl-chtlingskrise-konomischer-wandel-und-der-aufstieg-der-afd',
        '20260318-der-auftieg-der-afd-im-kontext-der-entwicklung-des-arbeits-und-des-wohnungsmarktes',
        '20260320-deutschlands-ungleiche-wende',
        '20260319-warum-der-kulturkampf-so-erbittert-werden-konnte',
        '20260318-wie-deutschland-seine-gesellschaft-stabilisieren-und-strategisch-unabh-ngiger-werden-k-nnte'
      ]
    }
  },
  'culture-war': {
    de: {
      title: 'Kulturkampf, Klasse und Moralisierung',
      intro: 'Der deutsche Kulturkampf wirkt auf den ersten Blick wie ein moralischer Konflikt. Tatsächlich ist er auch ein Klassenkonflikt: Privilegierte Milieus nutzen moralische Positionierungen als Form sozialer Distinktion, während sich materielle Ungleichheit unsichtbar weiterentwickelt. Diese Essays untersuchen, wie symbolische Konflikte und materielle Realitäten zusammenspielen.',
      startHere: '20260319-warum-der-kulturkampf-so-erbittert-werden-konnte',
      readingOrder: [
        '20260319-warum-der-kulturkampf-so-erbittert-werden-konnte',
        '20260320-moralisierung-distinktion-und-materielle-ungleichheit'
      ]
    },
    en: {
      title: 'Culture War, Class, and Moralization',
      intro: 'Germany\'s culture war appears at first glance to be a moral conflict. In reality, it is also a class conflict: privileged milieus use moral positioning as a form of social distinction, while material inequality quietly deepens. These essays examine how symbolic conflicts and material realities interact.',
      startHere: '20260319-warum-der-kulturkampf-so-erbittert-werden-konnte',
      readingOrder: [
        '20260319-warum-der-kulturkampf-so-erbittert-werden-konnte',
        '20260320-moralisierung-distinktion-und-materielle-ungleichheit'
      ]
    }
  },
  'geopolitics': {
    de: {
      title: 'Deutschland in einer härteren geopolitischen Welt',
      intro: 'Deutschland ist in eine härtere geopolitische Welt eingetreten, ohne dafür vorbereitet zu sein. Militärische Abhängigkeiten, wirtschaftliche Verwundbarkeit und fehlende strategische Autonomie sind keine theoretischen Risiken mehr. Diese Essays analysieren, was ein großer Simultankonflikt bedeuten würde – und welche Grundlagen für eine widerstandsfähigere Gesellschaft jetzt gelegt werden müssen.',
      startHere: '20260318-fiktives-kriegsszenario-was-ein-gro-konflikt-mit-china-russland-und-iran-f-r-deutschland-und-die-eu-bedeuten-w-rde',
      readingOrder: [
        '20260318-fiktives-kriegsszenario-was-ein-gro-konflikt-mit-china-russland-und-iran-f-r-deutschland-und-die-eu-bedeuten-w-rde',
        '20260318-wie-deutschland-seine-gesellschaft-stabilisieren-und-strategisch-unabh-ngiger-werden-k-nnte',
        '20260321-die-naechsten-zehn-jahre-ki-und-robotik',
        '20260105-welcome-to-danny-declassified'
      ]
    },
    en: {
      title: 'Germany in a Harder Geopolitical World',
      intro: 'Germany has entered a harsher geopolitical world without being prepared for it. Military dependencies, economic vulnerabilities, and the lack of strategic autonomy are no longer theoretical risks. These essays analyse what a major simultaneous conflict would mean — and what foundation must now be laid for a more resilient society.',
      startHere: '20260318-fiktives-kriegsszenario-was-ein-gro-konflikt-mit-china-russland-und-iran-f-r-deutschland-und-die-eu-bedeuten-w-rde',
      readingOrder: [
        '20260318-fiktives-kriegsszenario-was-ein-gro-konflikt-mit-china-russland-und-iran-f-r-deutschland-und-die-eu-bedeuten-w-rde',
        '20260318-wie-deutschland-seine-gesellschaft-stabilisieren-und-strategisch-unabh-ngiger-werden-k-nnte',
        '20260321-die-naechsten-zehn-jahre-ki-und-robotik',
        '20260105-welcome-to-danny-declassified'
      ]
    }
  }
};

const ALL_HUBS = [
  {
    key: 'economic-pressure',
    de: { title: 'Wirtschaftsdruck, Migration und der Aufstieg der AfD', desc: 'Wie Globalisierung, Wohnungsknappheit und die Flüchtlingskrise zusammenhängen.' },
    en: { title: 'Economic Pressure, Migration, and the Rise of the AfD', desc: 'How globalisation, housing costs, and the refugee crisis are connected.' }
  },
  {
    key: 'culture-war',
    de: { title: 'Kulturkampf, Klasse und Moralisierung', desc: 'Über symbolische Konflikte und materielle Ungleichheit.' },
    en: { title: 'Culture War, Class, and Moralization', desc: 'On symbolic conflicts and material inequality.' }
  },
  {
    key: 'geopolitics',
    de: { title: 'Deutschland in einer härteren geopolitischen Welt', desc: 'Strategische Abhängigkeiten, Konflikte und gesellschaftliche Resilienz.' },
    en: { title: 'Germany in a Harder Geopolitical World', desc: 'Strategic dependencies, conflict scenarios, and societal resilience.' }
  }
];

// ── Helpers ──────────────────────────────────────────────────────────
function escapeHtml(s) {
  return String(s || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}
function catSlug(cat) {
  return (cat || '').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
}
function formatDate(str) {
  const d = new Date(str + 'T12:00:00');
  const locale = IS_EN ? 'en-GB' : 'de-DE';
  return isNaN(d.getTime()) ? str : d.toLocaleDateString(locale, { year:'numeric', month:'long', day:'numeric' });
}

// ── Article card (matches homepage card visually) ─────────────────────
function makeCard(post) {
  const a = document.createElement('a');
  const cs = catSlug(post.category || '');
  a.className = `card post-card post-card--regular cat-${cs}`;
  a.href = `./post.html?slug=${encodeURIComponent(post.slug)}`;
  const catPill = post.category ? `<span class="cat-pill cat-pill--${cs}">${escapeHtml(post.category)}</span>` : '';
  const excerptHtml = post.excerpt ? `<p class="post-card__excerpt muted small">${escapeHtml(post.excerpt)}</p>` : '';
  a.innerHTML = `
    <div class="post-card__cat-row">${catPill}</div>
    <h3 class="post-card__title">${escapeHtml(post.title)}</h3>
    ${excerptHtml}
    <p class="muted small">${escapeHtml(formatDate(post.date))} · ${escapeHtml(post.readTime || '')}</p>
  `;
  return a;
}

// ── Hub card (for "other dossiers" section) ───────────────────────────
function makeHubCard(hub) {
  const a = document.createElement('a');
  a.className = 'hub-card';
  a.href = `./hub.html?hub=${encodeURIComponent(hub.key)}`;
  const label = hub[LANG];
  a.innerHTML = `
    <h3 class="hub-card__title">${escapeHtml(label.title)}</h3>
    <p class="hub-card__desc">${escapeHtml(label.desc)}</p>
    <span class="hub-card__cta">${IS_EN ? 'Read dossier \u2192' : 'Zum Dossier \u2192'}</span>
  `;
  return a;
}

// ── Main ─────────────────────────────────────────────────────────────
async function init() {
  if (!hubKey || !HUB_DATA[hubKey]) {
    document.getElementById('hubTitle').textContent = IS_EN ? 'Dossier not found.' : 'Dossier nicht gefunden.';
    return;
  }

  const data = HUB_DATA[hubKey][LANG];

  // SEO
  document.title = `Danny Declassified — ${data.title}`;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', data.title);
  document.querySelector('meta[name="description"]')?.setAttribute('content', data.intro.slice(0, 160));

  // Wire language switcher
  const enLink = document.getElementById('enLink');
  const deLink = document.getElementById('deLink');
  if (IS_EN) {
    if (deLink) deLink.href = `../hub.html?hub=${encodeURIComponent(hubKey)}`;
    if (enLink) enLink.href = `./hub.html?hub=${encodeURIComponent(hubKey)}`;
  } else {
    if (enLink) enLink.href = `./en/hub.html?hub=${encodeURIComponent(hubKey)}`;
  }

  // Load posts
  const posts = await fetch('./posts/index.json', { cache: 'no-store' }).then(r => r.json());
  const hubPosts = posts.filter(p => (p.themes || []).includes(hubKey))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Hub title + intro
  document.getElementById('hubTitle').textContent = data.title;
  document.getElementById('hubIntro').textContent = data.intro;

  // Start here
  const startPost = hubPosts.find(p => p.slug === data.startHere) || hubPosts[0];
  if (startPost) document.getElementById('startHereCard').appendChild(makeCard(startPost));

  // Reading order
  const orderedPosts = data.readingOrder.map(s => posts.find(p => p.slug === s)).filter(Boolean);
  document.getElementById('readingOrderList').innerHTML = orderedPosts.map((p, i) => `
    <li class="reading-order__item">
      <span class="reading-order__num">${i + 1}</span>
      <div>
        <a href="./post.html?slug=${encodeURIComponent(p.slug)}" class="reading-order__link">${escapeHtml(p.title)}</a>
        <p class="muted small" style="margin:4px 0 0">${escapeHtml(p.excerpt || '')}</p>
      </div>
    </li>`).join('');

  // Article grid
  const hubGrid = document.getElementById('hubGrid');
  hubPosts.forEach(p => hubGrid.appendChild(makeCard(p)));

  // Other dossiers
  const relatedHubsEl = document.getElementById('relatedHubs');
  ALL_HUBS.filter(h => h.key !== hubKey).forEach(h => relatedHubsEl.appendChild(makeHubCard(h)));
}

init().catch(err => {
  console.error(err);
  document.getElementById('hubTitle').textContent = IS_EN ? 'Error loading dossier.' : 'Fehler beim Laden.';
});
