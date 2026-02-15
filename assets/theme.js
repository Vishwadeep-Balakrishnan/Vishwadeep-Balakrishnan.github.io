(function () {
  var STORAGE_KEY = "theme";

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var label = document.querySelector("[data-theme-label]");
    if (label) label.textContent = theme === "dark" ? "Dark" : "Light";
  }

  function initTheme() {
    var saved = getSavedTheme();
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    setTheme(systemPrefersDark() ? "dark" : "light");
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    setTheme(next);
    saveTheme(next);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();

    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
    }
  });
})();
