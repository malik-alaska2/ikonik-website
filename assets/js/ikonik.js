/* İKONİK: стартовая страница (выбор направления) и сайты направлений.
   <html data-page="gateway">   — карточки направлений в [data-dirs]
   <html data-page="business|projects|construction"> — услуги с фото, галерея, «Для кого», этапы, преимущества, вопросы, форма запроса.
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
    { id: 'tourism', url: 'tourism/index.html' },
    { id: 'business', url: 'business/index.html' },
    { id: 'projects', url: 'projects/index.html' },
    { id: 'construction', url: 'construction/index.html' },
    { id: 'logistics', url: 'logistics/index.html' }
  ];

  // фирменные значки направлений: 32×32, двухцветные; currentColor + золотая деталь var(--badge-gold)
  var G = 'var(--badge-gold, #F4C35A)';
  var DIR_ICON = {
    tourism:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M16 2.5c-5.6 0-9.5 4.2-9.5 9.3 0 4.6 4.2 8.3 6.6 10.7h5.8c2.4-2.4 6.6-6.1 6.6-10.7 0-5.1-3.9-9.3-9.5-9.3Z" fill="currentColor" fill-opacity=".22"/>' +
      '<path d="M16 2.5c-2.6 2.6-3.6 6-3.6 9.3 0 4.2 1.4 7.8 2.6 10.7h2c1.2-2.9 2.6-6.5 2.6-10.7 0-3.3-1-6.7-3.6-9.3Z" fill="' + G + '" stroke="none"/>' +
      '<path d="M16 2.5c-2.6 2.6-3.6 6-3.6 9.3 0 4.2 1.4 7.8 2.6 10.7M16 2.5c2.6 2.6 3.6 6 3.6 9.3 0 4.2-1.4 7.8-2.6 10.7"/>' +
      '<path d="M13.4 22.5l.9 3.3M18.6 22.5l-.9 3.3"/>' +
      '<rect x="13.6" y="25.8" width="4.8" height="3.7" rx="1" fill="currentColor" fill-opacity=".35"/>' +
      '<path d="M24.5 23.5c1-.7 2-.7 3 0M3.5 18.5c1-.7 2-.7 3 0" stroke-width="1.5"/>' +
      '</svg>',
    business:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 10V8a2.5 2.5 0 0 1 2.5-2.5h3A2.5 2.5 0 0 1 20 8v2"/>' +
      '<rect x="3.5" y="10" width="25" height="17" rx="3.5" fill="currentColor" fill-opacity=".22"/>' +
      '<path d="M3.5 17c4 1.6 8.2 2.4 12.5 2.4s8.5-.8 12.5-2.4"/>' +
      '<rect x="13.5" y="16.5" width="5" height="5" rx="1.4" fill="' + G + '" stroke="currentColor"/>' +
      '</svg>',
    projects:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M5.5 28.5V11.5l8-4v21" fill="currentColor" fill-opacity=".22"/>' +
      '<path d="M13.5 28.5V15.5h9v13" fill="currentColor" fill-opacity=".35"/>' +
      '<path d="M3 28.5h26M8.8 14.5v.01M8.8 18.5v.01M8.8 22.5v.01M17 19.5h1.5M17 23.5h1.5" stroke-width="2.2"/>' +
      '<path d="M25 2.8a3.6 3.6 0 0 0-3.6 3.6c0 2.7 3.6 6 3.6 6s3.6-3.3 3.6-6A3.6 3.6 0 0 0 25 2.8Z" fill="' + G + '"/>' +
      '<circle cx="25" cy="6.4" r="1.1" fill="currentColor" stroke="none"/>' +
      '</svg>',
    construction:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M3 28.5h26"/>' +
      '<path d="M8 28.5V7h3.5v21.5" fill="currentColor" fill-opacity=".22"/>' +
      '<path d="M8 11l3.5 3.5M11.5 14.5L8 18M8 18l3.5 3.5M11.5 21.5L8 25" stroke-width="1.3"/>' +
      '<path d="M4 7h24.5M9.75 2.5L4 7M9.75 2.5L22 7M9.75 2.5V7"/>' +
      '<rect x="4" y="7" width="3.5" height="3" rx=".6" fill="currentColor" stroke="none"/>' +
      '<path d="M24 7v8.5"/>' +
      '<path d="M20.5 18.5a3.5 3.5 0 0 1 7 0v1.2h-7Z" fill="' + G + '"/>' +
      '<path d="M19.5 19.7h9"/>' +
      '</svg>',
    logistics:
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="2.5" y="9" width="19" height="13.5" rx="1.5" fill="currentColor" fill-opacity=".22"/>' +
      '<path d="M7 12v7.5M11 12v7.5M15 12v7.5M19 12v7.5" stroke-width="1.3"/>' +
      '<path d="M21.5 13.5h4l3.5 4.5v4.5h-7.5" fill="currentColor" fill-opacity=".35"/>' +
      '<path d="M25 14v4h4"/>' +
      '<circle cx="8" cy="25.5" r="2.4" fill="' + G + '"/>' +
      '<circle cx="24.5" cy="25.5" r="2.4" fill="' + G + '"/>' +
      '</svg>'
  };

  // иконки шести услуг каждого направления (тексты: <id>.s.<n>.t / .d)
  var SERVICES = {
    business: ['buildings', 'scales', 'chart-line-up', 'presentation-chart', 'identification-card', 'handshake'],
    projects: ['magnifying-glass', 'calculator', 'compass-tool', 'stamp', 'kanban', 'key'],
    construction: ['clipboard-text', 'currency-circle-dollar', 'files', 'hard-hat', 'shield-check', 'scales'],
    logistics: ['boat', 'stamp', 'warehouse', 'package', 'magnifying-glass', 'truck']
  };
  var WHY = ['translate', 'map-pin', 'user-focus', 'receipt'];
  // «Для кого»: три аудитории каждого направления (тексты: <id>.for.<n>.t / .d)
  var AUDIENCE = {
    business: ['globe-hemisphere-west', 'storefront', 'chart-pie-slice'],
    projects: ['map-trifold', 'coins', 'bed'],
    construction: ['house-line', 'buildings', 'key'],
    logistics: ['globe-hemisphere-west', 'storefront', 'crane-tower']
  };
  // частые вопросы: два своих у направления и два общих
  function faqKeys(id) { return [id + '.faq.0', id + '.faq.1', 'svc.faq.price', 'svc.faq.lang']; }

  // фото направления: assets/img/svc/<id>-s<n>.webp (услуги, 960×640) и <id>-g<n>.webp (галерея, первое 1440×960)
  function photo(name, cls, alt) {
    var big = /-g0$/.test(name);
    return '<img class="' + cls + '" src="' + BASE + 'assets/img/svc/' + name + '.webp" alt="' + esc(alt) +
      '" width="' + (big ? 1440 : 960) + '" height="' + (big ? 960 : 640) + '" loading="lazy" decoding="async">';
  }

  // диорама направления: assets/img/<id>-diorama.webp (прозрачный фон)
  var ART_SIZE = { tourism: [1528, 1017], business: [1536, 1014], projects: [1515, 1024], construction: [1417, 1006], logistics: [1500, 990] };
  function diorama(id, cls, eager) {
    return '<img class="' + cls + '" src="' + BASE + 'assets/img/' + id + '-diorama.webp" alt="" width="' + ART_SIZE[id][0] +
      '" height="' + ART_SIZE[id][1] + '" decoding="async"' + (eager ? '' : ' loading="lazy"') + '>';
  }

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

  /* ---------- стартовая страница: архипелаг из четырёх островов ----------
     Острова покачиваются на воде, слегка следуют за курсором (параллакс), при наведении
     поднимаются и окрашивают фон в цвет направления; по клику остров «приближается» и открывается сайт. */
  var DEPTH = { tourism: 22, business: 12, projects: 16, construction: 14, logistics: 18 };
  var FACTS = ['map-pin', 'translate', 'user-focus'];

  function renderGateway() {
    var box = document.querySelector('[data-dirs]');
    var arch = document.querySelector('[data-arch]');
    if (!box || !arch) return;
    box.innerHTML = DIRS.map(function (d, i) {
      return '<li class="isle isle--' + d.id + '" data-theme="' + d.id + '" style="--i:' + i + ';--d:' + DEPTH[d.id] + '">' +
        '<a class="isle__link" href="' + BASE + d.url + '">' +
          '<span class="isle__body"><span class="isle__lift"><span class="isle__float">' + diorama(d.id, 'isle__img', true) + '</span></span>' +
            '<span class="isle__shadow" aria-hidden="true"></span></span>' +
          '<span class="isle__card">' +
            '<span class="badge badge--sm isle__badge" aria-hidden="true">' + DIR_ICON[d.id] + '</span>' +
            '<span class="isle__name">' + esc(T('dir.' + d.id + '.name')) + '</span>' +
            '<span class="isle__go" aria-hidden="true">' + icon('arrow-right', 'i--sm') + '</span>' +
            '<span class="isle__more"><span><span class="isle__text">' + esc(T('dir.' + d.id + '.text')) + '</span></span></span>' +
          '</span>' +
        '</a></li>';
    }).join('');

    var facts = document.querySelector('[data-facts]');
    if (facts) {
      // факты о компании: тексты общие с «Почему İKONİK» на сайтах направлений
      var order = [1, 0, 2];
      facts.innerHTML = order.map(function (n, k) {
        return '<li class="fact"><span class="fact__icon">' + icon(FACTS[k]) + '</span><div>' +
          '<h3 class="t-h3">' + esc(T('svc.why.' + n + '.t')) + '</h3>' +
          '<p class="t-small t-muted">' + esc(T('svc.why.' + n + '.d')) + '</p></div></li>';
      }).join('');
    }

    // направления в шапке рядом с логотипом: наведение подсвечивает свой остров
    var dnav = document.querySelector('[data-dir-nav]');
    if (dnav) {
      dnav.innerHTML = DIRS.map(function (d, i) {
        return '<a class="nav__link dnav" href="' + BASE + d.url + '" data-dir="' + d.id + '" data-theme="' + d.id + '" data-nav-prio="' + (DIRS.length - i) + '">' +
          '<span class="badge dnav__badge" aria-hidden="true">' + DIR_ICON[d.id] + '</span><span>' + esc(T('nav.dir.' + d.id)) + '</span></a>';
      }).join('');
      if (window.IKFitNav) window.IKFitNav();
    }

    var root = document.documentElement;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    var isles = [].slice.call(box.querySelectorAll('.isle'));

    // появление: после заставки, если она показывается
    function ready() { arch.classList.remove('is-pending'); arch.classList.add('is-ready'); }
    if (root.classList.contains('ik-intro-lock')) {
      arch.classList.add('is-pending');
      document.addEventListener('ik:intro-done', ready, { once: true });
    } else {
      ready();
    }

    // активный остров: подсветка и цвет фона его направления
    function activate(li) {
      isles.forEach(function (x) { x.classList.toggle('is-active', x === li); });
      arch.classList.toggle('has-active', !!li);
      if (li) arch.style.setProperty('--wash', getComputedStyle(li).getPropertyValue('--primary'));
    }
    function isleOf(id) { return box.querySelector('.isle--' + id); }
    isles.forEach(function (li) {
      li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') activate(li); });
      li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') activate(null); });
      li.addEventListener('focusin', function () { activate(li); });
      li.addEventListener('focusout', function () { activate(null); });
    });
    if (dnav) [].forEach.call(dnav.querySelectorAll('[data-dir]'), function (a) {
      var li = isleOf(a.getAttribute('data-dir'));
      a.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') activate(li); });
      a.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') activate(null); });
      a.addEventListener('focus', function () { activate(li); });
      a.addEventListener('blur', function () { activate(null); });
    });

    // параллакс за курсором: только мышь и без «уменьшения движения»
    var raf = 0, px = 0, py = 0;
    arch.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse' || still.matches || !fine.matches) return;
      var r = arch.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        arch.style.setProperty('--px', px.toFixed(3));
        arch.style.setProperty('--py', py.toFixed(3));
        arch.style.setProperty('--wx', ((px + 1) * 50).toFixed(1) + '%');
        arch.style.setProperty('--wy', ((py + 1) * 50).toFixed(1) + '%');
      });
    });
    arch.addEventListener('pointerleave', function () {
      arch.style.setProperty('--px', 0);
      arch.style.setProperty('--py', 0);
    });

    // переход: остров приближается и растворяется в цвете направления, затем открывается сайт
    function fly(e, a, li) {
      if (!a || !li || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || still.matches) return;
      e.preventDefault();
      activate(li);
      li.classList.add('is-leaving');
      arch.classList.add('is-leaving');
      setTimeout(function () { location.href = a.href; }, 520);
    }
    box.addEventListener('click', function (e) {
      var a = e.target.closest('.isle__link');
      fly(e, a, a && a.closest('.isle'));
    });
    if (dnav) dnav.addEventListener('click', function (e) {
      var a = e.target.closest('[data-dir]');
      if (a && arch.getBoundingClientRect().bottom > 120) fly(e, a, isleOf(a.getAttribute('data-dir')));
    });
    // возврат кнопкой «назад» из кэша страницы: убираем состояние перехода
    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      arch.classList.remove('is-leaving');
      isles.forEach(function (x) { x.classList.remove('is-leaving'); });
      activate(null);
    });

    // на телефоне острова всплывают по мере прокрутки
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -12% 0px' });
      isles.forEach(function (li) { io.observe(li); });
    } else {
      isles.forEach(function (li) { li.classList.add('is-in'); });
    }
  }

  /* ---------- сайт направления ---------- */
  function renderService(id) {
    var list = SERVICES[id];
    var art = document.querySelector('[data-art]');
    if (art) art.innerHTML = diorama(id, 'svc-stage__img', true);

    var badge = document.querySelector('[data-dir-badge]');
    if (badge) badge.innerHTML = DIR_ICON[id];

    var card = document.querySelector('[data-hero-card]');
    if (card) {
      card.innerHTML = '<h2 class="t-eyebrow" id="help-title">' + esc(T('svc.heroCard')) + '</h2><ul>' +
        list.slice(0, 4).map(function (ic, n) {
          return '<li><a href="#services">' + icon('check', 'i--sm') + '<span>' + esc(T(id + '.s.' + n + '.t')) + '</span></a></li>';
        }).join('') + '</ul>';
    }

    var grid = document.querySelector('[data-services]');
    if (grid) {
      grid.innerHTML = list.map(function (ic, n) {
        return '<li class="svc">' +
          '<span class="svc__media">' + photo(id + '-s' + n, 'svc__img', '') + '</span>' +
          '<span class="svc__icon">' + icon(ic) + '</span>' +
          '<h3 class="t-h3">' + esc(T(id + '.s.' + n + '.t')) + '</h3>' +
          '<p class="t-small t-muted">' + esc(T(id + '.s.' + n + '.d')) + '</p>' +
        '</li>';
      }).join('');
    }

    var gallery = document.querySelector('[data-gallery]');
    if (gallery) {
      gallery.innerHTML = [0, 1, 2].map(function (n) {
        var cap = T(id + '.g.' + n);
        return '<figure class="gal' + (n === 0 ? ' gal--big' : '') + '">' + photo(id + '-g' + n, 'gal__img', cap) +
          '<figcaption class="gal__cap">' + esc(cap) + '</figcaption></figure>';
      }).join('');
    }

    var aud = document.querySelector('[data-for]');
    if (aud) {
      aud.innerHTML = AUDIENCE[id].map(function (ic, n) {
        return '<li class="for"><span class="for__icon">' + icon(ic) + '</span>' +
          '<h3 class="t-h3">' + esc(T(id + '.for.' + n + '.t')) + '</h3>' +
          '<p class="t-small t-muted">' + esc(T(id + '.for.' + n + '.d')) + '</p></li>';
      }).join('');
    }

    var faq = document.querySelector('[data-faq]');
    if (faq) {
      faq.innerHTML = faqKeys(id).map(function (k, n) {
        return '<details class="qa"' + (n === 0 ? ' open' : '') + '><summary><span>' + esc(T(k + '.q')) + '</span>' + icon('plus', 'i--sm') + '</summary>' +
          '<p>' + esc(T(k + '.a')) + '</p></details>';
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
