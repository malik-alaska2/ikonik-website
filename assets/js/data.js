/* Контент сайта: регионы, туры, впечатления.
   Цены и программы примерные, замените на реальные.
   Новый регион: добавьте объект в regions, тему в themes.css,
   диораму в assets/img и папку regions/<id>/ (скопируйте index.html любого региона). */

window.IKONIK = {
  config: {
    // Номер WhatsApp в международном формате без "+", например "905321234567".
    // Если заполнен, заявка дополнительно открывается в WhatsApp.
    whatsapp: '905411977002',
    phone: '+90 541 197 70 02',
    email: 'info@ikonik.travel',
    currency: '$',
    // реквизиты компании: подвал всех страниц и разметка для поисковиков
    company: {
      name: 'İKONİK TURİZM İNŞAAT PROJE ANONİM ŞİRKETİ',
      street: 'Sinanpaşa Mah., Süleyman Seba Cad.',
      building: 'No: 14, İç Kapı No: 5',
      city: 'Beşiktaş / İstanbul',
      maps: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Süleyman Seba Cad. No:14, Sinanpaşa, Beşiktaş, İstanbul')
    }
  },

  regions: [
    /* ================= КЕНИЯ ================= */
    {
      id: 'kenya',
      name: 'Кения',
      countries: 'Масаи-Мара, Амбосели, Накуру',
      status: 'live',
      url: 'regions/kenya/index.html',
      art: 'assets/img/kenya-diorama.webp', artFit: 'cutout',
      text: 'Золотая саванна Масаи-Мара, слоны у подножия Килиманджаро и лоджи посреди заповедника.',
      page: {
        hello: 'Джамбо, путешественник',
        lead: 'Сафари в Кении: лоджи посреди саванны, гиды-рейнджеры и Большая пятёрка совсем рядом.',
        artAlt: 'Саванна Кении: шатровый лодж на скале, жирафы, слоны в реке и сафари-джип на грунтовой дороге',
        featured: 'mara-classic',
        climate: {
          now: '27°', label: 'Сухой сезон, днём', aria: 'Средняя дневная температура в Масаи-Мара',
          months: [['Июн', 'sun', '25°'], ['Июл', 'sun', '24°'], ['Авг', 'sun', '25°'], ['Сен', 'sun', '27°'], ['Окт', 'cloud', '27°']]
        },
        map: {
          title: 'Масаи-Мара и Амбосели',
          img: 'assets/img/maps/kenya.webp',
          svg: '<text x=\'274.7\' y=\'22.0\' text-anchor=\'middle\'>КЕНИЯ</text><text x=\'133.3\' y=\'198.0\' text-anchor=\'middle\'>ТАНЗАНИЯ</text><text x=\'50.7\' y=\'59.3\' text-anchor=\'middle\'>ОЗ. ВИКТОРИЯ</text>',
          routes: ['M92.8 109.5 Q 139.5 120.3 182.4 98.8', 'M182.4 98.8 Q 171.6 66.9 142.9 49.2', 'M182.4 98.8 Q 181.1 139.3 205.9 171.4'],
          pins: [
            { name: 'Найроби, прилёт', x: 57.0, y: 44.9, home: true },
            { name: 'Озеро Накуру', x: 44.7, y: 22.4, icon: 'bird', tour: 'kenya-grand' },
            { name: 'Масаи-Мара', x: 29.0, y: 49.8, icon: 'paw', tour: 'mara-classic' },
            { name: 'Амбосели', x: 64.3, y: 77.9, icon: 'binoculars', tour: 'amboseli' }
          ]
        },
        tip: { when: 'С июля по октябрь', text: 'Сухо, звери держатся у воды, идёт Великая миграция.' },
        toursTitle: 'Сафари в Кении',
        toursLead: 'Цена за человека при двухместном размещении: лодж, питание, выезды на джипе и гид. Перелёт подберём отдельно.',
        filters: [{ label: 'До 5 дней', max: 5 }, { label: 'От 6 дней', min: 6 }],
        route: {
          title: 'Как проходит сафари',
          lead: 'На примере тура «Масаи-Мара», 4 дня. Остальные программы устроены так же, меняются парки и число дней.',
          days: [
            ['Найроби и Масаи-Мара', 'Перелёт 45 минут на маленьком самолёте или 5 часов на джипе. Заселение в лодж, первый выезд на закате.'],
            ['Весь день в заповеднике', 'Выезд на рассвете, когда хищники активнее всего. Обед-пикник в буше, поиск Большой пятёрки.'],
            ['Река Мара и деревня масаи', 'В сезон можно увидеть переправы антилоп гну. Днём визит в деревню масаи, вечером ужин у костра.'],
            ['Рассвет и возвращение', 'По желанию полёт на воздушном шаре с завтраком в саванне. После обеда трансфер в Найроби.']
          ]
        },
        season: {
          months: ['good', 'good', 'ok', 'low', 'low', 'ok', 'best', 'best', 'best', 'best', 'ok', 'good'],
          legend: { best: 'Миграция и сухой сезон', good: 'Хорошее время, меньше туристов', ok: 'Короткие дожди', low: 'Сезон дождей, цены ниже' }
        },
        included: {
          items: ['Лоджи или шатровые лагеря', 'Питание по программе, вода в джипе', 'Выезды на джипе с люком для съёмки', 'Русскоговорящий координатор и гид-рейнджер', 'Входные билеты в парки'],
          note: 'Отдельно: международный перелёт, электронная виза, чаевые гидам.'
        },
        cta: { title: 'Соберём сафари под вас', text: 'Расскажите, когда и с кем хотите поехать. Подберём парки, лоджи и перелёт и пришлём программу с ценой.' }
      }
    },

    /* ================= ТАНЗАНИЯ ================= */
    {
      id: 'tanzania',
      name: 'Танзания',
      countries: 'Серенгети, Нгоронгоро, Занзибар',
      status: 'live',
      url: 'regions/tanzania/index.html',
      art: 'assets/img/tanzania-diorama.webp', artFit: 'cutout',
      text: 'Великая миграция в Серенгети, кратер Нгоронгоро, Килиманджаро и белый песок Занзибара.',
      page: {
        hello: 'Карибу, путешественник',
        lead: 'Танзания: миллионы антилоп гну в Серенгети, кратер Нгоронгоро и пляжи Занзибара в одной поездке.',
        artAlt: 'Серенгети: лодж на сваях с соломенной крышей, антилопы гну переходят реку, зебры и бирюзовый сафари-джип, за ними заснеженный Килиманджаро',
        featured: 'serengeti',
        climate: {
          now: '27°', label: 'Сухой сезон, днём', aria: 'Средняя дневная температура в Серенгети',
          months: [['Июн', 'sun', '26°'], ['Июл', 'cloud', '26°'], ['Авг', 'sun', '27°'], ['Сен', 'sun', '28°'], ['Окт', 'sun', '29°']]
        },
        map: {
          title: 'Серенгети и Занзибар',
          img: 'assets/img/maps/tanzania.webp',
          svg: '<text x=\'224.9\' y=\'21.1\' text-anchor=\'middle\'>КЕНИЯ</text><text x=\'103.8\' y=\'155.5\' text-anchor=\'middle\'>ТАНЗАНИЯ</text><text x=\'298.4\' y=\'138.2\' text-anchor=\'middle\'>ОКЕАН</text>',
          routes: ['M70.5 26.7 Q 78.2 50.8 99.5 64.5', 'M99.5 64.5 Q 123.7 77.3 150.5 71.8', 'M150.5 71.8 Q 167.3 70.5 179.5 58.8', 'M150.5 71.8 Q 183.2 151.9 259.5 192.8'],
          pins: [
            { name: 'Аруша, прилёт', x: 47.0, y: 32.6, home: true },
            { name: 'Килиманджаро', x: 56.1, y: 26.7, icon: 'mountains', tour: 'kili' },
            { name: 'Серенгети', x: 22.0, y: 12.1, icon: 'binoculars', tour: 'serengeti' },
            { name: 'Нгоронгоро', x: 31.1, y: 29.3, icon: 'paw', tour: 'serengeti-ngoro' },
            { name: 'Занзибар', x: 81.1, y: 87.6, icon: 'island', tour: 'zanzibar' }
          ]
        },
        tip: { when: 'С июня по октябрь', text: 'Сухой сезон и Великая миграция: звери у воды, дороги проходимы.' },
        toursTitle: 'Туры по Танзании',
        toursLead: 'Цена за человека при двухместном размещении: лоджи, питание, выезды на джипе и гид. Перелёт подберём отдельно.',
        filters: [{ label: 'Сафари', tag: 'safari' }, { label: 'С пляжем', tag: 'beach' }, { label: 'Восхождение', tag: 'trek' }],
        route: {
          title: 'Как проходит сафари',
          lead: 'На примере тура «Серенгети», 4 дня. В других программах добавляются Тарангире, Занзибар или восхождение.',
          days: [
            ['Аруша и Серенгети', 'Перелёт около часа на маленьком самолёте прямо в саванну. Заселение в лодж, выезд на закате.'],
            ['Долина Серонера', 'Самое богатое на хищников место парка: львы на скалах-копье, леопарды на акациях.'],
            ['За миграцией', 'Гид везёт туда, где сейчас стада. Утром по желанию полёт на воздушном шаре.'],
            ['Возвращение в Арушу', 'Последний рассветный выезд и обратный перелёт. Можно продлить поездку пляжем на Занзибаре.']
          ]
        },
        season: {
          months: ['good', 'good', 'ok', 'low', 'low', 'best', 'best', 'best', 'best', 'best', 'ok', 'good'],
          legend: { best: 'Сухой сезон и миграция', good: 'Отёл антилоп гну на юге Серенгети', ok: 'Короткие дожди', low: 'Сезон длинных дождей' }
        },
        included: {
          items: ['Лоджи и палаточные лагеря у миграции', 'Полный пансион на сафари', 'Внутренние перелёты по программе', 'Русскоговорящий координатор и гид-рейнджер', 'Сборы национальных парков'],
          note: 'Отдельно: международный перелёт, виза по прилёту, чаевые гидам.'
        },
        cta: { title: 'Соберём поездку по Танзании', text: 'Сафари, восхождение или пляж: расскажите, что хотите увидеть. Подберём маршрут и пришлём программу с ценой.' }
      }
    },

    /* ================= АРАБСКИЕ СТРАНЫ ================= */
    {
      id: 'arabia',
      name: 'Арабские страны',
      countries: 'ОАЭ, Оман, Саудовская Аравия',
      status: 'live',
      url: 'regions/arabia/index.html',
      art: 'assets/img/arabia-diorama.webp', artFit: 'cutout',
      text: 'Дюны Руб-эль-Хали, ночь в бедуинском лагере, пески Вахиба в Омане и древняя Хегра.',
      page: {
        hello: 'Мархаба, путешественник',
        lead: 'Пустыни Аравии: джип по дюнам, ужин в бедуинском лагере и ночь под звёздами, а днём города Залива.',
        artAlt: 'Аравийская пустыня: оранжевые дюны, бедуинский лагерь с шатром, караван верблюдов, оазис с финиковыми пальмами и внедорожник',
        featured: 'desert-dubai',
        climate: {
          now: '25°', label: 'Зимний сезон, днём', aria: 'Средняя дневная температура в Дубае',
          months: [['Ноя', 'sun', '30°'], ['Дек', 'sun', '26°'], ['Янв', 'sun', '24°'], ['Фев', 'cloud', '25°'], ['Мар', 'sun', '28°']]
        },
        map: {
          title: 'ОАЭ, Оман и АльУла',
          img: 'assets/img/maps/arabia.webp',
          svg: '<text x=\'120.0\' y=\'134.8\' text-anchor=\'middle\'>САУДОВСКАЯ АРАВИЯ</text><text x=\'218.7\' y=\'102.7\' text-anchor=\'middle\'>ОАЭ</text><text x=\'262.7\' y=\'162.5\' text-anchor=\'middle\'>ОМАН</text><text x=\'52.0\' y=\'164.0\' text-anchor=\'middle\'>КРАСНОЕ МОРЕ</text>',
          routes: ['M250.3 92.5 Q 235.0 104.3 230.7 123.1', 'M250.3 92.5 Q 266.9 111.8 292.0 116.0', 'M250.3 92.5 Q 138.2 40.6 18.7 72.1'],
          pins: [
            { name: 'Дубай, прилёт', x: 78.2, y: 42.0, home: true },
            { name: 'Оазис Лива', x: 72.1, y: 56.0, icon: 'sun-horizon', tour: 'liwa' },
            { name: 'Маскат', x: 91.2, y: 52.7, icon: 'sailboat', tour: 'oman' },
            { name: 'АльУла', x: 5.8, y: 32.8, icon: 'compass-rose', tour: 'alula' }
          ]
        },
        tip: { when: 'С ноября по март', text: 'Днём около +25°, ночи в пустыне прохладные и звёздные.' },
        toursTitle: 'Туры по Аравии',
        toursLead: 'Цена за человека при двухместном размещении: отели, ночь в пустыне, трансферы и экскурсии. Перелёт подберём отдельно.',
        filters: [{ label: 'ОАЭ', country: 'uae' }, { label: 'Оман', country: 'oman' }, { label: 'Саудовская Аравия', country: 'saudi' }],
        route: {
          title: 'Как проходит поездка',
          lead: 'На примере тура «Дубай и ночь в пустыне», 4 дня. Остальные программы добавляют Оман, Абу-Даби или АльУлу.',
          days: [
            ['Прилёт в Дубай', 'Трансфер в отель у моря. Вечером прогулка по набережной и ужин.'],
            ['Старый Дубай', 'Квартал Аль-Фахиди, переправа на лодке-абре через залив, рынки специй и золота.'],
            ['Ночь в пустыне', 'Джип по дюнам, закат на гребне, ужин в бедуинском лагере и ночёвка в шатре под звёздами.'],
            ['Рассвет и вылет', 'По желанию полёт на воздушном шаре над дюнами. Затем трансфер в аэропорт.']
          ]
        },
        season: {
          months: ['best', 'best', 'best', 'good', 'ok', 'low', 'low', 'low', 'ok', 'good', 'best', 'best'],
          legend: { best: 'Мягкая зима, лучшее время', good: 'Тепло, ещё комфортно', ok: 'Жарко днём', low: 'Сильная жара, от +40°' }
        },
        included: {
          items: ['Отели 4 и 5 звёзд в городах', 'Ночь в пустынном лагере с ужином', 'Трансферы и джип-сафари с водителем', 'Русскоговорящий гид на экскурсиях', 'Входные билеты по программе'],
          note: 'Отдельно: международный перелёт, виза для Саудовской Аравии, чаевые.'
        },
        cta: { title: 'Соберём поездку в пустыню', text: 'Расскажите, когда и с кем хотите поехать. Подберём отели, ночь в пустыне и перелёт и пришлём программу с ценой.' }
      }
    },

    /* ================= ТУРЦИЯ ================= */
    {
      id: 'turkey',
      name: 'Турция',
      countries: 'Стамбул, Каппадокия, Анталия',
      status: 'live',
      url: 'regions/turkey/index.html',
      art: 'assets/img/turkey-diorama.webp', artFit: 'cutout',
      text: 'Рассвет на воздушном шаре над Каппадокией, Босфор и старый Стамбул, бирюзовое побережье Анталии.',
      page: {
        hello: 'Хош гельдин, путешественник',
        lead: 'Турция: шары над Каппадокией на рассвете, мечети и базары Стамбула, античный Эфес и тёплое море.',
        artAlt: 'Каппадокия: скалы-дымоходы с пещерным отелем, воздушные шары над долиной, виноградники и извилистая дорога',
        featured: 'istanbul-cappadocia',
        climate: {
          now: '24°', icon: 'sun', label: 'Конец весны, днём', aria: 'Средняя дневная температура в Каппадокии',
          months: [['Апр', 'rain', '17°'], ['Май', 'cloud', '22°'], ['Июн', 'sun', '27°'], ['Июл', 'sun', '31°'], ['Авг', 'sun', '30°']]
        },
        map: {
          title: 'Стамбул, Каппадокия, побережье',
          img: 'assets/img/maps/turkey.webp',
          svg: '<text x=\'203.6\' y=\'10.9\' text-anchor=\'middle\'>ЧЁРНОЕ МОРЕ</text><text x=\'221.1\' y=\'209.1\' text-anchor=\'middle\'>СРЕДИЗЕМНОЕ МОРЕ</text>',
          routes: ['M98.3 31.1 Q 167.5 106.0 268.5 119.7', 'M98.3 31.1 Q 53.8 79.9 50.6 145.9', 'M50.6 145.9 Q 76.4 155.6 102.4 146.6', 'M102.4 146.6 Q 118.5 174.0 148.4 184.8'],
          pins: [
            { name: 'Стамбул, прилёт', x: 30.7, y: 14.1, home: true },
            { name: 'Каппадокия', x: 83.9, y: 54.4, icon: 'balloon', tour: 'cappadocia' },
            { name: 'Эфес', x: 15.8, y: 66.3, icon: 'columns', tour: 'aegean' },
            { name: 'Памуккале', x: 32.0, y: 66.6, icon: 'drop', tour: 'aegean' },
            { name: 'Анталия', x: 46.4, y: 84.0, icon: 'island', tour: 'antalya' }
          ]
        },
        tip: { when: 'Май, июнь, сентябрь', text: 'Тепло без жары, шары над Каппадокией летают почти каждое утро.' },
        toursTitle: 'Туры по Турции',
        toursLead: 'Цена за человека при двухместном размещении: отели, завтраки, внутренние перелёты и экскурсии. Международный перелёт подберём отдельно.',
        filters: [{ label: 'Каппадокия', tag: 'cappadocia' }, { label: 'Стамбул', tag: 'istanbul' }, { label: 'Побережье', tag: 'coast' }],
        route: {
          title: 'Как проходит поездка',
          lead: 'На примере тура «Стамбул и Каппадокия», 6 дней. В других программах добавляются Эфес, Памуккале или море.',
          days: [
            ['Прилёт в Стамбул', 'Трансфер в отель в старом городе. Вечером прогулка по Султанахмету и ужин с видом на Босфор.'],
            ['Старый Стамбул', 'Айя-София, Голубая мечеть, Цистерна Базилика и Гранд-базар с гидом.'],
            ['Босфор', 'Прогулка на кораблике между Европой и Азией, затем квартал Балат и Галатская башня.'],
            ['Перелёт в Каппадокию', 'Час в самолёте, заселение в пещерный отель. Закат над Розовой долиной.'],
            ['Шары и долины', 'Полёт на воздушном шаре на рассвете, подземный город и музей под открытым небом в Гёреме.'],
            ['Возвращение', 'Свободное утро и перелёт через Стамбул домой.']
          ]
        },
        season: {
          months: ['low', 'low', 'ok', 'good', 'best', 'best', 'good', 'good', 'best', 'best', 'ok', 'low'],
          legend: { best: 'Тепло, шары летают почти каждый день', good: 'Жаркое лето, сезон на море', ok: 'Прохладно, мало туристов', low: 'Зима, снег в Каппадокии' }
        },
        included: {
          items: ['Отели 4 звезды и пещерный отель в Каппадокии', 'Завтраки, ужин на Босфоре', 'Внутренний перелёт Стамбул - Каппадокия', 'Русскоговорящий гид на экскурсиях', 'Входные билеты по программе'],
          note: 'Отдельно: международный перелёт, полёт на шаре (можно добавить в заявке), чаевые.'
        },
        cta: { title: 'Соберём поездку по Турции', text: 'Город, шары или море: расскажите, что хотите увидеть. Подберём отели и перелёты и пришлём программу с ценой.' }
      }
    },

    /* ================= ЕВРОПА ================= */
    {
      id: 'europe',
      name: 'Европа',
      countries: 'Италия, Франция, Швейцария',
      status: 'live',
      url: 'regions/europe/index.html',
      art: 'assets/img/europe-diorama.webp', artFit: 'cutout',
      text: 'Альпийские озёра и красный поезд Швейцарии, виноградники Тосканы, лаванда Прованса и Париж.',
      page: {
        hello: 'Чао, путешественник',
        lead: 'Европа без спешки: озеро Комо и Альпы, вино Тосканы, лаванда Прованса и вечерний Париж.',
        artAlt: 'Альпийское озеро у заснеженной горы, итальянская деревня с черепичными крышами, лодка, красный поезд на каменном виадуке, кипарисы и лавандовое поле',
        featured: 'lakes-alps',
        climate: {
          now: '28°', icon: 'cloud', label: 'Лето в Тоскане, днём', aria: 'Средняя дневная температура во Флоренции',
          months: [['Май', 'cloud', '24°'], ['Июн', 'sun', '28°'], ['Июл', 'sun', '32°'], ['Авг', 'storm', '31°'], ['Сен', 'cloud', '27°']]
        },
        map: {
          title: 'Италия, Франция, Швейцария',
          img: 'assets/img/maps/europe.webp',
          svg: '<text x=\'83.7\' y=\'67.7\' text-anchor=\'middle\'>ФРАНЦИЯ</text><text x=\'165.6\' y=\'45.2\' text-anchor=\'middle\'>ШВЕЙЦАРИЯ</text><text x=\'283.7\' y=\'177.4\' text-anchor=\'middle\'>ИТАЛИЯ</text><text x=\'152.6\' y=\'192.0\' text-anchor=\'middle\'>СРЕДИЗЕМНОЕ МОРЕ</text>',
          routes: ['M73.5 15.8 Q 119.4 60.5 183.3 65.6', 'M183.3 65.6 Q 184.8 88.8 200.7 105.8', 'M200.7 105.8 Q 229.9 116.6 259.2 106.3', 'M200.7 105.8 Q 210.5 141.3 240.6 162.4', 'M240.6 162.4 Q 244.7 185.1 262.3 199.9', 'M200.7 105.8 Q 163.1 116.5 141.0 148.6'],
          pins: [
            { name: 'Милан, прилёт', x: 62.7, y: 48.1, home: true },
            { name: 'Венеция', x: 81.0, y: 48.3, icon: 'boat', tour: 'venice-como' },
            { name: 'Швейцарские Альпы', x: 57.3, y: 29.8, icon: 'mountains', tour: 'swiss-grand' },
            { name: 'Париж', x: 23.0, y: 7.2, icon: 'buildings', tour: 'provence-paris' },
            { name: 'Прованс', x: 44.1, y: 67.5, icon: 'flower', tour: 'provence-paris' },
            { name: 'Тоскана', x: 75.2, y: 73.8, icon: 'wine', tour: 'tuscany' },
            { name: 'Рим', x: 82.0, y: 90.9, icon: 'columns', tour: 'tuscany' }
          ]
        },
        tip: { when: 'Май, июнь, сентябрь', text: 'Тепло, лаванда цветёт в конце июня, а очередей в музеях меньше, чем в августе.' },
        toursTitle: 'Туры по Европе',
        toursLead: 'Цена за человека при двухместном размещении: отели, завтраки, поезда и экскурсии. Перелёт и визу подберём отдельно.',
        filters: [{ label: 'Италия', country: 'italy' }, { label: 'Франция', country: 'france' }, { label: 'Швейцария', country: 'swiss' }],
        route: {
          title: 'Как проходит поездка',
          lead: 'На примере тура «Озёра и Альпы», 5 дней. Остальные программы добавляют Тоскану, Рим, Прованс или Париж.',
          days: [
            ['Милан и озеро Комо', 'Встреча в аэропорту, переезд на озеро. Вечером прогулка по Белладжо и ужин у воды.'],
            ['Озеро на лодке', 'Виллы Карлотта и Бальбьянелло с воды, обед в рыбном ресторане в Варенне.'],
            ['Красный поезд Бернина', 'Панорамный поезд через ледники и каменные виадуки из Тирано в Санкт-Мориц.'],
            ['Альпы и Люцерн', 'Подъём на гору Пилатус, вечер в старом Люцерне у Капельного моста.'],
            ['Цюрих и вылет', 'Свободное утро в Цюрихе и трансфер в аэропорт.']
          ]
        },
        season: {
          months: ['low', 'low', 'ok', 'good', 'best', 'best', 'good', 'good', 'best', 'good', 'low', 'ok'],
          legend: { best: 'Тепло и меньше туристов', good: 'Высокий сезон, бронируйте заранее', ok: 'Прохладно, рождественские ярмарки', low: 'Зима, часть маршрутов закрыта' }
        },
        included: {
          items: ['Отели 4 звезды в центре городов', 'Завтраки, ужин-дегустация в Тоскане', 'Поезда и трансферы по программе', 'Русскоговорящий гид на экскурсиях', 'Входные билеты по программе'],
          note: 'Отдельно: международный перелёт, шенгенская виза, туристический налог в отелях.'
        },
        cta: { title: 'Соберём поездку по Европе', text: 'Одна страна или три: расскажите, что хотите увидеть. Подберём отели, поезда и перелёт и пришлём программу с ценой.' }
      }
    }
  ],

  tours: [
    /* Кения */
    { id: 'mara-classic', region: 'kenya', pass: 'Safari pass', title: 'Масаи-Мара', place: 'Кения', days: 4, price: 1890, featured: true,
      stats: [{ icon: 'calendar', value: '4 дня', label: 'Программа' }, { icon: 'paw', value: 'Большая пятёрка', label: 'Звери' }, { icon: 'user', value: 'Гид', label: 'Включён' }],
      text: 'Три выезда в заповеднике, ночи в шатровом лодже, трансфер из Найроби.' },
    { id: 'mara-migration', region: 'kenya', pass: 'Safari pass', title: 'Миграция в Масаи-Мара', place: 'Кения, июль-октябрь', days: 6, price: 2980,
      stats: [{ icon: 'calendar', value: '6 дней', label: 'Программа' }, { icon: 'binoculars', value: 'Переправы', label: 'Река Мара' }, { icon: 'tent', value: 'Лагерь', label: 'У реки' }],
      text: 'Лагерь у реки Мара, чтобы не пропустить переправы антилоп гну. Места в сезон бронируют заранее.' },
    { id: 'amboseli', region: 'kenya', pass: 'Safari pass', title: 'Амбосели', place: 'Кения', days: 5, price: 2290,
      stats: [{ icon: 'calendar', value: '5 дней', label: 'Программа' }, { icon: 'paw', value: 'Слоны', label: 'Крупные стада' }, { icon: 'user', value: 'Гид', label: 'Включён' }],
      text: 'Стада слонов на фоне заснеженной вершины Килиманджаро и озеро Найваша.' },
    { id: 'kenya-grand', region: 'kenya', pass: 'Safari pass', title: 'Большое кольцо Кении', place: 'Накуру, Мара, Амбосели', days: 8, price: 3650,
      stats: [{ icon: 'calendar', value: '8 дней', label: 'Программа' }, { icon: 'bird', value: 'Фламинго', label: 'Озеро Накуру' }, { icon: 'tent', value: 'Лоджи', label: 'Всё включено' }],
      text: 'Три главных парка страны: розовые фламинго на Накуру, Масаи-Мара и слоны Амбосели.' },
    { id: 'family', region: 'kenya', pass: 'Family pass', title: 'Семейное мини-сафари', place: 'Кения', days: 3, price: 1240,
      stats: [{ icon: 'calendar', value: '3 дня', label: 'Программа' }, { icon: 'users', value: 'С детьми', label: 'От 5 лет' }, { icon: 'shield', value: 'Лодж', label: 'С бассейном' }],
      text: 'Короткие выезды без утомительных переездов, лодж с бассейном и приют для слонят в Найроби.' },

    /* Танзания */
    { id: 'serengeti', region: 'tanzania', tag: 'safari', pass: 'Safari pass', title: 'Серенгети', place: 'Танзания', days: 4, price: 2390, featured: true,
      stats: [{ icon: 'calendar', value: '4 дня', label: 'Программа' }, { icon: 'paw', value: 'Большая пятёрка', label: 'Звери' }, { icon: 'user', value: 'Гид', label: 'Включён' }],
      text: 'Перелёт прямо в саванну, долина Серонера и выезды туда, где сейчас идут стада.' },
    { id: 'serengeti-ngoro', region: 'tanzania', tag: 'safari', pass: 'Safari pass', title: 'Серенгети и Нгоронгоро', place: 'Танзания', days: 7, price: 3790, featured: true,
      stats: [{ icon: 'calendar', value: '7 дней', label: 'Программа' }, { icon: 'binoculars', value: 'Кратер', label: 'Нгоронгоро' }, { icon: 'tent', value: 'Лоджи', label: 'Полный пансион' }],
      text: 'Бескрайняя Серенгети и кратер Нгоронгоро, где на 260 км² собраны почти все звери Африки.' },
    { id: 'migration-north', region: 'tanzania', tag: 'safari', pass: 'Safari pass', title: 'Миграция на севере', place: 'Северная Серенгети', days: 6, price: 3450,
      stats: [{ icon: 'calendar', value: '6 дней', label: 'Программа' }, { icon: 'binoculars', value: 'Переправы', label: 'Река Мара' }, { icon: 'tent', value: 'Лагерь', label: 'Мобильный' }],
      text: 'С июля по октябрь: мобильный лагерь у реки Мара и переправы антилоп гну.' },
    { id: 'zanzibar', region: 'tanzania', tag: 'beach', pass: 'Safari + beach', title: 'Сафари и Занзибар', place: 'Танзания', days: 10, price: 3990,
      stats: [{ icon: 'calendar', value: '10 дней', label: 'Программа' }, { icon: 'island', value: 'Пляж', label: '4 ночи' }, { icon: 'plane', value: 'Перелёт', label: 'Внутренний' }],
      text: 'Шесть дней в парках, затем четыре дня на белом песке Занзибара.' },
    { id: 'kili', region: 'tanzania', tag: 'trek', pass: 'Summit pass', title: 'Килиманджаро', place: 'Маршрут Мачаме', days: 7, price: 2650,
      stats: [{ icon: 'calendar', value: '7 дней', label: 'Программа' }, { icon: 'mountains', value: '5895 м', label: 'Пик Ухуру' }, { icon: 'users', value: 'Носильщики', label: 'Включены' }],
      text: 'Восхождение на высшую точку Африки с акклиматизацией, палатками и командой носильщиков.' },

    /* Арабские страны */
    { id: 'desert-dubai', region: 'arabia', country: 'uae', pass: 'Desert pass', title: 'Дубай и пустыня', place: 'ОАЭ', days: 4, price: 1290, featured: true,
      stats: [{ icon: 'calendar', value: '4 дня', label: 'Программа' }, { icon: 'tent', value: 'Ночь', label: 'В лагере' }, { icon: 'user', value: 'Гид', label: 'Включён' }],
      text: 'Старый Дубай, джип по дюнам и ночь в бедуинском лагере под звёздами.' },
    { id: 'liwa', region: 'arabia', country: 'uae', pass: 'Desert pass', title: 'Абу-Даби и оазис Лива', place: 'ОАЭ', days: 5, price: 1680,
      stats: [{ icon: 'calendar', value: '5 дней', label: 'Программа' }, { icon: 'sun-horizon', value: 'Руб-эль-Хали', label: 'Дюны до 300 м' }, { icon: 'mosque', value: 'Мечеть', label: 'Шейха Зайда' }],
      text: 'Мечеть шейха Зайда, затем два дня на краю Пустой четверти, крупнейшей песчаной пустыни мира.' },
    { id: 'oman', region: 'arabia', country: 'oman', pass: 'Desert pass', title: 'Маскат и пески Вахиба', place: 'Оман', days: 6, price: 1940,
      stats: [{ icon: 'calendar', value: '6 дней', label: 'Программа' }, { icon: 'drop', value: 'Вади', label: 'Купание' }, { icon: 'tent', value: 'Лагерь', label: 'В песках' }],
      text: 'Старый Маскат, купание в изумрудных вади и ночь в лагере среди красных песков Вахиба.' },
    { id: 'alula', region: 'arabia', country: 'saudi', pass: 'Desert pass', title: 'АльУла и Хегра', place: 'Саудовская Аравия', days: 4, price: 2150,
      stats: [{ icon: 'calendar', value: '4 дня', label: 'Программа' }, { icon: 'compass-rose', value: 'Хегра', label: 'Наследие ЮНЕСКО' }, { icon: 'user', value: 'Гид', label: 'Включён' }],
      text: 'Набатейские гробницы Хегры, скалы-арки и оазис АльУла. Внутренний перелёт из Эр-Рияда.' },
    { id: 'gulf-grand', region: 'arabia', country: 'oman', pass: 'Desert pass', title: 'ОАЭ и Оман за неделю', place: 'ОАЭ, Оман', days: 8, price: 2690,
      stats: [{ icon: 'calendar', value: '8 дней', label: 'Программа' }, { icon: 'sailboat', value: 'Мусандам', label: 'Фьорды' }, { icon: 'tent', value: '2 ночи', label: 'В пустыне' }],
      text: 'Дубай, морские фьорды Мусандама на лодке-дау, Маскат и две ночи в пустыне.' },

    /* Турция */
    { id: 'istanbul-cappadocia', region: 'turkey', tag: 'cappadocia', pass: 'Anatolia pass', title: 'Стамбул и Каппадокия', place: 'Турция', days: 6, price: 1190,
      stats: [{ icon: 'calendar', value: '6 дней', label: 'Программа' }, { icon: 'balloon', value: 'Шары', label: 'На рассвете' }, { icon: 'plane', value: 'Перелёт', label: 'Внутренний' }],
      text: 'Три дня в старом Стамбуле и на Босфоре, затем пещерный отель и долины Каппадокии.' },
    { id: 'cappadocia', region: 'turkey', tag: 'cappadocia', pass: 'Anatolia pass', title: 'Каппадокия', place: 'Гёреме, Учхисар', days: 3, price: 590,
      stats: [{ icon: 'calendar', value: '3 дня', label: 'Программа' }, { icon: 'bed', value: 'Пещерный', label: 'Отель' }, { icon: 'user', value: 'Гид', label: 'Включён' }],
      text: 'Ночи в пещерном отеле, долины на джипе и верхом, подземный город Деринкую.' },
    { id: 'istanbul', region: 'turkey', tag: 'istanbul', pass: 'Anatolia pass', title: 'Стамбул за 4 дня', place: 'Турция', days: 4, price: 640,
      stats: [{ icon: 'calendar', value: '4 дня', label: 'Программа' }, { icon: 'mosque', value: 'Айя-София', label: 'Без очереди' }, { icon: 'boat', value: 'Босфор', label: 'Прогулка' }],
      text: 'Султанахмет, базары, Босфор на кораблике и вечерний Галата. Отель в старом городе.' },
    { id: 'aegean', region: 'turkey', tag: 'coast', pass: 'Anatolia pass', title: 'Эфес и Памуккале', place: 'Эгейское побережье', days: 4, price: 720,
      stats: [{ icon: 'calendar', value: '4 дня', label: 'Программа' }, { icon: 'columns', value: 'Эфес', label: 'Античный город' }, { icon: 'drop', value: 'Травертины', label: 'Памуккале' }],
      text: 'Античный Эфес и дом Девы Марии, белые травертины и купание в бассейне Клеопатры.' },
    { id: 'antalya', region: 'turkey', tag: 'coast', pass: 'Anatolia pass', title: 'Анталия и Ликийская тропа', place: 'Средиземноморье', days: 7, price: 980,
      stats: [{ icon: 'calendar', value: '7 дней', label: 'Программа' }, { icon: 'footprints', value: 'Тропа', label: 'Лёгкие участки' }, { icon: 'island', value: 'Море', label: '3 дня' }],
      text: 'Старый город Калеичи, прогулки по Ликийской тропе над бухтами и три дня на море.' },

    /* Европа */
    { id: 'lakes-alps', region: 'europe', country: 'swiss', pass: 'Europe pass', title: 'Озёра и Альпы', place: 'Италия, Швейцария', days: 5, price: 1690,
      stats: [{ icon: 'calendar', value: '5 дней', label: 'Программа' }, { icon: 'train', value: 'Бернина', label: 'Панорамный поезд' }, { icon: 'mountains', value: 'Пилатус', label: 'Подъём' }],
      text: 'Озеро Комо, красный поезд через ледники в Санкт-Мориц и вечерний Люцерн.' },
    { id: 'tuscany', region: 'europe', country: 'italy', pass: 'Europe pass', title: 'Тоскана и Рим', place: 'Италия', days: 6, price: 1490,
      stats: [{ icon: 'calendar', value: '6 дней', label: 'Программа' }, { icon: 'wine', value: 'Кьянти', label: 'Дегустация' }, { icon: 'columns', value: 'Колизей', label: 'Без очереди' }],
      text: 'Флоренция, винодельни Кьянти, Сиена и три дня в Риме с гидом.' },
    { id: 'venice-como', region: 'europe', country: 'italy', pass: 'Europe pass', title: 'Венеция и озеро Комо', place: 'Италия', days: 5, price: 1350,
      stats: [{ icon: 'calendar', value: '5 дней', label: 'Программа' }, { icon: 'boat', value: 'Гондола', label: 'Включена' }, { icon: 'sailboat', value: 'Комо', label: 'По озеру' }],
      text: 'Каналы Венеции и острова Мурано и Бурано, затем виллы и городки на озере Комо.' },
    { id: 'provence-paris', region: 'europe', country: 'france', pass: 'Europe pass', title: 'Париж и Прованс', place: 'Франция', days: 7, price: 1890,
      stats: [{ icon: 'calendar', value: '7 дней', label: 'Программа' }, { icon: 'flower', value: 'Лаванда', label: 'Июнь, июль' }, { icon: 'train', value: 'TGV', label: 'Скоростной поезд' }],
      text: 'Три дня в Париже, скоростной поезд на юг, лавандовые поля Валансоля и деревни Люберона.' },
    { id: 'swiss-grand', region: 'europe', country: 'swiss', pass: 'Europe pass', title: 'Большое кольцо Швейцарии', place: 'Швейцария', days: 8, price: 2790,
      stats: [{ icon: 'calendar', value: '8 дней', label: 'Программа' }, { icon: 'train', value: 'Glacier Express', label: 'Поезд' }, { icon: 'mountains', value: 'Маттерхорн', label: 'Церматт' }],
      text: 'Цюрих, Люцерн, Интерлакен и Церматт. Между ними самые красивые поезда Альп.' }
  ],

  extras: [
    /* Кения */
    { id: 'ke-drive', region: 'kenya', icon: 'jeep', title: 'Сафари-выезд на рассвете', time: '3-4 часа', price: 95 },
    { id: 'ke-balloon', region: 'kenya', icon: 'balloon', title: 'Шар над Масаи-Мара', time: '1 час и завтрак', price: 480 },
    { id: 'ke-village', region: 'kenya', icon: 'users-three', title: 'Деревня масаи', time: '2-3 часа', price: 40 },
    { id: 'ke-night', region: 'kenya', icon: 'moon-stars', tone: 'night', title: 'Ночное сафари', time: '2 часа', price: 120 },
    { id: 'ke-dinner', region: 'kenya', icon: 'campfire', tone: 'night', title: 'Ужин в буше у костра', time: 'Вечер', price: 150 },
    { id: 'ke-walk', region: 'kenya', icon: 'footprints', title: 'Пешее сафари с рейнджером', time: '2 часа', price: 70 },

    /* Танзания */
    { id: 'tz-crossing', region: 'tanzania', icon: 'binoculars', title: 'Переправа миграции', time: '4-5 часов', price: 180 },
    { id: 'tz-balloon', region: 'tanzania', icon: 'balloon', title: 'Шар над Серенгети', time: '1 час и завтрак', price: 599 },
    { id: 'tz-crater', region: 'tanzania', icon: 'paw-print', title: 'Кратер Нгоронгоро', time: '4-6 часов', price: 320 },
    { id: 'tz-hadza', region: 'tanzania', icon: 'users-three', title: 'Утро с племенем хадза', time: '3 часа', price: 110 },
    { id: 'tz-snorkel', region: 'tanzania', icon: 'fish', tone: 'sea', title: 'Снорклинг у Занзибара', time: 'Полдня', price: 65 },
    { id: 'tz-camp', region: 'tanzania', icon: 'moon-stars', tone: 'night', title: 'Ночь в мобильном лагере', time: '1 ночь', price: 210 },

    /* Арабские страны */
    { id: 'ar-dunes', region: 'arabia', icon: 'jeep', title: 'Джип по дюнам', time: '4-6 часов', price: 85 },
    { id: 'ar-dinner', region: 'arabia', icon: 'campfire', tone: 'night', title: 'Ужин в бедуинском лагере', time: 'Вечер', price: 95 },
    { id: 'ar-balloon', region: 'arabia', icon: 'balloon', title: 'Шар над пустыней', time: '1 час', price: 280 },
    { id: 'ar-camel', region: 'arabia', icon: 'sun-horizon', title: 'Караван на верблюдах', time: '1 час', price: 45 },
    { id: 'ar-dhow', region: 'arabia', icon: 'sailboat', tone: 'sea', title: 'Фьорды Мусандама на дау', time: 'Целый день', price: 90 },
    { id: 'ar-stars', region: 'arabia', icon: 'moon-stars', tone: 'night', title: 'Ночь под звёздами в Вахибе', time: '1 ночь', price: 160 },

    /* Турция */
    { id: 'tr-balloon', region: 'turkey', icon: 'balloon', title: 'Шар над Каппадокией', time: '1 час и завтрак', price: 230 },
    { id: 'tr-jeep', region: 'turkey', icon: 'jeep', title: 'Джип-сафари по долинам', time: '3 часа', price: 65 },
    { id: 'tr-horse', region: 'turkey', icon: 'horse', title: 'Верхом к закату', time: '2 часа', price: 55 },
    { id: 'tr-hamam', region: 'turkey', icon: 'drop', title: 'Турецкий хаммам', time: '2 часа', price: 60 },
    { id: 'tr-bosphorus', region: 'turkey', icon: 'moon-stars', tone: 'night', title: 'Ужин-круиз по Босфору', time: 'Вечер', price: 70 },
    { id: 'tr-boat', region: 'turkey', icon: 'sailboat', tone: 'sea', title: 'Яхта вдоль бухт Кемера', time: 'Целый день', price: 75 },

    /* Европа */
    { id: 'eu-train', region: 'europe', icon: 'train', title: 'Поезд Бернина-экспресс', time: 'Целый день', price: 140 },
    { id: 'eu-wine', region: 'europe', icon: 'wine', title: 'Дегустация в Кьянти', time: 'Полдня', price: 120 },
    { id: 'eu-lavender', region: 'europe', icon: 'flower', title: 'Лавандовые поля Валансоля', time: 'Полдня', price: 85 },
    { id: 'eu-pasta', region: 'europe', icon: 'cooking-pot', title: 'Мастер-класс пасты во Флоренции', time: '3 часа', price: 95 },
    { id: 'eu-gondola', region: 'europe', icon: 'boat', tone: 'sea', title: 'Гондола в Венеции', time: '30 минут', price: 90 },
    { id: 'eu-seine', region: 'europe', icon: 'moon-stars', tone: 'night', title: 'Вечерняя Сена на кораблике', time: '1 час', price: 45 }
  ]
};
