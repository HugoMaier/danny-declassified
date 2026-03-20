const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

async function loadPosts() {
  const res = await fetch("./posts/index.json", { cache: "no-store" });
  return res.json();
}

function postCard(post) {
  const a = document.createElement("a");
  a.className = "card post-card";
  a.href = `./post.html?slug=${encodeURIComponent(post.slug)}`;

  a.innerHTML = `
    <div>
      <h3 class="post-card__title">${escapeHtml(post.title)}</h3>
      <div class="post-card__meta">
        <span class="pill">${escapeHtml(post.date || "")}</span>
        <span class="pill pill--ghost">${escapeHtml(post.category || "General")}</span>
      </div>
    </div>
    <p class="muted small">Open article →</p>
  `;
  return a;
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function initHome() {
  const grid = document.getElementById("postsGrid");
  if (!grid) return;

  const emptyState = document.getElementById("emptyState");
  const trendingList = document.getElementById("trendingList");
  const searchInput = document.getElementById("searchInput");

  let posts = await loadPosts();
  posts = posts.slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  function render(list) {
    grid.innerHTML = "";
    list.forEach(p => grid.appendChild(postCard(p)));
    emptyState.classList.toggle("hidden", list.length !== 0);

    // Trending = first 5
    trendingList.innerHTML = "";
    list.slice(0, 5).forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="./post.html?slug=${encodeURIComponent(p.slug)}">${escapeHtml(p.title)}</a>`;
      trendingList.appendChild(li);
    });
  }

  render(posts);

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = posts.filter(p =>
      (p.title || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
    render(filtered);
  });
}

initHome().catch(console.error);
