/* Заставка при входе: анимированный логотип (assets/video/intro.mp4).
   Подключается сразу после <body>. Один раз за сессию, только на главной.
   Не показывается при prefers-reduced-motion. Кнопка «Пропустить»; если видео не загрузилось
   за 2.5 с, заставка закрывается сама. По окончании шлёт событие ik:intro-done. */

(function () {
  var KEY = 'ik:intro-seen';
  var BASE = window.IK_BASE || '';
  var done = false;

  function finish() {
    document.documentElement.classList.remove('ik-intro-lock');
    document.dispatchEvent(new CustomEvent('ik:intro-done'));
  }

  var skip = false;
  try { skip = sessionStorage.getItem(KEY) === '1'; sessionStorage.setItem(KEY, '1'); } catch (e) {}
  if (skip || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      /[?&]nointro\b/.test(location.search)) {
    return;
  }

  var t = window.IKI18N ? window.IKI18N.t : function (k) { return k; };
  var el = document.createElement('div');
  el.className = 'intro';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'İkonik Turizm');
  el.innerHTML =
    '<video class="intro__video" muted playsinline autoplay preload="auto" aria-hidden="true">' +
      '<source src="' + BASE + 'assets/video/intro.webm" type="video/webm">' +
      '<source src="' + BASE + 'assets/video/intro.mp4" type="video/mp4">' +
    '</video>' +
    '<button class="intro__skip" type="button">' + t('intro.skip') + '</button>';
  document.documentElement.classList.add('ik-intro-lock');
  document.body.insertBefore(el, document.body.firstChild);

  var video = el.querySelector('video');

  function close() {
    if (done) return;
    done = true;
    el.classList.add('is-leaving');
    setTimeout(function () { el.remove(); }, 700);
    finish();
  }

  el.querySelector('.intro__skip').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  video.addEventListener('ended', function () { setTimeout(close, 450); });
  video.addEventListener('error', close, true);

  // медленная сеть или автозапуск запрещён: не держим посетителя
  var started = false;
  video.addEventListener('playing', function () { started = true; el.classList.add('is-playing'); });
  setTimeout(function () { if (!started) close(); }, 2500);
  // страховка: закрыть через длительность видео + 2 с (или через 14 с, если длительность неизвестна)
  var hard = setTimeout(close, 14000);
  video.addEventListener('loadedmetadata', function () {
    if (isFinite(video.duration)) { clearTimeout(hard); hard = setTimeout(close, (video.duration + 2) * 1000); }
  });
  var p = video.play && video.play();
  if (p && p.catch) p.catch(close);
})();
