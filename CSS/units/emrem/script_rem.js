; (function (global) {
  var documentElement = document.documentElement;
  function callback() {
    var clientWidth = documentElement.clientWidth;

    clientWidth = clientWidth < 780 ? clientWidth : 780;
    documentElement.style.fontSize = clientWidth / 10 + "px";
  }
  document.addEventListener("DOMContentLoaded", callback, false);
  global.addEventListener("resize", callback, false);
})(window);
