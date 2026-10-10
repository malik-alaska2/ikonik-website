/* Анимированный логотип İkonik из слоёв assets/img/logo/anim (нарезаны из ikonik-logo.png).
   <span data-logo-anim></span>       знак + надпись (шапка)
   <span data-logo-anim="mark"></span> только знак (боковая панель региона)
   Первый показ за сессию: полная сборка, дальше короткий взлёт шара.
   Значок региона берёт цвет и символ из <html data-theme>; на главной обновляется при выборе региона. */

(function () {
  var BASE = window.IK_BASE || '';
  var DIR = BASE + 'assets/img/logo/anim/';
  var SEEN = 'ik:logo-intro';

  // позиции слоёв в % от блока знака или надписи: [left, top, width]
  var MARK = {
    crescent: [0, 0, 50.65], land: [21.5, 39.41, 78.5], waves: [23.38, 76.41, 72.86],
    balloon: [35.25, 6.5, 28.91], birds: [59.46, 34.75, 17.74]
  };
  var WORD = {
    l1: [0.66, 0, 7.66], l2: [10.41, 14.42, 18.35], l3: [27.63, 13.46, 17.41],
    l4: [46.26, 14.42, 16.84], l5: [63.95, 0, 7.66], l6: [73.32, 14.42, 26.77],
    tag: [-0.09, 78.53, 90.82]
  };
  var REGION_ICON = { kenya: 'paw', tanzania: 'mountains', arabia: 'sun-horizon', turkey: 'balloon', europe: 'castle-turret' };

  function layers(map) {
    return Object.keys(map).map(function (k, i) {
      var p = map[k];
      return '<img class="lg__p lg__p--' + k + '" src="' + DIR + k + '.webp" alt="" draggable="false" ' +
        'style="left:' + p[0] + '%;top:' + p[1] + '%;width:' + p[2] + '%;--i:' + i + '">';
    }).join('');
  }

  var seen = false;
  try { seen = sessionStorage.getItem(SEEN) === '1'; sessionStorage.setItem(SEEN, '1'); } catch (e) { /* приватный режим */ }

  var logos = [];
  document.querySelectorAll('[data-logo-anim]').forEach(function (el) {
    var markOnly = el.getAttribute('data-logo-anim') === 'mark';
    el.className = 'lg' + (markOnly ? ' lg--mark' : '') + (seen ? ' is-quick' : ' is-intro');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<span class="lg__mark">' + layers(MARK) + '<span class="lg__badge"></span></span>' +
      (markOnly ? '' : '<span class="lg__word">' + layers(WORD) +
        '<span class="lg__shine" style="left:' + WORD.tag[0] + '%;top:' + WORD.tag[1] + '%;width:' + WORD.tag[2] + '%;' +
        '-webkit-mask-image:url(' + DIR + 'tag.webp);mask-image:url(' + DIR + 'tag.webp)"></span></span>');
    logos.push(el);
    setTimeout(function () { el.classList.remove('is-intro', 'is-quick'); }, seen ? 1000 : 2600);
  });
  if (!logos.length) return;

  var current = null;
  function syncRegion() {
    var theme = document.documentElement.getAttribute('data-theme');
    var icon = REGION_ICON[theme];
    if (theme === current) return;
    var first = current === null;
    current = theme;
    logos.forEach(function (el) {
      var badge = el.querySelector('.lg__badge');
      if (icon) {
        badge.innerHTML = window.IKIcon(icon);
        el.setAttribute('data-region', theme);
      } else {
        el.removeAttribute('data-region');
      }
      if (!first) {
        // шар «перелетает» в новый регион
        el.classList.remove('is-travel');
        void el.offsetWidth;
        el.classList.add('is-travel');
      }
    });
  }
  syncRegion();
  new MutationObserver(syncRegion).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
