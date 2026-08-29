function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggle");
  const icon = btn?.querySelector("i");
  if (!btn || !icon) return;

  icon.className = theme === "dark"
    ? "bi bi-moon-fill"
    : "bi bi-sun-fill";

  btn.setAttribute(
    "aria-label",
    theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"
  );
}

function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // ★ デフォルトをlightに変更
  const current = root.dataset.theme || "light";
  root.dataset.theme = current;

  updateThemeIcon(current);

  if (btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch (e) {}

    updateThemeIcon(next);
  });
}

window.initThemeToggle = initThemeToggle;