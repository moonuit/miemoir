const clapBtn = document.getElementById("clapBtn");
const msg = document.getElementById("clapMsg");

let clapCount = 0;

clapBtn.addEventListener("click", () => {

  if (typeof umami !== "undefined") {
    umami.track("clap");
  }

  clapCount++;

  msg.textContent = `thanks! ×${clapCount}`;

  clapBtn.classList.add("clicked");

  setTimeout(()=>{
    clapBtn.classList.remove("clicked");
  },300);

});