/* Иконки Phosphor (webfont, подключается в <head>).
   Использование: <i data-icon="home"></i> или IKIcon('home', 'i--sm', true) — третий аргумент даёт заливку. */

(function () {
  var MAP = {
    home: 'house', compass: 'compass', binoculars: 'binoculars', heart: 'heart',
    user: 'user', users: 'users', map: 'map-trifold', calendar: 'calendar-blank',
    paw: 'paw-print', sun: 'sun', cloud: 'cloud-sun', rain: 'cloud-rain', moon: 'moon',
    arrow: 'arrow-up-right', bookmark: 'bookmark-simple', phone: 'phone', mail: 'envelope-simple',
    message: 'chat-circle', check: 'check', x: 'x', clock: 'clock', star: 'star',
    shield: 'shield-check', tent: 'tent', plane: 'airplane-tilt', globe: 'globe-hemisphere-east',
    more: 'dots-three-vertical', plus: 'plus', menu: 'list', back: 'caret-left', route: 'path'
  };

  function icon(name, cls, fill) {
    return '<i class="' + (fill ? 'ph-fill' : 'ph') + ' ph-' + (MAP[name] || name) + ' i' +
      (cls ? ' ' + cls : '') + '" aria-hidden="true"></i>';
  }

  function hydrate(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(function (el) {
      el.outerHTML = icon(el.getAttribute('data-icon'), el.className, el.hasAttribute('data-fill'));
    });
  }

  window.IKIcon = icon;
  window.IKIconHydrate = hydrate;
  document.addEventListener('DOMContentLoaded', function () { hydrate(); });
})();
