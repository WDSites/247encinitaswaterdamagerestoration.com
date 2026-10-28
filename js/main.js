(function () {
  "use strict";
  var BREAKPOINT = "(max-width: 900px)";
  var root = document.documentElement;
  root.classList.remove("no-js");

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  var mq = window.matchMedia(BREAKPOINT);

  function setMenu(open) {
    if (!toggle || !nav) { return; }
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    root.style.overflow = open && mq.matches ? "hidden" : "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setMenu(false); }
    });
    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A" && mq.matches) { setMenu(false); }
    });
    var onChange = function () { if (!mq.matches) { setMenu(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else { mq.addListener(onChange); }
  }

  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) { return; }
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".faq-q[aria-expanded='true']"), function (btn) {
      var panel = btn.parentNode.querySelector(".faq-a");
      if (panel) { panel.style.maxHeight = panel.scrollHeight + "px"; }
    });
  });
})();
