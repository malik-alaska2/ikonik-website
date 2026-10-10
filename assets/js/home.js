/* Главная: выбор региона.
   Наведение или нажатие на регион перекрашивает страницу в его тему и показывает его диораму;
   повторное нажатие (или кнопка) открывает страницу региона. */

(function () {
  var D = window.IKONIK;
  var IK = window.IK;
  var icon = window.IKIcon;
  var esc = IK.esc;
  var T = window.IKI18N.t;

  var SWATCH = { kenya: 'paw', tanzania: 'mountains', arabia: 'sun-horizon', turkey: 'balloon', europe: 'castle-turret' };
  var root = document.documentElement;
  var picker = document.querySelector('[data-picker]');
  var arts = document.querySelector('[data-arts]');
  var go = document.querySelector('[data-go]');
  var goNote = document.querySelector('[data-go-note]');
  var climate = document.querySelector('[data-stage-climate]');
  var price = document.querySelector('[data-stage-price]');
  var current = null;

  function toursOf(id) { return D.tours.filter(function (t) { return t.region === id; }); }

  /* ---------- список регионов ---------- */
  picker.innerHTML = D.regions.map(function (r) {
    var live = r.status === 'live';
    var list = toursOf(r.id);
    var from = list.length ? Math.min.apply(null, list.map(function (t) { return t.price; })) : 0;
    return '<li data-theme="' + r.id + '">' +
      '<button class="pick" type="button" ' + (live ? 'data-region="' + r.id + '" aria-pressed="false"' : 'data-book="region:' + r.id + '"') + '>' +
        (r.art ? '<img class="pick__img" src="' + r.art + '" alt="" loading="lazy" decoding="async">' : '') +
        '<span class="pick__swatch">' + icon(SWATCH[r.id] || 'globe') + '</span>' +
        '<span><span class="pick__name">' + esc(r.name) + '</span><span class="pick__countries">' + esc(r.countries) + '</span></span>' +
        (live ? '<span class="pick__meta">' + T('ticket.from') + ' ' + IK.money(from) + '</span>' : '<span class="pick__soon">' + T('home.soon') + '</span>') +
      '</button></li>';
  }).join('');

  arts.innerHTML = D.regions.filter(function (r) { return r.art; }).map(function (r, i) {
    return '<img class="hero__art' + (r.artFit ? ' hero__art--' + r.artFit : '') + (i === 0 ? ' is-on' : '') + '" data-art="' + r.id + '" src="' + r.art + '" alt="' +
      esc(r.page.artAlt) + '"' + (i === 0 ? '' : ' loading="lazy"') + '>';
  }).join('');

  function renderChips(r) {
    var C = r.page.climate;
    climate.innerHTML = window.IKWeather(C.icon || 'sun') + '<div><b>' + C.now + '</b><span>' + esc(r.page.tip.when) + '</span></div>';
    // настоящая погода выбранного региона (если сеть доступна)
    if (window.IKLiveWeather) {
      window.IKLiveWeather(r.id).then(function (w) {
        if (!w || (current || D.regions[0].id) !== r.id) return;
        climate.innerHTML = window.IKWeather(w.type) + '<div><b>' + w.temp + '</b><span title="' + esc(w.condition) + '">' + esc(w.place) + '</span></div>';
      });
    }
    var list = toursOf(r.id);
    var from = Math.min.apply(null, list.map(function (t) { return t.price; }));
    var minD = Math.min.apply(null, list.map(function (t) { return t.days; }));
    var maxD = Math.max.apply(null, list.map(function (t) { return t.days; }));
    price.innerHTML = '<span>' + T('home.toursFrom') + '</span><b>' + IK.money(from) + '</b><span>' + list.length + ' ' +
      IK.plural(list.length, 'home.toursCount') + ', ' + T('home.daysRange', { min: minD, max: maxD }) + '</span>';
  }

  function select(id) {
    if (id === current) return;
    current = id;
    var r = IK.region(id);
    root.setAttribute('data-theme', id);
    picker.querySelectorAll('[data-region]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-region') === id);
    });
    arts.querySelectorAll('[data-art]').forEach(function (img) {
      img.classList.toggle('is-on', img.getAttribute('data-art') === id);
    });
    renderChips(r);
    go.href = r.url;
    go.textContent = T('home.go');
    go.setAttribute('aria-label', T('home.go') + ': ' + r.name);
    goNote.textContent = r.text;
  }

  picker.addEventListener('click', function (e) {
    var b = e.target.closest('[data-region]');
    if (!b) return;
    var id = b.getAttribute('data-region');
    // на телефоне карточка сразу открывает регион, на компьютере первый клик показывает превью
    if (id === current || window.matchMedia('(max-width: 720px)').matches) { location.href = IK.region(id).url; return; }
    select(id);
  });

  // превью при наведении мышью; после этого клик сразу открывает регион
  picker.addEventListener('pointerover', function (e) {
    if (e.pointerType !== 'mouse') return;
    var b = e.target.closest('[data-region]');
    if (b) select(b.getAttribute('data-region'));
  });

  // стартовое состояние: цвета İkonik, превью первого региона
  var first = D.regions[0];
  renderChips(first);
  go.href = '#tours';
  goNote.textContent = T('home.goNote');

  /* ---------- популярные туры ---------- */
  document.querySelector('[data-featured]').innerHTML = D.tours.filter(function (t) { return t.featured; })
    .slice(0, 4).map(function (t) { return IK.tourCard(t, { showRegion: true }); }).join('');

  /* ---------- контакты ---------- */
  var phone = document.querySelector('[data-phone]');
  phone.href = 'tel:' + D.config.phone.replace(/[^\d+]/g, '');
  phone.querySelector('span').textContent = D.config.phone;
  var email = document.querySelector('[data-email]');
  email.href = 'mailto:' + D.config.email;
  email.querySelector('span').textContent = D.config.email;

  window.IKIconHydrate();
})();
