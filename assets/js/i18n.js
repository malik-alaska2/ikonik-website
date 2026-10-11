/* Языки сайта: турецкий, английский, русский, итальянский, немецкий.
   Подключается в <head> сразу после window.IK_BASE.
   Русский — основа (тексты в data.js и в этом файле). Для остальных языков синхронно
   подгружается assets/js/lang/<код>.js, который задаёт window.IK_LANG_PACK = { ui, content }.
   Выбор языка: ?lang=xx, затем сохранённый в браузере, затем язык браузера.

   В разметке:  data-i18n="ключ"        текст элемента
                data-i18n-aria="ключ"   aria-label
                data-i18n-alt="ключ"    alt
                data-i18n-c="regions.kenya.name"  текст из контента (data.js с переводом)
                data-lang-switch        место для переключателя языка */

(function () {
  var LANGS = [
    { code: 'tr', name: 'Türkçe', locale: 'tr-TR' },
    { code: 'en', name: 'English', locale: 'en-US' },
    { code: 'ru', name: 'Русский', locale: 'ru-RU' },
    { code: 'it', name: 'Italiano', locale: 'it-IT' },
    { code: 'de', name: 'Deutsch', locale: 'de-DE' }
  ];
  var KEY = 'ik:lang';
  var BASE = window.IK_BASE || '';

  function valid(c) { return LANGS.some(function (l) { return l.code === c; }); }

  function detect() {
    var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    if (valid(q)) { try { localStorage.setItem(KEY, q); } catch (e) {} return q; }
    try { var s = localStorage.getItem(KEY); if (valid(s)) return s; } catch (e) {}
    var nav = (navigator.languages || [navigator.language || '']).map(function (x) { return String(x).slice(0, 2).toLowerCase(); });
    for (var i = 0; i < nav.length; i++) {
      if (valid(nav[i])) return nav[i];
      if (['uk', 'be', 'kk', 'ky', 'uz', 'tg'].indexOf(nav[i]) !== -1) return 'ru';
      if (nav[i] === 'az') return 'tr';
    }
    return 'en';
  }

  var lang = detect();
  document.documentElement.lang = lang;
  if (lang !== 'ru') {
    document.write('<script src="' + BASE + 'assets/js/lang/' + lang + '.js"><\/script>');
  }

  /* ---------- русский интерфейс (основа) ---------- */
  var RU = {
    'skip': 'К содержимому',
    'intro.skip': 'Пропустить',
    'lang.label': 'Язык',
    'nav.main': 'Основная навигация', 'nav.quick': 'Быстрая навигация',
    'nav.regions': 'Регионы', 'nav.tours': 'Туры', 'nav.how': 'Как забронировать', 'nav.contacts': 'Контакты', 'nav.book': 'Бронь',
    'cta.pick': 'Подобрать тур',
    'logo.home': 'İkonik Turizm, на главную', 'logo.regions': 'İkonik Turizm, все регионы',

    'home.title': 'Куда поедем?',
    'home.lead': 'Сафари в Кении и Танзании, пустыни Аравии, Турция и Европа. Выберите регион, а мы соберём тур под ваши даты.',
    'home.go': 'Смотреть туры',
    'home.goNote': 'Наведите на регион или нажмите на него, чтобы увидеть, как он выглядит.',
    'home.toursFrom': 'Туры от',
    'home.toursCount': ['тур', 'тура', 'туров'],
    'home.daysRange': 'от {min} до {max} дней',
    'home.soon': 'Скоро, примем заявку',
    'home.toursTitle': 'Популярные туры',
    'home.toursLead': 'Цена за человека при двухместном размещении. Перелёт подберём отдельно под ваш город вылета.',
    'how.title': 'Как забронировать',
    'how.s1.t': 'Выберите тур или регион', 'how.s1.d': 'Если не нашли подходящий тур, просто укажите регион и даты.',
    'how.s2.t': 'Оставьте заявку', 'how.s2.d': 'Имя и телефон. Менеджер свяжется, уточнит пожелания и состав группы.',
    'how.s3.t': 'Получите программу и цену', 'how.s3.d': 'Пришлём программу по дням с итоговой стоимостью. Оплата только после вашего подтверждения.',
    'contact.title': 'Не знаете, какой регион выбрать?',
    'contact.text': 'Расскажите, что хотите увидеть и когда свободны. Предложим два-три варианта с ценами.',

    'rail.aria': 'Разделы страницы', 'rail.overview': 'Обзор', 'rail.extras': 'Экскурсии', 'rail.saved': 'Избранное',
    'region.route': 'Маршрут', 'region.bestTime': 'Лучшее время', 'region.extras': 'Экскурсии', 'region.all': 'Все',
    'region.filterAria': 'Фильтр туров', 'region.extrasTitle': 'Добавьте к поездке',
    'region.extrasLead': 'Можно выбрать в заявке к любому туру. Цена за человека.',
    'region.when': 'Когда ехать', 'region.seasonsAria': 'Сезоны по месяцам', 'region.included': 'Что входит в цену',
    'footer.allRegions': 'Все регионы', 'footer.allServices': 'Все направления İKONİK', 'footer.other': 'Другие разделы',

    'filter.all': 'Все', 'filter.saved': 'Избранное',
    'empty.savedTitle': 'Здесь появятся сохранённые туры',
    'empty.savedText': 'Нажмите на закладку в карточке тура, чтобы вернуться к нему позже.',
    'empty.none': 'Под этот фильтр туров пока нет', 'empty.showAll': 'Показать все туры',
    'extra.perPerson': 'за человека', 'extra.add': 'В заявку', 'extra.addAria': 'Добавить в заявку: {x}',
    'pin.aria': '{name}: показать тур',
    'months': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

    'ticket.from': 'от', 'ticket.perPerson': 'за человека', 'ticket.book': 'Забронировать',
    'ticket.save': 'Сохранить тур «{t}»', 'days': ['день', 'дня', 'дней'],

    'book.title': 'Заявка на тур',
    'book.lead': 'Менеджер уточнит даты и пришлёт итоговую стоимость. Оплата только после подтверждения.',
    'book.close': 'Закрыть', 'f.tour': 'Тур', 'f.date': 'Дата начала', 'f.approx': 'примерно',
    'f.adults': 'Взрослые', 'f.kids': 'Дети', 'f.extras': 'Добавить к поездке',
    'f.name': 'Имя', 'f.nameErr': 'Укажите имя',
    'f.phone': 'Телефон или WhatsApp', 'f.phonePh': '+7 900 000 00 00', 'f.phoneErr': 'Нужен номер, чтобы связаться с вами',
    'f.email': 'Email', 'f.optional': 'необязательно', 'f.comment': 'Пожелания',
    'f.commentPh': 'Например: медовый месяц, нужен лодж с видом на реку',
    'f.consent': 'Согласен на обработку персональных данных для подбора тура',
    'f.consentErr': 'Без согласия мы не сможем обработать заявку',
    'f.submit': 'Отправить заявку', 'done.title': 'Заявка отправлена',
    'done.text': '{name}, мы свяжемся с вами по номеру {phone}, чтобы уточнить детали тура «{tour}».',
    'opt.pick': 'Подобрать тур: {region}', 'opt.tour': '{title}, {days}, от {price}',
    'req.pick': 'Подбор тура: {region}', 'req.noDate': 'не указана',
    'wa.request': 'Заявка', 'wa.date': 'Дата', 'wa.adults': 'Взрослые', 'wa.kids': 'дети',
    'wa.extras': 'Дополнительно', 'wa.name': 'Имя', 'wa.phone': 'Телефон',

    'wx.today': 'Сегодня',
    'wx.forecast': 'Прогноз на 5 дней',
    'wx.localTime': 'Местное время',
    'wx.c.clear': 'ясно',
    'wx.c.partly': 'переменная облачность',
    'wx.c.cloudy': 'облачно',
    'wx.c.fog': 'туман',
    'wx.c.rain': 'дождь',
    'wx.c.snow': 'снег',
    'wx.c.storm': 'гроза',
    'wx.at.kenya': 'Сейчас в Масаи-Мара',
    'wx.at.tanzania': 'Сейчас в Серенгети',
    'wx.at.arabia': 'Сейчас в Дубае',
    'wx.at.turkey': 'Сейчас в Каппадокии',
    'wx.at.europe': 'Сейчас во Флоренции',
    'wx.credit': 'Погода: MET Norway',

    'meta.brand.title': 'İkonik Turizm: сафари в Африке, пустыни Аравии, Турция и Европа',
    'meta.brand.desc': 'Туроператор İkonik Turizm: сафари в Кении и Танзании, ночь в пустыне в ОАЭ и Омане, шары над Каппадокией, озёра и города Европы. Выберите регион и оставьте заявку онлайн.',
    'meta.kenya.title': 'Сафари в Кении: Масаи-Мара и Амбосели | İkonik Turizm',
    'meta.kenya.desc': 'Сафари-туры в Кении: Масаи-Мара, Амбосели, озеро Накуру. Лоджи, гиды-рейнджеры, Великая миграция. Заявка онлайн.',
    'meta.tanzania.title': 'Сафари в Танзании: Серенгети, Нгоронгоро, Занзибар | İkonik Turizm',
    'meta.tanzania.desc': 'Туры в Танзанию: Великая миграция в Серенгети, кратер Нгоронгоро, восхождение на Килиманджаро и пляжи Занзибара. Заявка онлайн.',
    'meta.arabia.title': 'Туры в ОАЭ, Оман и Саудовскую Аравию: пустыня и города | İkonik Turizm',
    'meta.arabia.desc': 'Туры по Аравии: джип по дюнам, ночь в бедуинском лагере, пески Вахиба в Омане, АльУла и Хегра. Заявка онлайн.',
    'meta.turkey.title': 'Туры в Турцию: Стамбул, Каппадокия, Анталия | İkonik Turizm',
    'meta.turkey.desc': 'Туры по Турции: полёт на шаре над Каппадокией, старый Стамбул и Босфор, Эфес, Памуккале и побережье Анталии. Заявка онлайн.',
    'meta.europe.title': 'Туры в Европу: Италия, Франция, Швейцария | İkonik Turizm',
    'meta.europe.desc': 'Туры по Европе: озеро Комо и Альпы, Тоскана и Рим, Париж и лавандовый Прованс. Отели, поезда и гиды. Заявка онлайн.'
  };

  var pack = null;
  function ui() { pack = pack || window.IK_LANG_PACK || { ui: {}, content: {} }; return pack.ui || {}; }
  function raw(key) { var u = ui(); return key in u ? u[key] : RU[key]; }

  function t(key, vars) {
    var s = raw(key);
    if (s == null) return key;
    if (vars) s = String(s).replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; });
    return s;
  }

  // формы слова: 3 формы — русское правило, 2 — один/много, 1 — всегда одна
  function plural(n, key) {
    var f = raw(key);
    if (!Array.isArray(f)) return f;
    if (f.length === 3) {
      var a = Math.abs(n) % 100, b = a % 10;
      if (a > 10 && a < 20) return f[2];
      if (b > 1 && b < 5) return f[1];
      if (b === 1) return f[0];
      return f[2];
    }
    if (f.length === 2) return n === 1 ? f[0] : f[1];
    return f[0];
  }

  function locale() { return LANGS.filter(function (l) { return l.code === lang; })[0].locale; }

  // перевод контента data.js: ключи вида "tours.mara-classic.stats.0.value"
  function applyContent(D) {
    var c = (window.IK_LANG_PACK || {}).content;
    if (!c || !D) return;
    Object.keys(c).forEach(function (key) {
      var parts = key.split('.');
      var list = D[parts[0]];
      if (!Array.isArray(list)) return;
      var obj = list.filter(function (x) { return x.id === parts[1]; })[0];
      for (var i = 2; obj && i < parts.length - 1; i++) obj = obj[parts[i]];
      if (obj && typeof obj === 'object') obj[parts[parts.length - 1]] = c[key];
    });
  }

  function fromContent(path) {
    var parts = path.split('.'), D = window.IKONIK;
    var obj = (D[parts[0]] || []).filter(function (x) { return x.id === parts[1]; })[0];
    for (var i = 2; obj && i < parts.length; i++) obj = obj[parts[i]];
    return obj;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    root.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      el.alt = k.indexOf('regions.') === 0 ? (fromContent(k) || el.alt) : t(k);
    });
    root.querySelectorAll('[data-i18n-c]').forEach(function (el) {
      var v = fromContent(el.getAttribute('data-i18n-c'));
      if (typeof v === 'string') el.textContent = v;
    });
    var page = document.documentElement.getAttribute('data-page') || 'brand';
    document.title = t('meta.' + page + '.title');
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', t('meta.' + page + '.desc'));
    renderSwitchers();
  }

  /* ---------- переключатель языка ---------- */
  function renderSwitchers() {
    document.querySelectorAll('[data-lang-switch]').forEach(function (box) {
      if (box.getAttribute('data-ready')) return;
      box.setAttribute('data-ready', '1');
      box.className = 'lang' + (box.className ? ' ' + box.className : '');
      var cur = LANGS.filter(function (l) { return l.code === lang; })[0];
      box.innerHTML =
        '<button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="' + t('lang.label') + ': ' + cur.name + '">' +
          window.IKIcon('globe', 'i--sm') + '<span>' + cur.code.toUpperCase() + '</span></button>' +
        '<ul class="lang__menu" role="menu" hidden>' +
          LANGS.map(function (l) {
            return '<li role="none"><button type="button" role="menuitemradio" aria-checked="' + (l.code === lang) + '" data-lang="' + l.code + '" lang="' + l.code + '">' +
              '<b>' + l.code.toUpperCase() + '</b>' + l.name + '</button></li>';
          }).join('') +
        '</ul>';
      var btn = box.querySelector('.lang__btn'), menu = box.querySelector('.lang__menu');
      function open(on) { menu.hidden = !on; btn.setAttribute('aria-expanded', on); }
      btn.addEventListener('click', function (e) { e.stopPropagation(); open(menu.hidden); });
      menu.addEventListener('click', function (e) {
        var b = e.target.closest('[data-lang]');
        if (b) setLang(b.getAttribute('data-lang'));
      });
      document.addEventListener('click', function () { open(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });
    });
  }

  function setLang(code) {
    if (!valid(code)) return;
    try { localStorage.setItem(KEY, code); } catch (e) {}
    var url = location.pathname + location.search.replace(/([?&])lang=[a-z]{2}&?/, '$1').replace(/[?&]$/, '') + location.hash;
    if (code === lang) return;
    location.href = url;
  }

  // словари разделов (assets/js/lang/services.js): { ru: {...}, en: {...}, ... }
  function extend(dicts) {
    Object.keys(dicts.ru || {}).forEach(function (k) { RU[k] = dicts.ru[k]; });
    var own = dicts[lang];
    if (own && lang !== 'ru') { var u = ui(); Object.keys(own).forEach(function (k) { u[k] = own[k]; }); }
  }

  window.IKI18N = { lang: lang, langs: LANGS, t: t, plural: plural, locale: locale, applyContent: applyContent, apply: apply, setLang: setLang, extend: extend };
})();
