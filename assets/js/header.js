(function () {
  const MOBILE_MAX = 768;
  let lastScrollY = window.scrollY;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function normalizePath(path) {
    if (!path) return "/";
    if (path === "/") return "/";
    return path.replace(/\/+$/, "") || "/";
  }

  function setActiveMenu() {
    const links = document.querySelectorAll(".menu a");
    if (!links.length) return false;

    const current = normalizePath(location.pathname);

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      // 外部リンクはactive対象外
      if (/^https?:\/\//.test(href)) return;

      const normalizedHref = normalizePath(href);

      // 完全一致 or 配下ページ一致
      if (
        current === normalizedHref ||
        current.startsWith(normalizedHref + "/")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    return true;
  }

  function initHeaderScroll() {
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (!header) return;

      if (!isMobile()) {
        header.classList.remove("is-hidden");
        return;
      }

      const currentY = window.scrollY;

      if (currentY < 60) {
        header.classList.remove("is-hidden");
        lastScrollY = currentY;
        return;
      }

      if (currentY > lastScrollY) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentY;
    });
  }

  function boot() {
    initHeaderScroll();

    // すぐ試す
    if (setActiveMenu()) return;

    // header後挿入対策
    setTimeout(setActiveMenu, 50);
    setTimeout(setActiveMenu, 150);
    setTimeout(setActiveMenu, 300);

    const observer = new MutationObserver(() => {
      if (setActiveMenu()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();