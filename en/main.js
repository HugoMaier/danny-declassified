const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

function buildMeta(...parts) {
  return parts.filter(Boolean).join(' · ');
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(str, locale) {
  const d = new Date(str + 'T12:00:00');
  return isNaN(d.getTime()) ? str : d.toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function catSlug(cat) {
  return (cat || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

async function loadPosts() {
  const res = await fetch("./posts/index.json", { cache: "no-store" });
  return res.json();
}

function postCard(post, size, isNew) {
  size = size || 'regular';
  isNew = !!isNew || !!post.isNew;
  const a = document.createElement("a");
  const cat = post.category || '';
  const cs = catSlug(cat);
  a.className = `card post-card post-card--${size} cat-${cs}`;
  a.href = `./post.html?slug=${encodeURIComponent(post.slug)}`;

  const dateStr = formatDate(post.date, 'en-GB');
  const meta = buildMeta(dateStr, post.readTime);
  const excerptHtml = post.excerpt
    ? `<p class="post-card__excerpt muted small">${escapeHtml(post.excerpt)}</p>`
    : "";
  const newBadge = isNew ? `<span class="badge-new">NEW</span>` : '';
  const catPill = cat ? `<span class="cat-pill cat-pill--${cs}">${escapeHtml(cat)}</span>` : '';

  a.innerHTML = `
    <div class="post-card__cat-row">${catPill}${newBadge}</div>
    <h3 class="post-card__title">${escapeHtml(post.title)}</h3>
    ${excerptHtml}
    <p class="muted small">${escapeHtml(meta)}</p>
  `;
  return a;
}

async function initHome() {
  const postsGrid = document.getElementById("postsGrid");
  if (!postsGrid) return;

  const emptyState = document.getElementById("emptyState");
  const trendingList = document.getElementById("trendingList");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const categoryNav = document.getElementById("categoryNav");

  let posts = await loadPosts();
  posts = posts.slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  let activeCategory = "All";

  // Build category navigation pills
  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean))).sort()];
  if (categoryNav) {
    categoryNav.innerHTML = categories.map(cat =>
      `<button class="pill${cat === "All" ? " pill--active" : ""}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
    ).join("");

    categoryNav.addEventListener("click", e => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      categoryNav.querySelectorAll("[data-cat]").forEach(b =>
        b.classList.toggle("pill--active", b.dataset.cat === activeCategory)
      );
      applyFilters();
    });
  }

  function updateTrending() {
    trendingList.innerHTML = "";
    posts.slice(0, 5).forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="./post.html?slug=${encodeURIComponent(p.slug)}">${escapeHtml(p.title)}</a>`;
      trendingList.appendChild(li);
    });
  }

  function render(list) {
    postsGrid.innerHTML = "";
    emptyState.classList.toggle("hidden", list.length !== 0);
    updateTrending();
    if (list.length === 0) return;

    const isFiltered = activeCategory !== "All" || searchInput.value.trim() !== "";

    if (!isFiltered) {
      // Hero card (most recent article)
      postsGrid.appendChild(postCard(list[0], 'hero', true));

      // Secondary row (2nd–4th articles)
      if (list.length > 1) {
        const row = document.createElement("div");
        row.className = "secondary-row";
        list.slice(1, 4).forEach(p => row.appendChild(postCard(p, 'secondary', false)));
        postsGrid.appendChild(row);
      }

      // Regular grid (5th article onwards)
      if (list.length > 4) {
        const g = document.createElement("div");
        g.className = "grid";
        list.slice(4).forEach(p => g.appendChild(postCard(p, 'regular', false)));
        postsGrid.appendChild(g);
      }
    } else {
      // Filtered view: plain grid
      const g = document.createElement("div");
      g.className = "grid";
      list.forEach(p => g.appendChild(postCard(p, 'regular', false)));
      postsGrid.appendChild(g);
    }
  }

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = posts.filter(p => {
      const matchesSearch = !q ||
        (p.title    || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.excerpt  || "").toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    render(filtered);
    if (searchClear) searchClear.style.display = q ? "inline-flex" : "none";
  }

  render(posts);
  searchInput.addEventListener("input", applyFilters);

  if (searchClear) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      activeCategory = "All";
      if (categoryNav) {
        categoryNav.querySelectorAll("[data-cat]").forEach(b =>
          b.classList.toggle("pill--active", b.dataset.cat === "All")
        );
      }
      applyFilters();
    });
  }

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () =>
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400));
    scrollTopBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}

initHome().catch(console.error);
