/* Reusable cookie consent + gated Google Analytics.
   Include ONCE per page (do NOT mark it async), e.g.:
     <script src="cookie-consent.js" data-ga="G-XXXXXXXXXX"></script>
   Google Analytics loads only AFTER the visitor clicks "Accept" (GDPR / ePrivacy).
   The choice is remembered in localStorage; any element with a
   [data-cookie-settings] attribute — or window.openCookieSettings() — re-opens
   the banner so visitors can change or withdraw consent. */
(function () {
  var me = document.currentScript || document.querySelector('script[data-ga]');
  var GA_ID = me && me.getAttribute('data-ga');
  var KEY = 'cookie_consent_v1';
  var loaded = false;
  function loadGA() {
    if (!GA_ID || loaded) return; loaded = true;
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag; gtag('js', new Date()); gtag('config', GA_ID);
  }
  function cGet() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function cSet(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function injectCSS() {
    if (document.getElementById('cc-style')) return;
    var st = document.createElement('style'); st.id = 'cc-style';
    st.textContent = '.cc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:760px;margin:0 auto;background:#fff;color:#1a1a1a;border:1px solid rgba(0,0,0,.14);border-radius:12px;box-shadow:0 14px 44px rgba(0,0,0,.25);padding:16px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:space-between;font-family:inherit;transform:translateY(180%);transition:transform .35s ease}.cc-banner.cc-show{transform:none}.cc-banner p{margin:0;font-size:.85rem;line-height:1.5;flex:1;min-width:220px}.cc-banner a{color:#0a58ca;text-decoration:underline}.cc-btns{display:flex;gap:10px;flex-shrink:0}.cc-btn{padding:10px 20px;font-size:.8rem;border-radius:6px;cursor:pointer;border:1px solid #1a1a1a;background:#fff;color:#1a1a1a;font-family:inherit;font-weight:600}.cc-btn--a{background:#1a1a1a;color:#fff}@media(max-width:520px){.cc-banner{flex-direction:column;align-items:stretch}.cc-btns{width:100%}.cc-btn{flex:1}}';
    document.head.appendChild(st);
  }
  function hide() { var b = document.getElementById('cc-banner'); if (b) { b.classList.remove('cc-show'); setTimeout(function () { b.remove(); }, 320); } }
  function show() {
    if (document.getElementById('cc-banner')) return;
    injectCSS();
    var pl = document.querySelector('a[href*="privacy"]');
    var priv = pl ? ' See our <a href="' + pl.getAttribute('href') + '">Privacy Policy</a>.' : '';
    var b = document.createElement('div'); b.id = 'cc-banner'; b.className = 'cc-banner';
    b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookie consent');
    b.innerHTML = '<p>We use cookies to improve your experience and, with your consent, Google Analytics to measure traffic.' + priv + '</p><div class="cc-btns"><button type="button" class="cc-btn" id="ccDecline">Decline</button><button type="button" class="cc-btn cc-btn--a" id="ccAccept">Accept</button></div>';
    document.body.appendChild(b);
    requestAnimationFrame(function () { b.classList.add('cc-show'); });
    document.getElementById('ccAccept').addEventListener('click', function () { cSet('granted'); loadGA(); hide(); });
    document.getElementById('ccDecline').addEventListener('click', function () { cSet('denied'); hide(); });
  }
  window.openCookieSettings = show;
  function init() { var s = cGet(); if (s === 'granted') loadGA(); else if (s !== 'denied') show(); }
  document.addEventListener('click', function (e) { if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); show(); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
