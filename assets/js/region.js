/* Страница региона: собирает контент из data.js по <html data-theme="...">.
   Один скрипт на все регионы; внешний вид задаёт тема и диорама региона. */

(function () {
  var D = window.IKONIK;
  var IK = window.IK;
  var icon = window.IKIcon;
  var esc = IK.esc;
  var T = window.IKI18N.t;

  var REGION = document.documentElement.getAttribute('data-theme');
  var R = IK.region(REGION);
  var P = R.page;
  var tours = D.tours.filter(function (t) { return t.region === REGION; });
  var extras = D.extras.filter(function (x) { return x.region === REGION; });

  function $(sel) { return document.querySelector(sel); }
  function set(sel, html) { var el = $(sel); if (el) el.innerHTML = html; }
  function text(sel, s) { var el = $(sel); if (el) el.textContent = s; }

  function thumb(x) {
    return '<span class="thumb"' + (x.tone ? ' data-tone="' + x.tone + '"' : '') + '>' + icon(x.icon) + IK.photo('extras/' + x.id, 'thumb__photo') + '</span>';
  }

  /* ---------- hero ---------- */
  // вместо эмодзи: значок региона в его цвете, как на логотипе
  var BADGE = { kenya: 'paw', tanzania: 'mountains', arabia: 'sun-horizon', turkey: 'balloon', europe: 'castle-turret' };
  set('[data-hello]', esc(P.hello) + ' <span class="hello-badge" aria-hidden="true">' + icon(BADGE[REGION] || 'globe') + '</span>');
  text('[data-lead]', P.lead);

  var featured = tours.filter(function (t) { return t.id === P.featured; })[0] || tours[0];
  set('[data-hero-ticket]', IK.tourCard(featured, { compact: true }));

  var C = P.climate;
  $('[data-climate]').setAttribute('aria-label', C.aria);
  set('[data-climate-icon]', window.IKWeather(C.icon || 'sun', 'wx--lg'));
  text('[data-climate-now]', C.now);
  text('[data-climate-label]', C.label);
  set('[data-climate-months]', C.months.map(function (m, i) {
    return '<li><span>' + m[0] + '</span>' + window.IKWeather(m[1], '', i + 1) + '<b>' + m[2] + '</b></li>';
  }).join(''));
  $('[data-climate-months]').setAttribute('aria-label', C.aria);

  // настоящая погода: текущая температура и прогноз на 5 дней (если сеть доступна)
  if (window.IKLiveWeather) {
    window.IKLiveWeather(REGION).then(function (w) {
      if (!w) return;
      set('[data-climate-icon]', window.IKWeather(w.type, 'wx--lg'));
      text('[data-climate-now]', w.temp);
      text('[data-climate-label]', w.place);
      $('[data-climate-label]').title = w.condition;
      set('[data-climate-months]', w.days.map(function (d, i) {
        return '<li><span>' + esc(d.label) + '</span>' + window.IKWeather(d.type, '', i + 1) + '<b>' + d.max + '</b></li>';
      }).join(''));
      $('[data-climate-months]').setAttribute('aria-label', T('wx.forecast'));
      $('[data-climate]').setAttribute('aria-label', w.place + ', ' + w.temp + ', ' + w.condition);
      $('[data-climate]').classList.add('is-live');
    });
  }

  text('[data-tip-when]', P.tip.when);
  text('[data-tip-text]', P.tip.text);
  set('[data-tip-art]', IK.stubScene(REGION) + IK.photo('tips/' + REGION, 'tip__photo'));

  set('[data-top-extras]', extras.slice(0, 3).map(function (x) {
    return '<li class="row">' + thumb(x) +
      '<div><p class="row__title">' + esc(x.title) + '</p><p class="row__meta">' + esc(x.time) + ', ' + IK.money(x.price) + '</p></div>' +
      '<button class="icon-btn" type="button" data-book="extra:' + x.id + '" aria-label="' + esc(T('extra.addAria', { x: x.title })) + '">' + icon('plus') + '</button>' +
      '</li>';
  }).join(''));

  /* ---------- карта ---------- */
  var M = P.map;
  text('[data-map-title]', M.title);
  var map = $('[data-map]');
  map.innerHTML =
    (M.img ? '<img class="mapcard__img" src="' + (window.IK_BASE || '') + M.img + '" alt="" width="1280" height="880" loading="lazy" decoding="async">' : '') +
    '<svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      (M.img ? '' : '<g fill="none" stroke="#fff" stroke-opacity=".45">' +
        '<path d="M-10 40 C 60 20 120 50 180 30 S 280 10 330 30"/><path d="M-10 196 C 50 176 110 206 170 191 S 270 166 330 186"/>' +
        '<path d="M-10 120 C 40 100 90 130 150 112 S 250 92 330 110"/>' +
      '</g>') +
      M.svg +
      '<g stroke="#fff" stroke-width="2.5" stroke-dasharray="5 6" stroke-linecap="round" fill="none">' +
        M.routes.map(function (d) { return '<path d="' + d + '"/>'; }).join('') +
      '</g>' +
    '</svg>' +
    M.pins.map(function (p) {
      return '<button class="pin' + (p.home ? ' pin--home' : '') + '" type="button" style="left:' + p.x + '%;top:' + p.y + '%"' +
        (p.tour ? ' data-goto="' + p.tour + '"' : '') + ' aria-label="' + esc(p.tour ? T('pin.aria', { name: p.name }) : p.name) + '">' +
        icon(p.home ? 'plane' : p.icon) + '<span class="pin__label">' + esc(p.name) + '</span></button>';
    }).join('');

  /* ---------- туры и фильтры ---------- */
  text('[data-tours-title]', P.toursTitle);
  text('[data-tours-lead]', P.toursLead);

  var grid = $('[data-tours]');
  var filters = $('[data-filters]');
  var current = 'all';
  var RULES = { all: function () { return true; }, saved: function (t) { return IK.getSaved().indexOf(t.id) !== -1; } };

  P.filters.forEach(function (f, i) {
    RULES['f' + i] = function (t) {
      if (f.max && t.days > f.max) return false;
      if (f.min && t.days < f.min) return false;
      if (f.tag && t.tag !== f.tag) return false;
      if (f.country && t.country !== f.country) return false;
      return true;
    };
  });

  filters.innerHTML =
    '<button class="chip" type="button" data-filter="all" aria-pressed="true">' + T('filter.all') + ' <span class="chip__count">' + tours.length + '</span></button>' +
    P.filters.map(function (f, i) {
      return '<button class="chip" type="button" data-filter="f' + i + '" aria-pressed="false">' + esc(f.label) + '</button>';
    }).join('') +
    '<button class="chip" type="button" data-filter="saved" aria-pressed="false">' + icon('heart', 'i--sm') + T('filter.saved') + '</button>';

  function renderTours() {
    var list = tours.filter(RULES[current]);
    if (!list.length) {
      grid.innerHTML = current === 'saved'
        ? '<div class="empty">' + icon('bookmark', 'i--lg') + '<p class="t-h3">' + T('empty.savedTitle') + '</p>' +
          '<p class="t-small">' + T('empty.savedText') + '</p>' +
          '<button class="btn btn--ghost btn--sm" type="button" data-filter-go="all">' + T('empty.showAll') + '</button></div>'
        : '<div class="empty"><p class="t-h3">' + T('empty.none') + '</p><button class="btn btn--ghost btn--sm" type="button" data-filter-go="all">' + T('empty.showAll') + '</button></div>';
      return;
    }
    grid.innerHTML = list.map(function (t) { return IK.tourCard(t); }).join('');
  }

  function setFilter(name) {
    current = name;
    filters.querySelectorAll('[data-filter]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === name);
    });
    renderTours();
  }

  filters.addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter]');
    if (b) setFilter(b.getAttribute('data-filter'));
  });
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter-go]');
    if (b) setFilter(b.getAttribute('data-filter-go'));
  });
  document.querySelectorAll('[data-show-saved]').forEach(function (a) {
    a.addEventListener('click', function () { setFilter('saved'); });
  });

  function syncSaved() {
    var n = IK.getSaved().filter(function (id) { return tours.some(function (t) { return t.id === id; }); }).length;
    var badge = $('[data-saved-count]');
    if (badge) { badge.hidden = !n; badge.textContent = n; }
    if (current === 'saved') renderTours();
  }
  document.addEventListener('ik:saved', syncSaved);
  syncSaved();
  renderTours();

  map.addEventListener('click', function (e) {
    var pin = e.target.closest('[data-goto]');
    if (!pin) return;
    if (current !== 'all') setFilter('all');
    var card = document.getElementById('tour-' + pin.getAttribute('data-goto'));
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.remove('is-flash');
    void card.offsetWidth;
    card.classList.add('is-flash');
  });

  /* ---------- впечатления ---------- */
  set('[data-extras]', extras.map(function (x) {
    return '<li class="extra">' + thumb(x) +
      '<div><h3 class="t-h3">' + esc(x.title) + '</h3><p class="t-small t-muted">' + esc(x.time) + '</p>' +
      '<p class="extra__price">' + IK.money(x.price) + ' ' + T('extra.perPerson') + '</p></div>' +
      '<button class="btn btn--ghost btn--sm" type="button" data-book="extra:' + x.id + '">' + icon('plus', 'i--sm') + T('extra.add') + '</button>' +
      '</li>';
  }).join(''));

  /* ---------- маршрут, сезон, что входит ---------- */
  text('[data-route-title]', P.route.title);
  text('[data-route-lead]', P.route.lead);
  set('[data-route-days]', P.route.days.map(function (d, i) {
    return '<li class="day"><span class="day__num">' + (i + 1) + '</span><div><h3 class="t-h3">' + esc(d[0]) +
      '</h3><p class="t-small t-muted">' + esc(d[1]) + '</p></div></li>';
  }).join(''));

  var MONTHS = T('months');
  set('[data-season-bar]', P.season.months.map(function (s, i) {
    return '<li data-s="' + s + '" title="' + esc(P.season.legend[s]) + '">' + MONTHS[i] + '</li>';
  }).join(''));
  set('[data-season-legend]', ['best', 'good', 'ok', 'low'].map(function (k) {
    return '<li data-s="' + k + '">' + esc(P.season.legend[k]) + '</li>';
  }).join(''));

  set('[data-included]', P.included.items.map(function (s) {
    return '<li>' + icon('check', 'i--sm') + esc(s) + '</li>';
  }).join(''));
  text('[data-included-note]', P.included.note);

  /* ---------- заявка ---------- */
  text('[data-cta-title]', P.cta.title);
  text('[data-cta-text]', P.cta.text);
  document.querySelectorAll('[data-book-region]').forEach(function (b) {
    b.setAttribute('data-book', 'region:' + REGION);
  });
  var phone = $('[data-phone]');
  phone.href = 'tel:' + D.config.phone.replace(/[^\d+]/g, '');
  phone.querySelector('span').textContent = D.config.phone;
  var email = $('[data-email]');
  email.href = 'mailto:' + D.config.email;
  email.querySelector('span').textContent = D.config.email;

  /* ---------- активный пункт rail ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail__item[href^="#"]:not([data-show-saved])'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var s = $(a.getAttribute('href'));
      if (s) io.observe(s);
    });
  }

  window.IKIconHydrate();
})();
