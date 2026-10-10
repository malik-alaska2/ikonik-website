/* İKONİK: стартовая страница (выбор направления) и сайты направлений.
   <html data-page="gateway">   — карточки направлений в [data-dirs]
   <html data-page="business|projects|construction"> — услуги, этапы, преимущества, форма запроса.
   Тексты: assets/js/lang/services.js. Контакты и реквизиты: config в data.js.
   Подключается после data.js, icons.js и app.js. */

(function () {
  var D = window.IKONIK;
  var I = window.IKI18N;
  var T = I.t;
  var icon = window.IKIcon;
  var BASE = window.IK_BASE || '';
  var page = document.documentElement.getAttribute('data-page');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- направления ---------- */
  var DIRS = [
    { id: 'tourism', url: 'tourism/index.html', icon: 'airplane-tilt' },
    { id: 'business', url: 'business/index.html', icon: 'briefcase' },
    { id: 'projects', url: 'projects/index.html', icon: 'buildings' },
    { id: 'construction', url: 'construction/index.html', icon: 'hard-hat' }
  ];

  // иконки шести услуг каждого направления (тексты: <id>.s.<n>.t / .d)
  var SERVICES = {
    business: ['buildings', 'scales', 'chart-line-up', 'presentation-chart', 'identification-card', 'handshake'],
    projects: ['magnifying-glass', 'calculator', 'compass-tool', 'stamp', 'kanban', 'key'],
    construction: ['clipboard-text', 'currency-circle-dollar', 'files', 'hard-hat', 'shield-check', 'scales']
  };
  var WHY = ['translate', 'map-pin', 'user-focus', 'receipt'];

  /* ---------- иллюстрации направлений (цвета из темы: --primary, --art-a/b/c) ---------- */
  function windows(x, y, cols, rows, w, h, gx, gy) {
    var out = '';
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      out += '<rect x="' + (x + c * (w + gx)) + '" y="' + (y + r * (h + gy)) + '" width="' + w + '" height="' + h + '" rx="1.5"/>';
    }
    return out;
  }

  var ART = {
    business:
      '<svg class="art" viewBox="0 0 320 220" aria-hidden="true">' +
      '<circle cx="250" cy="58" r="30" fill="var(--art-c)" opacity=".75"/>' +
      '<rect x="20" y="198" width="280" height="6" rx="3" fill="var(--primary)" opacity=".18"/>' +
      '<rect x="36" y="96" width="40" height="104" rx="5" fill="var(--art-a)"/>' +
      '<rect x="82" y="56" width="48" height="144" rx="5" fill="var(--primary)"/>' +
      '<path d="M106 34 L106 56" stroke="var(--primary)" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="136" y="116" width="36" height="84" rx="5" fill="var(--art-b)"/>' +
      '<g fill="#FFFDF9" opacity=".38">' + windows(44, 106, 3, 7, 6, 6, 6, 6) + windows(91, 68, 4, 10, 6, 6, 5, 6) + '</g>' +
      '<g fill="var(--primary)" opacity=".28">' + windows(144, 126, 2, 5, 6, 6, 8, 8) + '</g>' +
      '<rect x="192" y="160" width="18" height="40" rx="3" fill="var(--art-b)"/>' +
      '<rect x="218" y="138" width="18" height="62" rx="3" fill="var(--art-b)"/>' +
      '<rect x="244" y="116" width="18" height="84" rx="3" fill="var(--art-a)"/>' +
      '<rect x="270" y="92" width="18" height="108" rx="3" fill="var(--primary)"/>' +
      '<path d="M188 146 L220 124 L246 104 L286 74" stroke="var(--art-c)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M272 72 L288 72 L288 88" stroke="var(--art-c)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>',

    projects:
      '<svg class="art" viewBox="0 0 320 220" aria-hidden="true">' +
      '<path d="M18 168 L150 120 L302 150 L170 206 Z" fill="var(--art-b)"/>' +
      '<path d="M18 168 L170 206 L170 214 L18 176 Z" fill="var(--art-a)" opacity=".55"/>' +
      '<path d="M170 206 L302 150 L302 158 L170 214 Z" fill="var(--art-a)" opacity=".8"/>' +
      '<g stroke="var(--primary)" stroke-width="1" opacity=".22">' +
        '<path d="M51 156 L203 194 M84 144 L236 182 M117 132 L269 170 M66 174 L198 124 M114 186 L246 136"/>' +
      '</g>' +
      '<path d="M120 152 L120 84 L178 66 L232 82 L232 158 L176 176 Z" fill="none" stroke="var(--primary)" stroke-width="2" stroke-dasharray="6 5" opacity=".7"/>' +
      '<path d="M120 152 L120 116 L176 134 L176 176 Z" fill="var(--primary)"/>' +
      '<path d="M176 134 L232 120 L232 158 L176 176 Z" fill="var(--primary-deep)"/>' +
      '<path d="M120 116 L176 100 L232 120 L176 134 Z" fill="var(--art-a)"/>' +
      '<g fill="#FFFDF9" opacity=".4"><rect x="130" y="128" width="8" height="10" rx="1"/><rect x="146" y="133" width="8" height="10" rx="1"/><rect x="186" y="136" width="8" height="10" rx="1"/><rect x="204" y="131" width="8" height="10" rx="1"/></g>' +
      '<circle cx="60" cy="150" r="13" fill="var(--art-a)"/><rect x="58" y="158" width="4" height="12" rx="2" fill="var(--primary-deep)"/>' +
      '<circle cx="268" cy="140" r="10" fill="var(--art-a)"/><rect x="266" y="146" width="4" height="10" rx="2" fill="var(--primary-deep)"/>' +
      '<path d="M262 40 a16 16 0 1 1 32 0 c0 12 -16 26 -16 26 s-16 -14 -16 -26Z" fill="var(--accent)"/>' +
      '<circle cx="278" cy="40" r="6" fill="#FFFDF9"/>' +
      '<circle cx="70" cy="50" r="20" fill="var(--art-c)" opacity=".7"/>' +
      '</svg>',

    construction:
      '<svg class="art" viewBox="0 0 320 220" aria-hidden="true">' +
      '<circle cx="268" cy="52" r="24" fill="var(--art-c)" opacity=".55"/>' +
      '<rect x="20" y="198" width="280" height="6" rx="3" fill="var(--primary)" opacity=".2"/>' +
      '<rect x="62" y="40" width="12" height="160" fill="var(--art-c)"/>' +
      '<path d="M62 52 L74 64 M74 64 L62 76 M62 76 L74 88 M74 88 L62 100 M62 100 L74 112 M74 112 L62 124 M62 124 L74 136 M74 136 L62 148 M62 148 L74 160 M74 160 L62 172 M62 172 L74 184" stroke="var(--primary-deep)" stroke-width="1.5" opacity=".55"/>' +
      '<rect x="30" y="34" width="232" height="10" rx="2" fill="var(--art-c)"/>' +
      '<path d="M30 34 L68 14 L106 34" stroke="var(--primary-deep)" stroke-width="2" fill="none"/>' +
      '<rect x="30" y="44" width="22" height="16" rx="2" fill="var(--primary-deep)"/>' +
      '<rect x="196" y="44" width="16" height="8" rx="2" fill="var(--primary-deep)"/>' +
      '<path d="M204 52 L204 96" stroke="var(--primary-deep)" stroke-width="1.5"/>' +
      '<rect x="176" y="96" width="56" height="8" rx="2" fill="var(--primary)"/>' +
      '<g fill="var(--art-b)"><rect x="128" y="118" width="150" height="82" rx="3"/></g>' +
      '<g stroke="var(--art-a)" stroke-width="5" stroke-linecap="square" fill="none">' +
        '<path d="M132 198 V122 M178 198 V122 M224 198 V122 M272 198 V122"/>' +
        '<path d="M130 122 H274 M130 148 H274 M130 174 H274"/>' +
      '</g>' +
      '<g fill="var(--primary)" opacity=".85"><rect x="186" y="152" width="34" height="18" rx="2"/><rect x="140" y="178" width="34" height="18" rx="2"/></g>' +
      '<path d="M96 196 a14 12 0 0 1 28 0 Z" fill="var(--art-c)"/><rect x="92" y="194" width="36" height="5" rx="2" fill="var(--art-c)"/>' +
      '</svg>'
  };

  /* ---------- контакты ---------- */
  var phoneHref = 'tel:' + D.config.phone.replace(/[^\d+]/g, '');
  function waLink(text) {
    return 'https://wa.me/' + D.config.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  document.querySelectorAll('[data-phone]').forEach(function (a) {
    a.href = phoneHref;
    var s = a.querySelector('span'); if (s) s.textContent = D.config.phone;
  });
  document.querySelectorAll('[data-email]').forEach(function (a) {
    a.href = 'mailto:' + D.config.email;
    var s = a.querySelector('span'); if (s) s.textContent = D.config.email;
  });
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink(''); a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- стартовая страница ---------- */
  function renderGateway() {
    var box = document.querySelector('[data-dirs]');
    if (!box) return;
    box.innerHTML = DIRS.map(function (d, i) {
      var art = d.id === 'tourism'
        ? '<img class="dir__img" src="' + BASE + 'assets/img/turkey-diorama.webp" alt="" width="1533" height="974" decoding="async">'
        : ART[d.id];
      return '<li data-theme="' + d.id + '">' +
        '<a class="dir" href="' + BASE + d.url + '" style="--i:' + i + '">' +
          '<span class="dir__art">' + art + '<span class="dir__badge">' + icon(d.icon) + '</span></span>' +
          '<span class="dir__body">' +
            '<span class="dir__name">' + esc(T('dir.' + d.id + '.name')) + '</span>' +
            '<span class="dir__text">' + esc(T('dir.' + d.id + '.text')) + '</span>' +
            '<span class="dir__go">' + esc(T('gw.open')) + icon('arrow-right', 'i--sm') + '</span>' +
          '</span>' +
        '</a></li>';
    }).join('');
  }

  /* ---------- сайт направления ---------- */
  function renderService(id) {
    var list = SERVICES[id];
    var art = document.querySelector('[data-art]');
    if (art) art.innerHTML = ART[id];

    var card = document.querySelector('[data-hero-card]');
    if (card) {
      card.innerHTML = '<span class="t-eyebrow">' + esc(T('svc.heroCard')) + '</span><ul>' +
        list.slice(0, 4).map(function (ic, n) {
          return '<li>' + icon('check', 'i--sm') + '<span>' + esc(T(id + '.s.' + n + '.t')) + '</span></li>';
        }).join('') + '</ul>';
    }

    var grid = document.querySelector('[data-services]');
    if (grid) {
      grid.innerHTML = list.map(function (ic, n) {
        return '<li class="svc">' +
          '<span class="svc__icon">' + icon(ic) + '</span>' +
          '<h3 class="t-h3">' + esc(T(id + '.s.' + n + '.t')) + '</h3>' +
          '<p class="t-small t-muted">' + esc(T(id + '.s.' + n + '.d')) + '</p>' +
        '</li>';
      }).join('');
    }

    var steps = document.querySelector('[data-steps]');
    if (steps) {
      steps.innerHTML = [0, 1, 2, 3].map(function (n) {
        return '<li class="step"><span class="step__num">' + (n + 1) + '</span>' +
          '<h3 class="t-h3">' + esc(T('svc.step.' + n + '.t')) + '</h3>' +
          '<p class="t-small t-muted">' + esc(T('svc.step.' + n + '.d')) + '</p></li>';
      }).join('');
    }

    var why = document.querySelector('[data-why]');
    if (why) {
      why.innerHTML = WHY.map(function (ic, n) {
        return '<li class="why">' + icon(ic) +
          '<div><h3 class="t-h3">' + esc(T('svc.why.' + n + '.t')) + '</h3>' +
          '<p class="t-small t-muted">' + esc(T('svc.why.' + n + '.d')) + '</p></div></li>';
      }).join('');
    }

    // ссылки на другие направления в подвале
    document.querySelectorAll('[data-other-dirs]').forEach(function (nav) {
      nav.innerHTML = DIRS.filter(function (d) { return d.id !== id; }).map(function (d) {
        return '<a class="link" href="' + BASE + d.url + '">' + esc(T('dir.' + d.id + '.name')) + '</a>';
      }).join('') + '<a class="link" href="' + BASE + 'index.html">' + esc(T('svc.allServices')) + '</a>';
    });

    initForm(id, list);
  }

  /* ---------- форма запроса ---------- */
  function initForm(id, list) {
    var form = document.querySelector('[data-request]');
    if (!form) return;
    var sel = form.elements.service;
    sel.innerHTML = list.map(function (ic, n) {
      return '<option>' + esc(T(id + '.s.' + n + '.t')) + '</option>';
    }).join('') + '<option>' + esc(T('svc.f.other')) + '</option>';

    var done = document.querySelector('[data-request-done]');

    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field');
      if (f) f.classList.remove('is-invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var el = form.elements, ok = true;
      function bad(input, cond) {
        input.closest('.field').classList.toggle('is-invalid', cond);
        if (cond && ok) { input.focus(); ok = false; }
      }
      bad(el.name, el.name.value.trim().length < 2);
      bad(el.phone, el.phone.value.replace(/\D/g, '').length < 7);
      bad(el.consent, !el.consent.checked);
      if (!ok) return;

      var req = {
        direction: T('dir.' + id + '.name'),
        service: sel.value,
        name: el.name.value.trim(),
        phone: el.phone.value.trim(),
        email: el.email.value.trim(),
        message: el.message.value.trim()
      };
      // TODO: подключить отправку на сервер / в CRM / в Telegram-бот.
      console.info('[İKONİK] Запрос', req);

      if (D.config.whatsapp) {
        var msg = T('svc.wa.request') + ': ' + req.direction + '\n' + T('svc.wa.service') + ': ' + req.service +
          '\n' + T('wa.name') + ': ' + req.name + '\n' + T('wa.phone') + ': ' + req.phone +
          (req.email ? '\nEmail: ' + req.email : '') + (req.message ? '\n' + req.message : '');
        window.open(waLink(msg), '_blank', 'noopener');
      }

      form.hidden = true;
      done.hidden = false;
      done.querySelector('[data-done-text]').textContent = T('svc.done.text', { name: req.name, phone: req.phone });
      done.querySelector('button').focus();
    });

    done.querySelector('button').addEventListener('click', function () {
      form.reset();
      done.hidden = true;
      form.hidden = false;
      form.elements.name.focus();
    });
  }

  if (page === 'gateway') renderGateway();
  else if (SERVICES[page]) renderService(page);

  I.apply(document);
  window.IKIconHydrate();
})();
