(() => {
  const PASSWORD = "だってともだちだもん";
  const KEY = "sun_auth_01";

  // 鍵をかけないページ（ここは自由に追加）
  const OPEN_PATHS = [
  "/", "/index.html", "/about/", "/links/"
  ];

  const path = location.pathname.replace(/\/(index\.html)?$/, "/");

  // オープン扱いのページは素通り
  if (OPEN_PATHS.includes(path)) return;

  // すでに通過済みならOK
  if (localStorage.getItem(KEY) === "true") return;

  // 未通過なら入力
  const input = prompt("合言葉を入力してください");
  if (input === PASSWORD) {
    localStorage.setItem(KEY, "true");
    return;
  }

  // 失敗したら玄関へ戻す
  location.href = "/";
})();
