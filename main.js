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

async function loadPosts() {
  const res = await fetch("./posts/index.json", { cache: "no-store" });
  return res.json();
}

function postCard(post) {
  const a = document.createElement("a");
  a.className = "card post-card";
  a.href = `./post.html?slug=${encodeURIComponent(post.slug)}`;

  const meta = buildMeta(post.date, post.category, post.readTime);
  const excerptHtml = post.excerpt
    ? `<p class="post-card__excerpt muted small">${escapeHtml(post.excerpt)}</p>`
    : "";

  a.innerHTML = `
    <div>
      <h3 class="post-card__title">${escapeHtml(post.title)}</h3>
      <p class="muted small">${escapeHtml(meta)}</p>
      ${excerptHtml}
    </div>
    <p class="muted small">Artikel öffnen →</p>
  `;
  return a;
}

async function initHome() {
  const grid = document.getElementById("postsGrid");
  if (!grid) return;

  const emptyState = document.getElementById("emptyState");
  const trendingList = document.getElementById("trendingList");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const categoryNav = document.getElementById("categoryNav");

  let posts = await loadPosts();
  posts = posts.slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  let activeCategory = "Alle";

  // Build category navigation pills
  const categories = ["Alle", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean))).sort()];
  if (categoryNav) {
    categoryNav.innerHTML = categories.map(cat =>
      `<button class="pill${cat === "Alle" ? " pill--active" : ""}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
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

  function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = posts.filter(p => {
      const matchesSearch = !q ||
        (p.title    || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.excerpt  || "").toLowerCase().includes(q);
      const matchesCategory = activeCategory === "Alle" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    render(filtered);
    if (searchClear) searchClear.style.display = q ? "inline-flex" : "none";
  }

  function render(list) {
    grid.innerHTML = "";
    list.forEach(p => grid.appendChild(postCard(p)));
    emptyState.classList.toggle("hidden", list.length !== 0);

    // Neueste = die 5 neuesten Beiträge
    trendingList.innerHTML = "";
    posts.slice(0, 5).forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="./post.html?slug=${encodeURIComponent(p.slug)}">${escapeHtml(p.title)}</a>`;
      trendingList.appendChild(li);
    });
  }

  render(posts);

  searchInput.addEventListener("input", applyFilters);

  if (searchClear) {
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      activeCategory = "Alle";
      if (categoryNav) {
        categoryNav.querySelectorAll("[data-cat]").forEach(b =>
          b.classList.toggle("pill--active", b.dataset.cat === "Alle")
        );
      }
      applyFilters();
    });
  }
}

initHome().catch(console.error);
