/* Живая погода региона: Open-Meteo (без ключа, CORS открыт).
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

  // код погоды WMO -> тип иконки IKWeather и ключ названия
  function kind(code, isDay) {
    if (code === 0 || code === 1) return { type: isDay ? 'sun' : 'moon', key: 'clear' };
    if (code === 2) return { type: isDay ? 'cloud' : 'moon-cloud', key: 'partly' };
    if (code === 3) return { type: 'clouds', key: 'cloudy' };
    if (code === 45 || code === 48) return { type: 'clouds', key: 'fog' };
    if (code >= 95) return { type: 'storm', key: 'storm' };
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { type: 'snow', key: 'snow' };
    if (code >= 51) return { type: 'rain', key: 'rain' };
    return { type: 'cloud', key: 'partly' };
  }

  function load(id) {
    var pt = POINTS[id];
    if (!pt || !window.fetch) return Promise.resolve(null);
    var cacheKey = 'ik:wx:' + id;
    try {
      var c = JSON.parse(sessionStorage.getItem(cacheKey));
      if (c && Date.now() - c.at < TTL) return Promise.resolve(c.data);
    } catch (e) {}
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + pt[0] + '&longitude=' + pt[1] +
      '&current=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=5';
    return fetch(url).then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
      if (!data || !data.current) return null;
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data: data })); } catch (e) {}
      return data;
    }).catch(function () { return null; });
  }

  function live(id) {
    var I = window.IKI18N;
    return load(id).then(function (d) {
      if (!d) return null;
      var now = kind(d.current.weather_code, d.current.is_day === 1);
      var fmt = new Intl.DateTimeFormat(I.locale(), { weekday: 'short', timeZone: 'UTC' });
      return {
        temp: Math.round(d.current.temperature_2m) + '°',
        type: now.type,
        condition: I.t('wx.c.' + now.key),
        place: I.t('wx.at.' + id),
        days: d.daily.time.map(function (day, i) {
          var label = i === 0 ? I.t('wx.today') : fmt.format(new Date(day + 'T12:00:00Z'));
          return { label: label.charAt(0).toUpperCase() + label.slice(1).replace('.', ''), type: kind(d.daily.weather_code[i], true).type, max: Math.round(d.daily.temperature_2m_max[i]) + '°' };
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
