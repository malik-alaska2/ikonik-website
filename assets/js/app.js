/* Общая логика: карточки туров, избранное, окно бронирования.
   Страница задаёт window.IK_BASE — путь до корня сайта ('' или '../../'). */

(function () {
  var D = window.IKONIK;
  var I = window.IKI18N;
  var T = I.t;
  I.applyContent(D);
  var icon = window.IKIcon;
  var BASE = window.IK_BASE || '';
  var SAVED_KEY = 'ikonik:saved';

  /* ---------- utils ---------- */
  // plural(n, ключ): формы слова из словаря языка (см. i18n.js)
  function plural(n, key) { return I.plural(n, key); }
  function money(n) {
    return D.config.currency + n.toLocaleString(I.locale());
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function byId(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function region(id) { return byId(D.regions, id); }

  /* ---------- избранное ---------- */
  function getSaved() {
    try { return JSON.parse(localStorage.getItem(SAVED_KEY)) || []; } catch (e) { return []; }
  }
  function setSaved(list) {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch (e) { /* приватный режим */ }
    document.dispatchEvent(new CustomEvent('ik:saved', { detail: list }));
  }
  function toggleSaved(id) {
    var list = getSaved();
    var i = list.indexOf(id);
    if (i === -1) list.push(id); else list.splice(i, 1);
    setSaved(list);
    return i === -1;
  }

  /* ---------- иллюстрации корешка ---------- */
  var STUB_SCENES = {
    tanzania:
      '<svg class="scene" viewBox="0 0 112 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<path d="M6 124 L46 74 C51 68 57 68 62 74 L106 124Z" fill="#EAF4F2" opacity=".5"/>' +
      '<path d="M41 80 L46 74 C51 68 57 68 62 74 L69 82 L61 79 L55 85 L49 79Z" fill="#FFFFFF"/>' +
      '<path d="M0 132 Q30 120 60 128 T112 124 V170 H0Z" fill="#165457" opacity=".55"/>' +
      '<path d="M0 148 Q40 136 112 144 V170H0Z" fill="#0F4244" opacity=".65"/>' +
      '<path d="M74 140 C75 130 72 124 66 118 M75 130 C78 124 82 120 88 116" stroke="#0F3A3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="76" cy="116" rx="22" ry="5" fill="#0F3A3C"/>' +
      '<path d="M24 141 V130 M30 141 V130 M22 131 C22 126 34 125 35 130 Z M33 129 L38 112 L41 113 L36 130" stroke="#0F3A3C" stroke-width="2" fill="#0F3A3C" stroke-linejoin="round"/>' +
      '</svg>',
    arabia:
      '<svg class="scene" viewBox="0 0 112 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<circle cx="66" cy="78" r="17" fill="#FFE2C4" opacity=".8"/>' +
      '<path d="M0 124 C 30 98 62 102 112 126 V170 H0Z" fill="#9C3F1C" opacity=".45"/>' +
      '<path d="M0 142 C 40 120 72 130 112 140 V170H0Z" fill="#7E3114" opacity=".55"/>' +
      '<path d="M52 144 C52 130 50 122 44 114 M52 132 C56 124 61 118 69 112 M46 117 C42 113 38 111 33 111 M63 116 C65 110 69 107 74 105" stroke="#4A1E0C" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '</svg>',
    kenya:
      '<svg class="scene" viewBox="0 0 112 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<circle cx="72" cy="84" r="22" fill="#FFE6B0" opacity=".85"/>' +
      '<path d="M0 138 Q30 122 60 132 T112 126 V170 H0Z" fill="#9A5A22" opacity=".45"/>' +
      '<path d="M0 150 Q40 136 112 146 V170H0Z" fill="#7A4318" opacity=".55"/>' +
      '<path d="M54 136 C55 124 52 116 45 108 M55 124 C58 116 63 110 70 105" stroke="#5A3416" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="56" cy="104" rx="31" ry="7" fill="#5A3416"/><ellipse cx="54" cy="98" rx="20" ry="5" fill="#5A3416"/>' +
      '<path d="M18 70 l4 3 4-3 M30 62 l3 2 3-2" stroke="#5A3416" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      '</svg>',
    turkey:
      '<svg class="scene" viewBox="0 0 112 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<circle cx="70" cy="84" r="18" fill="#FFE1D2" opacity=".7"/>' +
      '<path d="M30 64 a10 11 0 1 1 20 0 c0 6 -6 10 -8 13 h-4 c-2 -3 -8 -7 -8 -13Z" fill="#FBF1E6" opacity=".92"/>' +
      '<rect x="38" y="80" width="4" height="4" rx="1" fill="#6E1B1E"/>' +
      '<path d="M78 48 a6 7 0 1 1 12 0 c0 4 -4 6 -5 8 h-2 c-1 -2 -5 -4 -5 -8Z" fill="#1F3A66" opacity=".8"/>' +
      '<path d="M0 170 V138 C 8 136 10 118 16 112 C 22 118 22 136 30 138 C 36 128 38 110 44 104 C 50 110 52 130 58 136 C 70 134 76 124 82 120 C 88 126 92 136 112 138 V170Z" fill="#7E1D20" opacity=".5"/>' +
      '<path d="M0 152 Q 50 142 112 150 V170 H0Z" fill="#5E1416" opacity=".55"/>' +
      '</svg>',
    europe:
      '<svg class="scene" viewBox="0 0 112 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<circle cx="76" cy="78" r="16" fill="#F1ECFF" opacity=".6"/>' +
      '<path d="M0 132 L36 86 L52 104 L70 78 L112 128 V170 H0Z" fill="#3F3566" opacity=".45"/>' +
      '<path d="M30 94 L36 86 L42 94 L38 92Z M64 86 L70 78 L77 87 L71 85Z" fill="#FFFFFF" opacity=".9"/>' +
      '<path d="M0 146 Q 50 132 112 144 V170 H0Z" fill="#2E2650" opacity=".55"/>' +
      '<path d="M80 146 C 76 132 78 118 82 108 C 86 118 88 132 84 146Z M92 146 C 89 136 90 126 93 120 C 96 126 97 136 95 146Z" fill="#231C40"/>' +
      '</svg>',
    generic:
      '<svg class="scene" viewBox="0 0 112 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
      '<circle cx="64" cy="86" r="22" fill="#FFF3DA" opacity=".7"/>' +
      '<path d="M0 140 Q40 112 112 134 V170H0Z" fill="#000" opacity=".12"/>' +
      '</svg>'
  };

  /* фото из assets/img/<path>.webp; если файла нет, тег убирает себя и остаётся заглушка под ним */
  function photo(path, cls) {
    return '<img class="' + cls + '" src="' + BASE + 'assets/img/' + path + '.webp" alt="" loading="lazy" decoding="async" onerror="this.remove()">';
  }

  /* ---------- карточка тура ---------- */
  function tourCard(t, opts) {
    opts = opts || {};
    var saved = getSaved().indexOf(t.id) !== -1;
    var r = region(t.region);
    var stats = t.stats.map(function (s) {
      return '<div class="stat">' + icon(s.icon) +
        '<span class="stat__value">' + esc(s.value) + '</span>' +
        '<span class="stat__label">' + esc(s.label) + '</span></div>';
    }).join('');

    var more = opts.showRegion && r && r.url
      ? '<a class="link" href="' + BASE + r.url + '#tours">' + esc(r.name) + '</a>'
      : '';

    return '' +
      '<article class="ticket' + (opts.className ? ' ' + opts.className : '') + '" id="' + (opts.compact ? 'hero-' : 'tour-') + t.id + '" data-theme="' + t.region + '" data-country="' + t.country + '" data-days="' + t.days + '">' +
        '<div class="ticket__main">' +
          '<div class="ticket__head">' +
            '<div class="ticket__title">' +
              '<span class="t-eyebrow">' + esc(t.pass) + '</span>' +
              '<h3 class="t-h2">' + esc(t.title) + '</h3>' +
              '<span class="t-small t-muted">' + esc(t.place) + '</span>' +
            '</div>' +
            '<button class="icon-btn" type="button" data-save="' + t.id + '" aria-pressed="' + saved + '" ' +
              'aria-label="' + esc(T('ticket.save', { t: t.title })) + '">' + icon('bookmark', '', saved) + '</button>' +
          '</div>' +
          (opts.compact ? '' : '<p class="ticket__text">' + esc(t.text) + '</p>') +
          '<div class="ticket__stats">' + stats + '</div>' +
          '<div class="ticket__buy">' +
            '<div class="price"><span class="price__note">' + T('ticket.from') + '</span><span class="price__value">' + money(t.price) + '</span><span class="price__note">' + T('ticket.perPerson') + '</span></div>' +
            '<button class="btn btn--primary btn--sm" type="button" data-book="' + t.id + '">' + T('ticket.book') + '</button>' +
          '</div>' +
          more +
        '</div>' +
        '<div class="ticket__stub" aria-hidden="true">' +
          '<div class="ticket__days"><strong>' + t.days + '</strong>' + plural(t.days, 'days') + '</div>' +
          (STUB_SCENES[t.region] || STUB_SCENES.generic) +
          photo('tours/' + t.id, 'ticket__photo') +
          '<div class="ticket__barcode"></div>' +
        '</div>' +
      '</article>';
  }

  /* ---------- окно бронирования ---------- */
  var modal, lastFocus;

  function tourOptions() {
    var html = '';
    D.regions.forEach(function (r) {
      var tours = D.tours.filter(function (t) { return t.region === r.id; });
      html += '<optgroup label="' + esc(r.name) + '">';
      tours.forEach(function (t) {
        html += '<option value="' + t.id + '">' + esc(T('opt.tour', { title: t.title, days: t.days + ' ' + plural(t.days, 'days'), price: money(t.price) })) + '</option>';
      });
      html += '<option value="region:' + r.id + '">' + esc(T('opt.pick', { region: r.name })) + '</option>';
      html += '</optgroup>';
    });
    return html;
  }

  function extrasFields() {
    return D.extras.map(function (x) {
      return '<label class="check" data-extra-region="' + x.region + '">' +
        '<input type="checkbox" name="extras" value="' + x.id + '"> ' +
        '<span>' + esc(x.title) + ', ' + money(x.price) + '</span></label>';
    }).join('');
  }

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'book-title');
    modal.innerHTML =
      '<div class="modal__panel">' +
        '<div class="modal__head">' +
          '<div><h2 class="t-h2" id="book-title">' + T('book.title') + '</h2>' +
          '<p class="t-small t-muted">' + T('book.lead') + '</p></div>' +
          '<button class="icon-btn" type="button" data-close aria-label="' + T('book.close') + '">' + icon('x') + '</button>' +
        '</div>' +
        '<form class="form" novalidate>' +
          '<label class="field"><span class="field__label">' + T('f.tour') + '</span><select name="tour">' + tourOptions() + '</select></label>' +
          '<div class="form__row form__row--3">' +
            '<label class="field"><span class="field__label">' + T('f.date') + ' <span>' + T('f.approx') + '</span></span><input type="date" name="date"></label>' +
            '<label class="field"><span class="field__label">' + T('f.adults') + '</span><input type="number" name="adults" min="1" max="20" value="2" inputmode="numeric"></label>' +
            '<label class="field"><span class="field__label">' + T('f.kids') + '</span><input type="number" name="kids" min="0" max="20" value="0" inputmode="numeric"></label>' +
          '</div>' +
          '<div class="field" data-extras hidden><span class="field__label">' + T('f.extras') + '</span><div class="form" style="gap:10px">' + extrasFields() + '</div></div>' +
          '<div class="form__row">' +
            '<label class="field"><span class="field__label">' + T('f.name') + '</span><input type="text" name="name" autocomplete="name" required>' +
              '<span class="field__error">' + T('f.nameErr') + '</span></label>' +
            '<label class="field"><span class="field__label">' + T('f.phone') + '</span><input type="tel" name="phone" autocomplete="tel" required placeholder="' + T('f.phonePh') + '">' +
              '<span class="field__error">' + T('f.phoneErr') + '</span></label>' +
          '</div>' +
          '<label class="field"><span class="field__label">' + T('f.email') + ' <span>' + T('f.optional') + '</span></span><input type="email" name="email" autocomplete="email"></label>' +
          '<label class="field"><span class="field__label">' + T('f.comment') + ' <span>' + T('f.optional') + '</span></span><textarea name="comment" placeholder="' + esc(T('f.commentPh')) + '"></textarea></label>' +
          '<div class="field"><label class="check"><input type="checkbox" name="consent" required> <span>' + T('f.consent') + '</span></label>' +
            '<span class="field__error">' + T('f.consentErr') + '</span></div>' +
          '<button class="btn btn--primary btn--block" type="submit">' + T('f.submit') + '</button>' +
        '</form>' +
        '<div class="done" hidden>' +
          '<div class="done__mark">' + icon('check') + '</div>' +
          '<h2 class="t-h2">' + T('done.title') + '</h2>' +
          '<p class="t-small t-muted" data-done-text></p>' +
          '<button class="btn btn--ghost" type="button" data-close>' + T('book.close') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var form = modal.querySelector('form');
    var select = form.elements.tour;

    function syncExtras() {
      var val = select.value;
      var reg = val.indexOf('region:') === 0 ? val.slice(7) : (byId(D.tours, val) || {}).region;
      var any = false;
      modal.querySelectorAll('[data-extra-region]').forEach(function (el) {
        var on = el.getAttribute('data-extra-region') === reg;
        el.hidden = !on;
        if (on) any = true;
      });
      modal.querySelector('[data-extras]').hidden = !any;
      modal.querySelector('.modal__panel').setAttribute('data-theme', reg || 'brand');
    }
    select.addEventListener('change', syncExtras);
    modal._sync = syncExtras;

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-close]')) closeBooking();
    });
    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field');
      if (f) f.classList.remove('is-invalid');
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit(form);
    });
  }

  function validate(form) {
    var ok = true;
    function bad(input, cond) {
      var f = input.closest('.field');
      f.classList.toggle('is-invalid', cond);
      if (cond && ok) { input.focus(); ok = false; }
    }
    bad(form.elements.name, form.elements.name.value.trim().length < 2);
    bad(form.elements.phone, form.elements.phone.value.replace(/\D/g, '').length < 7);
    bad(form.elements.consent, !form.elements.consent.checked);
    return ok;
  }

  function submit(form) {
    if (!validate(form)) return;
    var el = form.elements;
    var val = el.tour.value;
    var tour = byId(D.tours, val);
    var what = tour ? tour.title : T('req.pick', { region: region(val.slice(7)).name });
    var extras = Array.prototype.filter.call(form.querySelectorAll('[name="extras"]'), function (c) {
      return c.checked && !c.closest('[hidden]');
    }).map(function (c) { return byId(D.extras, c.value).title; });

    var request = {
      tour: what,
      date: el.date.value || T('req.noDate'),
      adults: el.adults.value,
      kids: el.kids.value,
      extras: extras,
      name: el.name.value.trim(),
      phone: el.phone.value.trim(),
      email: el.email.value.trim(),
      comment: el.comment.value.trim()
    };

    // TODO: подключить отправку на сервер / в CRM / в Telegram-бот.
    console.info('[İkonik] Заявка', request);

    if (D.config.whatsapp) {
      var msg = T('wa.request') + ': ' + request.tour + '\n' + T('wa.date') + ': ' + request.date +
        '\n' + T('wa.adults') + ': ' + request.adults + ', ' + T('wa.kids') + ': ' + request.kids +
        (extras.length ? '\n' + T('wa.extras') + ': ' + extras.join(', ') : '') +
        '\n' + T('wa.name') + ': ' + request.name + '\n' + T('wa.phone') + ': ' + request.phone +
        (request.comment ? '\n' + request.comment : '');
      window.open('https://wa.me/' + D.config.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    }

    form.hidden = true;
    var done = modal.querySelector('.done');
    done.hidden = false;
    done.querySelector('[data-done-text]').textContent =
      T('done.text', { name: request.name, phone: request.phone, tour: request.tour });
    done.querySelector('[data-close]').focus();
  }

  function openBooking(value) {
    if (!modal) buildModal();
    var form = modal.querySelector('form');
    form.hidden = false;
    modal.querySelector('.done').hidden = true;

    var sel = form.elements.tour;
    var extra = value && value.indexOf('extra:') === 0 ? byId(D.extras, value.slice(6)) : null;
    if (extra) value = (D.tours.filter(function (t) { return t.region === extra.region; })[0] || {}).id;
    if (value && sel.querySelector('option[value="' + value + '"]')) sel.value = value;
    modal._sync();
    form.querySelectorAll('[name="extras"]').forEach(function (c) { c.checked = !!extra && c.value === extra.id; });

    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { form.elements.name.focus(); }, 60);
  }

  function closeBooking() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- делегирование ---------- */
  document.addEventListener('click', function (e) {
    var book = e.target.closest('[data-book]');
    if (book) { e.preventDefault(); openBooking(book.getAttribute('data-book')); return; }

    var save = e.target.closest('[data-save]');
    if (save) {
      var on = toggleSaved(save.getAttribute('data-save'));
      document.querySelectorAll('[data-save="' + save.getAttribute('data-save') + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', on);
        b.innerHTML = icon('bookmark', '', on);
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeBooking();
  });

  I.apply(document);

  /* ---------- шапка: если меню не помещается, прячем наименее важные пункты ----------
     порядок: data-nav-prio (1 прячем первым), без него — с конца; на этих языках длина пунктов разная */
  var headInner = document.querySelector('.header__inner');
  var headNav = headInner && headInner.querySelector('.nav');
  if (headNav) {
    var navLinks = [].slice.call(headNav.querySelectorAll('.nav__link'));
    var tuckOrder = navLinks.map(function (a, i) { return { a: a, p: +(a.getAttribute('data-nav-prio') || 100 - i) }; })
      .sort(function (x, y) { return x.p - y.p; });
    var headOverflows = function () {
      var limit = headInner.getBoundingClientRect().right - parseFloat(getComputedStyle(headInner).paddingRight) + 0.5;
      return [].some.call(headInner.children, function (el) {
        return el.offsetWidth && el.getBoundingClientRect().right > limit;
      });
    };
    var fitNav = function () {
      navLinks.forEach(function (a) { a.classList.remove('is-tucked'); });
      if (getComputedStyle(headNav).display === 'none') return;
      for (var k = 0; k < tuckOrder.length - 1 && headOverflows(); k++) tuckOrder[k].a.classList.add('is-tucked');
    };
    var fitQueued = false;
    window.addEventListener('resize', function () {
      if (fitQueued) return;
      fitQueued = true;
      requestAnimationFrame(function () { fitQueued = false; fitNav(); });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNav);
    fitNav();
  }

  /* ---------- реквизиты компании в подвале ---------- */
  var co = D.config.company;
  document.querySelectorAll('[data-company]').forEach(function (box) {
    box.innerHTML =
      '<b class="footer__name">' + esc(co.name) + '</b>' +
      '<a class="footer__line" href="' + co.maps + '" target="_blank" rel="noopener">' + icon('map-pin', 'i--sm') +
        '<span>' + esc(co.street) + '<br>' + esc(co.building) + '<br>' + esc(co.city) + '</span></a>' +
      '<a class="footer__line" href="tel:' + D.config.phone.replace(/[^\d+]/g, '') + '">' + icon('phone', 'i--sm') + '<span>' + esc(D.config.phone) + '</span></a>' +
      (D.config.whatsapp ? '<a class="footer__line" href="https://wa.me/' + D.config.whatsapp + '" target="_blank" rel="noopener">' + icon('whatsapp-logo', 'i--sm') + '<span>WhatsApp</span></a>' : '') +
      '<a class="footer__line" href="mailto:' + D.config.email + '">' + icon('mail', 'i--sm') + '<span>' + esc(D.config.email) + '</span></a>';
  });
  document.querySelectorAll('[data-copyright]').forEach(function (el) {
    el.textContent = '© ' + new Date().getFullYear() + ' ' + co.name;
    // погода MET Norway идёт по лицензии CC BY 4.0: указываем источник там, где она показана
    if (window.IKLiveWeather) {
      el.insertAdjacentHTML('beforeend', ' · <a class="footer__credit" href="https://www.met.no/en" target="_blank" rel="noopener">' +
        esc(I.t('wx.credit')) + '</a> (<a class="footer__credit" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>)');
    }
  });

  window.IK = {
    tourCard: tourCard,
    stubScene: function (id) { return STUB_SCENES[id] || STUB_SCENES.generic; },
    photo: photo,
    region: region,
    openBooking: openBooking,
    getSaved: getSaved,
    money: money,
    plural: plural,
    esc: esc
  };
})();
