
async function loadInclude(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const url = mount.dataset.include;
  if (!url) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) return;

  mount.innerHTML = await res.text();

  // landing のときだけ、トグルを theme-slot に移動（ヘッダー挿入後にやる）
  if (document.body.classList.contains("landing")) {
    const slot = document.querySelector(".theme-slot");
    const toggleLi = document.querySelector("#themeToggle")?.closest("li");
    if (slot && toggleLi) slot.appendChild(toggleLi);
  }

  // トグルの移動後にテーマ初期化
  if (typeof window.initThemeToggle === "function") {
    window.initThemeToggle();
  }
}

loadInclude("#siteHeader");
