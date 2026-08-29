(() => {
  const nameInput = document.getElementById("nameInput");
  if (!nameInput) return; // novelsページ専用

  const saveBtn = document.getElementById("saveBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const notice = document.getElementById("saveNotice");
  const summary = document.getElementById("nameSummary");

  let currentNovelId = localStorage.getItem("current_novel") || "";
  const storageKey = (novelId) => `yume_name_${novelId}`;

  function getSavedName() {
    if (!currentNovelId) return "";
    const saved = localStorage.getItem(storageKey(currentNovelId));
    return (saved && saved.trim()) ? saved.trim() : "";
  }

  function loadName() {
    nameInput.value = getSavedName();
  }

  function updateButtons() {
    const hasText = nameInput.value.trim().length > 0;
    saveBtn.disabled = !hasText;
    deleteBtn.disabled = !hasText;
  }

  function updateSummary() {
    if (!summary) return;

    const saved = getSavedName();

    if (saved) {
      summary.childNodes[0].nodeValue = `name : ${saved} `;
    } else {
      summary.childNodes[0].nodeValue = "name ";
    }
  }

  function showNotice(message = "saved!") {
    if (!notice) return;

    notice.textContent = message;
    notice.classList.add("show");

    clearTimeout(showNotice.timer);
    showNotice.timer = setTimeout(() => {
      notice.classList.remove("show");
      notice.innerHTML = "&nbsp;";
    }, 2000);
  }

  loadName();
  updateButtons();
  updateSummary();

  nameInput.addEventListener("input", updateButtons);

  saveBtn.addEventListener("click", () => {
    const value = nameInput.value.trim();
    if (!value || !currentNovelId) return;

    localStorage.setItem(storageKey(currentNovelId), value);
    updateButtons();
    updateSummary();
    showNotice("saved!");
  });

  deleteBtn.addEventListener("click", () => {
    if (!currentNovelId) return;

    localStorage.removeItem(storageKey(currentNovelId));
    nameInput.value = "";
    updateButtons();
    updateSummary();
    showNotice("deleted");
  });

  document.querySelectorAll("a[data-novel]").forEach(link => {
    link.addEventListener("click", () => {
      const novelId = link.dataset.novel;
      if (!novelId) return;

      currentNovelId = novelId;
      localStorage.setItem("current_novel", novelId);

      const value = nameInput.value.trim();
      if (value) {
        localStorage.setItem(storageKey(novelId), value);
      } else {
        localStorage.removeItem(storageKey(novelId));
      }
    });
  });
})();