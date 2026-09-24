(function () {
  var LOW_LINK = "https://buy.stripe.com/5kQ9AS35Rew5dFT12O1wY02";
  var p;
  try {
    p = localStorage.getItem("yw_price");
    if (p !== "990" && p !== "490") {
      p = Math.random() < 0.5 ? "490" : "990";
      localStorage.setItem("yw_price", p);
    }
  } catch (e) {
    p = Math.random() < 0.5 ? "490" : "990";
  }
  window.YW_PRICE = p;
  if (p !== "490") return;
  var now = document.querySelector(".price-row .now");
  if (now) now.textContent = now.textContent.replace("$9.90", "$4.90");
  var cta = document.getElementById("ctaBtn");
  if (cta) {
    cta.textContent = cta.textContent.replace("$9.90", "$4.90");
    cta.href = LOW_LINK;
  }
})();
