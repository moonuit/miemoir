function initGallery(root = document) {
  const panels = Array.from(
    root.querySelectorAll("[data-gallery-panel]")
  );

  const buttons = Array.from(
    root.querySelectorAll("[data-gallery-target]")
  );

  const prev = root.querySelector(".gallery-prev");
  const next = root.querySelector(".gallery-next");

  const ids = panels.map(
    panel => panel.dataset.galleryPanel
  );

  let currentIndex = 0;

  function openPanel(id) {
    panels.forEach(panel => {
      panel.classList.toggle(
        "is-active",
        panel.dataset.galleryPanel === id
      );
    });

    buttons.forEach(button => {
      button.classList.toggle(
        "is-active",
        button.dataset.galleryTarget === id
      );
    });

    currentIndex = ids.indexOf(id);
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      openPanel(button.dataset.galleryTarget);
    });
  });

  prev?.addEventListener("click", () => {
    const index =
      currentIndex <= 0
        ? ids.length - 1
        : currentIndex - 1;

    openPanel(ids[index]);
  });

  next?.addEventListener("click", () => {
    const index =
      currentIndex >= ids.length - 1
        ? 0
        : currentIndex + 1;

    openPanel(ids[index]);
  });
}