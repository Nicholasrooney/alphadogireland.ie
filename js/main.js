/* Alpha Dog Ireland — site interactions */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* ---- Current year in footer ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Hero video: if it fails to load, fall back to poster image only ---- */
  var heroVid = document.querySelector('.hero__media video');
  if (heroVid) {
    heroVid.addEventListener('error', function () { heroVid.style.display = 'none'; });
    // Some mobile browsers block autoplay until a gesture; try to nudge it.
    var p = heroVid.play();
    if (p && typeof p.catch === 'function') { p.catch(function () {}); }
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Gallery lightbox ---- */
  var gallery = document.querySelector('.gallery');
  var lb = document.querySelector('.lightbox');
  if (gallery && lb) {
    var lbImg = lb.querySelector('img');
    var figs = Array.prototype.slice.call(gallery.querySelectorAll('img'));
    var idx = 0;

    function show(i) {
      idx = (i + figs.length) % figs.length;
      var src = figs[idx].getAttribute('data-full') || figs[idx].src;
      lbImg.src = src;
      lbImg.alt = figs[idx].alt;
    }
    function open(i) { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.src = ''; }

    figs.forEach(function (img, i) {
      img.addEventListener('click', function () { open(i); });
    });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__nav.prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox__nav.next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
})();
