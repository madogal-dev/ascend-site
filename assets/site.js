// Ascend Intelligences — script commun (langue, menu mobile, formulaire)

(function () {
  'use strict';

  var STORAGE_KEY = 'ascend-lang';

  function setSafeHTML(el, htmlString) {
    var doc = new DOMParser().parseFromString(htmlString, 'text/html');
    var allowed = ['EM', 'SPAN', 'BR', 'STRONG', 'A'];
    var frag = document.createDocumentFragment();
    function walk(node, parent) {
      if (node.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE && allowed.indexOf(node.nodeName) !== -1) {
        var clean = document.createElement(node.nodeName.toLowerCase());
        if (node.nodeName === 'A' && node.getAttribute('href')) {
          var href = node.getAttribute('href');
          if (/^(https?:\/\/|mailto:|\/|#|[a-z0-9-]+\.html)/i.test(href)) clean.setAttribute('href', href);
        }
        node.childNodes.forEach(function (c) { walk(c, clean); });
        parent.appendChild(clean);
      }
    }
    doc.body.childNodes.forEach(function (c) { walk(c, frag); });
    el.textContent = '';
    el.appendChild(frag);
  }

  function readLang() {
    try { var v = localStorage.getItem(STORAGE_KEY); if (v === 'fr' || v === 'en') return v; } catch (e) {}
    return 'en';
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val === null) return;
      if (val.indexOf('<') !== -1) setSafeHTML(el, val); else el.textContent = val;
    });
    document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(function (el) {
      el.placeholder = el.getAttribute('data-placeholder-' + lang);
    });
    document.querySelectorAll('[data-title-' + lang + ']').forEach(function (el) {
      document.title = el.getAttribute('data-title-' + lang);
    });
    document.querySelectorAll('.lang-switch').forEach(function (btn) {
      btn.textContent = lang === 'en' ? 'Français' : 'English';
      btn.setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English');
    });
    window.currentLang = lang;
  }

  window.toggleLang = function () { setLang(window.currentLang === 'fr' ? 'en' : 'fr'); };

  window.toggleMenu = function () {
    var nav = document.getElementById('nav-mobile');
    var btn = document.getElementById('menu-toggle');
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  document.addEventListener('DOMContentLoaded', function () {
    setLang(readLang());

    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var success = document.querySelector('.form-success');
      var error = document.querySelector('.form-error');
      var origText = btn.textContent;
      btn.disabled = true;
      btn.textContent = window.currentLang === 'fr' ? 'Envoi en cours…' : 'Sending…';
      success.classList.remove('show');
      error.classList.remove('show');
      fetch('https://formspree.io/f/mredgzbr', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) { success.classList.add('show'); form.reset(); }
        else { error.classList.add('show'); }
      }).catch(function () {
        error.classList.add('show');
      }).then(function () {
        btn.disabled = false;
        btn.textContent = origText;
      });
    });
  });
})();
