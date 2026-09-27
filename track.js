(function () {
  var V = window.YW_VARIANT;
  if (V !== "a" && V !== "b") {
    var m = null;
    try {
      m = new URLSearchParams(location.search).get("m");
      if (m && /^[1-4]$/.test(m)) sessionStorage.setItem("yw_m", m);
      else m = sessionStorage.getItem("yw_m");
    } catch (e) {}
    if (!m || !/^[1-4]$/.test(m)) return;
    V = "m" + m;
  }
  var URL = "https://ig-bot-yinwell.onrender.com/t";
  var sid;
  try {
    sid = localStorage.getItem("yw_sid");
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("yw_sid", sid);
    }
  } catch (e) {
    sid = "x" + Math.random().toString(36).slice(2);
  }

  var G = null;
  if (V.charAt(0) === "m") {
    try {
      G = localStorage.getItem("yw_layout");
      if (G !== "intro" && G !== "direct") {
        G = Math.random() < 0.5 ? "intro" : "direct";
        localStorage.setItem("yw_layout", G);
      }
    } catch (e) {
      G = Math.random() < 0.5 ? "intro" : "direct";
    }
  }

  function send(evt) {
    var data = { v: V, e: evt, s: sid };
    if (G) data.g = G;
    var body = JSON.stringify(data);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(URL, new Blob([body], { type: "text/plain" }))) return;
      fetch(URL, { method: "POST", mode: "no-cors", keepalive: true, body: body });
    } catch (e) {}
  }

  send("landed");

  var startBtn = document.getElementById("startBtn");
  if (G === "direct" && startBtn) {
    startBtn.click();
  }

  var answered = false, started = false;
  document.addEventListener("click", function (ev) {
    var el = ev.target && ev.target.closest && ev.target.closest(".opt, #ctaBtn, #startBtn");
    if (!el || !ev.isTrusted) return;
    if (el.id === "ctaBtn") send("cta");
    else if (el.id === "startBtn") { if (!started) { started = true; send("started"); } }
    else if (!answered) { answered = true; send("answered"); }
  }, true);
})();
