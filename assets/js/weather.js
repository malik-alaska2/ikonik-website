/* Иконки погоды в стиле референса reference/weather design.png:
   объёмное солнце, облака и луна (картинки в assets/img/weather), поверх них
   анимированные дождь, снег и молния. Движение задаёт base.css (.wx).
   Использование: IKWeather('rain') или IKWeather('sun', 'wx--lg', 2) — третий аргумент сдвигает фазу анимации. */

(function () {
  var DIR = (window.IK_BASE || '') + 'assets/img/weather/';

  function img(name, cls) {
    return '<img class="wx__' + cls + '" src="' + DIR + name + '.webp" alt="" draggable="false" decoding="async">';
  }
  function drops(n, cls) {
    var html = '';
    for (var i = 0; i < n; i++) html += '<i style="--i:' + i + '"></i>';
    return '<span class="wx__' + cls + '">' + html + '</span>';
  }
  var BOLT = '<svg class="wx__bolt" viewBox="0 0 24 40"><path d="M14 0 L3 22 H11 L7 40 L21 14 H13 L18 0Z"/></svg>';

  var TYPES = {
    sun: function () { return img('sun', 'sun'); },
    cloud: function () { return img('sun', 'sun') + img('cloud', 'cloud'); },
    clouds: function () { return img('cloud-dark', 'back') + img('cloud', 'cloud'); },
    rain: function () { return img('cloud-dark', 'cloud') + drops(6, 'rain'); },
    storm: function () { return img('cloud-dark', 'cloud') + BOLT + drops(4, 'rain'); },
    snow: function () { return img('cloud', 'cloud') + drops(7, 'snow'); },
    moon: function () { return img('moon', 'moon'); },
    'moon-cloud': function () { return img('moon', 'moon') + img('cloud', 'cloud'); }
  };

  function weather(type, cls, phase) {
    var t = TYPES[type] ? type : 'sun';
    return '<span class="wx wx--' + t + (cls ? ' ' + cls : '') + '"' +
      (phase ? ' style="--wx-phase:' + (-phase * 1.3).toFixed(1) + 's"' : '') +
      ' aria-hidden="true">' + TYPES[t]() + '</span>';
  }

  window.IKWeather = weather;
})();
