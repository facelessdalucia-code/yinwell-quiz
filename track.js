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
  function send(evt) {
    var body = JSON.stringify({ v: V, e: evt, s: sid });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(URL, new Blob([body], { type: "text/plain" }))) return;
      fetch(URL, { method: "POST", mode: "no-cors", keepalive: true, body: body });
    } catch (e) {}
  }
  send("landed");
  var answered = false;
  document.addEventListener("click", function (ev) {
    var el = ev.target && ev.target.closest && ev.target.closest(".opt, #ctaBtn");
    if (!el) return;
    if (el.id === "ctaBtn") send("cta");
    else if (!answered) { answered = true; send("answered"); }
  }, true);
})();
