/* Живая погода региона: MET Norway Locationforecast (бесплатно, в том числе для коммерческих сайтов;
   лицензия CC BY 4.0, поэтому в подвале стоит ссылка на источник; CORS открыт, ключ не нужен).
   IKLiveWeather(regionId) -> Promise<{ temp, type, condition, place, days: [{ label, type, max }] }> или null.
   Ответ кэшируется в sessionStorage на 30 минут. Без сети остаются климатические данные из data.js.
   IKClock(el, regionId) — местное время региона в el, обновляется раз в 15 секунд. */

(function () {
  var POINTS = {
    kenya: [-1.49, 35.14],     // Масаи-Мара
    tanzania: [-2.33, 34.83],  // Серенгети
    arabia: [25.2, 55.27],     // Дубай
    turkey: [38.64, 34.83],    // Каппадокия (Гёреме)
    europe: [43.77, 11.25]     // Флоренция
  };
  // часовой пояс той же точки
  var ZONES = {
    kenya: 'Africa/Nairobi',
    tanzania: 'Africa/Dar_es_Salaam',
    arabia: 'Asia/Dubai',
    turkey: 'Europe/Istanbul',
    europe: 'Europe/Rome'
  };
  var TTL = 30 * 60 * 1000;
  var DAYS = 5;

  // symbol_code MET Norway (например partlycloudy_day) -> тип иконки IKWeather и ключ названия
  function kind(symbol) {
    var s = String(symbol || '');
    var night = /_night$/.test(s);
    s = s.replace(/_(day|night|polartwilight)$/, '');
    if (s === 'clearsky' || s === 'fair') return { type: night ? 'moon' : 'sun', key: 'clear' };
    if (s === 'partlycloudy') return { type: night ? 'moon-cloud' : 'cloud', key: 'partly' };
    if (s === 'cloudy') return { type: 'clouds', key: 'cloudy' };
    if (s === 'fog') return { type: 'clouds', key: 'fog' };
    if (s.indexOf('thunder') > -1) return { type: 'storm', key: 'storm' };
    if (s.indexOf('snow') > -1 || s.indexOf('sleet') > -1) return { type: 'snow', key: 'snow' };
    if (s.indexOf('rain') > -1) return { type: 'rain', key: 'rain' };
    return { type: 'cloud', key: 'partly' };
  }

  // символ ближайшего периода у точки прогноза
  function symbolOf(step) {
    var d = step.data;
    return (d.next_1_hours || d.next_6_hours || d.next_12_hours || {}).summary;
  }

  // сырой прогноз -> { temp, symbol, days: [{ date, symbol, max }] } по местным суткам региона
  function shape(json, zone) {
    var series = json && json.properties && json.properties.timeseries;
    if (!series || !series.length) return null;
    var dayOf = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: zone });
    var hourOf = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone: zone });
    var now = Date.now();
    var first = series.filter(function (st) { return Date.parse(st.time) + 3600000 > now; })[0] || series[0];
    var byDay = {}, order = [];
    series.forEach(function (st) {
      var t = new Date(st.time);
      var date = dayOf.format(t);
      if (!byDay[date]) { byDay[date] = { date: date, max: -Infinity, symbol: null, gap: 99 }; order.push(date); }
      var day = byDay[date];
      day.max = Math.max(day.max, st.data.instant.details.air_temperature);
      // значок дня берём ближе к полудню
      var gap = Math.abs(parseInt(hourOf.format(t), 10) - 12);
      var sym = symbolOf(st);
      if (sym && gap < day.gap) { day.gap = gap; day.symbol = sym.symbol_code; }
    });
    var sym = symbolOf(first);
    return {
      temp: first.data.instant.details.air_temperature,
      symbol: sym ? sym.symbol_code : null,
      days: order.slice(0, DAYS).map(function (d) { return { date: d, symbol: byDay[d].symbol, max: byDay[d].max }; })
    };
  }

  function load(id) {
    var pt = POINTS[id];
    if (!pt || !window.fetch) return Promise.resolve(null);
    var cacheKey = 'ik:wx2:' + id;
    try {
      var c = JSON.parse(sessionStorage.getItem(cacheKey));
      if (c && Date.now() - c.at < TTL) return Promise.resolve(c.data);
    } catch (e) {}
    var url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + pt[0] + '&lon=' + pt[1];
    return fetch(url).then(function (r) { return r.ok ? r.json() : null; }).then(function (json) {
      var data = shape(json, ZONES[id]);
      if (!data) return null;
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data: data })); } catch (e) {}
      return data;
    }).catch(function () { return null; });
  }

  function live(id) {
    var I = window.IKI18N;
    return load(id).then(function (d) {
      if (!d) return null;
      var now = kind(d.symbol);
      var fmt = new Intl.DateTimeFormat(I.locale(), { weekday: 'short', timeZone: 'UTC' });
      return {
        temp: Math.round(d.temp) + '°',
        type: now.type,
        condition: I.t('wx.c.' + now.key),
        place: I.t('wx.at.' + id),
        days: d.days.map(function (day, i) {
          var label = i === 0 ? I.t('wx.today') : fmt.format(new Date(day.date + 'T12:00:00Z'));
          return { label: label.charAt(0).toUpperCase() + label.slice(1).replace('.', ''), type: kind(String(day.symbol).replace('_night', '_day')).type, max: Math.round(day.max) + '°' };
        })
      };
    });
  }

  function clock(el, id) {
    var I = window.IKI18N;
    clearInterval(el._clock);
    if (!ZONES[id]) { el.hidden = true; return; }
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat(I.locale(), { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: ZONES[id] });
    } catch (e) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = '<b></b><span>' + I.t('wx.localTime') + '</span>';
    var b = el.querySelector('b');
    function tick() {
      var now = new Date();
      b.textContent = fmt.format(now);
      b.setAttribute('datetime', now.toISOString());
    }
    tick();
    el._clock = setInterval(tick, 15000);
  }

  window.IKLiveWeather = live;
  window.IKClock = clock;
})();
