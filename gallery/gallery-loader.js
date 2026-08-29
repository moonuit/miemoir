const container = document.getElementById("galleryContent");

const buttons = document.querySelectorAll("[data-page]");


async function loadGallery(name) {

  const response =
    await fetch(`/gallery/parts/${name}.html`);


  if (!response.ok) {

    container.innerHTML =
      "<p>読み込みに失敗しました。</p>";

    return;

  }


  const html =
    await response.text();


  container.innerHTML =
    html;


  /* 読み込んだあとにナビを初期化 */
  initGallery(container);
}



buttons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      buttons.forEach(btn =>
        btn.classList.remove("is-active")
      );


      button.classList.add("is-active");


      loadGallery(
        button.dataset.page
      );

    }
  );

});


/* 最初は原作キャラ */
loadGallery("fanart");