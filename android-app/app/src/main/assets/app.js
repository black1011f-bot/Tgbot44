(() => {
  "use strict";

  const $app = document.getElementById("app");
  const SAVE_KEY = "neon-hearts-save-v1";
  const AGE_KEY = "neon-hearts-adult-confirmed";

  const cast = {
    mika: {
      id: "mika", name: "Мика", age: 24, role: "Музыкант и бариста",
      vibe: "Тёплая, немного застенчивая, всегда с новой мелодией",
      color: "mika", symbol: "♫",
      scenes: [
        { place: "Кафе «Лунный свет»", title: "Последний заказ", text: "За окном уже почти рассвело. Мика закрывает кассу и замечает, что ты всё ещё сидишь у окна. «Ты каждый раз приходишь под самый конец смены. Может, тебе нравится кофе… или компания?»", options: [
          { label: "«Наверное, компания. Особенно когда ты улыбаешься»", delta: 1, reply: "Мика смущённо прячет улыбку за чашкой. «Тогда сегодня я сделаю твой кофе за счёт заведения»." },
          { label: "«Твой плейлист. Что это сейчас играло?»", delta: 0, reply: "Её глаза загораются. Мика достаёт телефон и показывает тебе несколько своих демо-записей." }
        ]},
        { place: "Маленькая сцена", title: "Песня для двоих", text: "Мика приглашает тебя на выступление в крошечном баре. Перед выходом на сцену она нервно перебирает струны. «Я написала новую песню. Но пока не уверена, стоит ли её играть».", options: [
          { label: "«Сыграй. Я хочу услышать то, что ты скрываешь»", delta: 1, reply: "Она кивает и выходит под свет софитов. Во время припева её взгляд находит тебя в толпе." },
          { label: "«Давай сначала прорепетируем вместе»", delta: 0, reply: "Вы проводите час за настройкой гитары и смеётесь над каждой второй ошибкой. Напряжение уходит." }
        ]},
        { place: "Ночная набережная", title: "Тихая прогулка", text: "После концерта город кажется почти пустым. Мика идёт рядом, держа куртку на плечах. «Мне нравится, что с тобой не нужно притворяться кем-то другим».", options: [
          { label: "Взять её за руку и спросить, можно ли", delta: 1, reply: "Она отвечает лёгким рукопожатием и не отпускает твою ладонь. «Можно. Я как раз надеялась, что ты спросишь»." },
          { label: "Предложить ещё немного пройтись и поговорить", delta: 0, reply: "Вы сворачиваете к мосту и говорите обо всём подряд, пока над рекой не начинает светлеть небо." }
        ]},
        { place: "Крыша над городом", title: "Своя мелодия", text: "Мика приносит маленькую колонку и включает новую запись. «Я закончила её вчера. Кажется, она теперь напоминает мне о тебе». Она смотрит на тебя, ожидая ответа.", options: [
          { label: "«Тогда давай сделаем ещё много таких воспоминаний вместе»", delta: 1, reply: "Мика улыбается и прислоняется к твоему плечу. «Договорились. Это будет наша история»." },
          { label: "«Ты должна выпустить её. Она правда особенная»", delta: 0, reply: "Мика крепко обнимает тебя. «Спасибо, что всегда веришь в мою музыку»." }
        ]}
      ]
    },
    aria: {
      id: "aria", name: "Ариа", age: 23, role: "DJ и ведущая радиошоу",
      vibe: "Уверенная, остроумная, обожает ночной город",
      color: "aria", symbol: "✦",
      scenes: [
        { place: "Клуб «Пульс»", title: "Случайная встреча", text: "Бас гудит где-то под ногами. Ариа снимает наушники и поворачивается к тебе: «Ты выглядишь так, будто пришёл сюда не танцевать. Угадала?»", options: [
          { label: "«Пришёл проверить, кто управляет этим хаосом»", delta: 1, reply: "Ариа смеётся. «Осторожно, я могу решить, что ты умеешь флиртовать»." },
          { label: "«Я услышал твой сет по радио и захотел познакомиться»", delta: 0, reply: "Она удивлённо приподнимает брови. «Вот это уже интереснее. Значит, ты слушатель»." }
        ]},
        { place: "DJ-будка", title: "За пультом", text: "Ариа протягивает тебе запасные наушники. «Хочешь выбрать следующий трек? Только предупреждаю: публика у меня привередливая».", options: [
          { label: "Выбрать трек, под который хочется танцевать вдвоём", delta: 1, reply: "Ариа одобрительно кивает и добавляет бас. Толпа подхватывает ритм." },
          { label: "Попросить её показать, как сводить музыку", delta: 0, reply: "Она терпеливо объясняет основы и хвалит твой первый переход." }
        ]},
        { place: "Закусочная 24/7", title: "После шума", text: "Вы сидите у окна с двумя стаканами лимонада. Без света сцены Ариа кажется спокойнее. «Иногда я устаю быть человеком, который всегда задаёт настроение».", options: [
          { label: "«Со мной тебе не нужно никого развлекать»", delta: 1, reply: "Ариа на секунду замолкает, а затем мягко улыбается. «Знаешь, мне это было нужно услышать»." },
          { label: "Рассказать смешную историю, чтобы её развеселить", delta: 0, reply: "Она смеётся так искренне, что соседний столик тоже начинает улыбаться." }
        ]},
        { place: "Радиостудия", title: "Сообщение в эфире", text: "Ариа готовится к прямому эфиру и оставляет микрофон включённым только для тебя. «У меня есть одна песня, которую я хочу посвятить кому-то. Как думаешь, кому?»", options: [
          { label: "«Тому, кто сейчас стоит рядом и очень волнуется»", delta: 1, reply: "Ариа краснеет и объявляет песню без имени. Но смотрит только на тебя." },
          { label: "«Тем, кто не боится быть собой»", delta: 0, reply: "Она кивает и начинает эфир. После передачи Ариа благодарит тебя за этот вечер." }
        ]}
      ]
    },
    yuna: {
      id: "yuna", name: "Юна", age: 22, role: "Художница-иллюстратор",
      vibe: "Творческая, внимательная к деталям, любит высоту",
      color: "yuna", symbol: "✧",
      scenes: [
        { place: "Галерея «Север»", title: "Незаконченный портрет", text: "Юна стоит перед большим холстом и отступает на шаг. «Мне не хватает одной детали. Странно, но с тех пор как ты вошёл, я наконец поняла какой».", options: [
          { label: "«Может, картине не хватало зрителя?»", delta: 1, reply: "Юна улыбается уголком губ. «Возможно. А может, вдохновения»." },
          { label: "Спросить, что она хотела передать этой работой", delta: 0, reply: "Она оживляется и начинает рассказывать о цвете, свете и своём любимом художнике." }
        ]},
        { place: "Мастерская", title: "Цвет настроения", text: "Юна раскладывает перед тобой палитру. «Выбери цвет для следующей работы. Только не говори чёрный — это слишком простой ответ».", options: [
          { label: "Нежно-розовый — как свет перед рассветом", delta: 1, reply: "Юна смешивает краски. «Красиво. Я назову этот оттенок “первое свидание”»." },
          { label: "Глубокий синий — как ночное небо", delta: 0, reply: "Она добавляет немного серебра. «В этом есть своя загадка. Мне нравится»." }
        ]},
        { place: "Смотровая площадка", title: "Выше крыш", text: "Вы поднялись на смотровую площадку с блокнотом Юны. Она рисует огни города и вдруг спрашивает: «Ты часто позволяешь себе просто остановиться и посмотреть вокруг?»", options: [
          { label: "«Сейчас я рад, что остановился именно здесь, с тобой»", delta: 1, reply: "Юна закрывает блокнот. «Тогда давай запомним этот момент без рисунка»." },
          { label: "Предложить нарисовать город вместе", delta: 0, reply: "Вы делите карандаши и спорите о том, каким должен быть идеальный горизонт." }
        ]},
        { place: "Студия под звёздами", title: "Последний штрих", text: "Юна показывает тебе готовую картину. На ней — ночной город и два силуэта на крыше. «Я оставила вторую фигуру без лица. Хотела спросить, не хочешь ли ты сам выбрать, кем быть в этой истории?»", options: [
          { label: "«Тем, кто останется рядом, когда погаснут огни»", delta: 1, reply: "Юна берёт твою руку. «Тогда я оставлю для тебя место на всех следующих картинах»." },
          { label: "«Тем, кто будет вдохновлять тебя творить»", delta: 0, reply: "Она улыбается. «Это тоже очень важная роль. Спасибо, что стал частью моей истории»." }
        ]}
      ]
    }
  };

  let state = loadState() || { screen: "menu", route: null, scene: 0, score: 0, feedback: null, hasProgress: false };
  let ageApproved = localStorage.getItem(AGE_KEY) === "yes";

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }
  function saveState() {
    try {
      state.hasProgress = !!state.route && state.screen !== "menu";
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (_) {}
  }
  function safe(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
  }
  function art(character, large) {
    return '<div class="' + (large ? "scene-art " : "art ") + 'art-' + character.color + '"><div class="person"><i class="hair"></i><i class="shine"></i></div>' +
      (large ? '<div class="scene-overlay"><span>' + safe(character.place || "Neon Hearts") + '</span><h2>' + safe(character.name) + '</h2></div>' : '') + '</div>';
  }
  function header() {
    return '<div class="topbar"><div class="brand">NEON <span>HEARTS</span></div><div class="rating">18+ · ROMANCE</div></div>';
  }
  function renderAge() {
    $app.innerHTML = '<div class="shell age-screen"><section class="age-card"><div class="age-mark">18+</div><div class="eyebrow">Neon Hearts · After Dark</div><h1>Только для <em>взрослых</em></h1><p>В игре все персонажи — совершеннолетние. История содержит романтические темы, флирт и взрослую атмосферу, но без графических сексуальных сцен.</p><div class="actions"><button class="btn btn-primary" data-action="age-yes">Мне есть 18 лет</button><button class="btn btn-secondary" data-action="age-no">Мне нет 18 лет</button></div><div class="smallprint">Подтверждая возраст, ты соглашаешься продолжить игру. Проверка основана на самостоятельном подтверждении.</div></section></div>';
  }
  function renderMenu() {
    const canContinue = state.route && state.screen !== "menu" && state.screen !== "ending" && state.hasProgress;
    $app.innerHTML = '<div class="shell">' + header() +
      '<section class="hero"><div class="eyebrow">Визуальная новелла · Глава 01</div><h1>Город не спит.<br><em>Сердца тоже.</em></h1><p class="lead">Три истории, один неоновый город и решения, которые меняют отношения. Выбирай слова внимательно — у каждой истории свой финал.</p>' +
      '<div class="actions"><button class="btn btn-primary" data-action="new">Начать новую историю</button>' +
      (canContinue ? '<button class="btn btn-secondary" data-action="continue">Продолжить</button>' : '') +
      '</div></section><div class="section-label">Три истории · три характера</div><div class="teaser-grid">' +
      Object.values(cast).map(c => '<div class="teaser"><div class="mini-art art-' + c.color + '"><div class="person"><i class="hair"></i></div></div><strong>' + safe(c.name) + '</strong><small>' + c.age + ' лет · ' + safe(c.role) + '</small></div>').join("") +
      '</div><p class="note">Все персонажи — взрослые. Романтические сцены развиваются через диалоги и выборы; интимные моменты остаются за кадром. Прогресс сохраняется автоматически на этом устройстве.</p></div>';
  }
  function renderSelect() {
    $app.innerHTML = '<div class="shell">' + header() + '<div class="story-header"><button class="back" data-action="menu">← На главную</button><div class="chapter">Выбор маршрута · 01 / 03</div></div><h1 class="screen-title">С кем начнётся ночь?</h1><p class="screen-sub">Выбери историю. Каждая героиня — самостоятельный маршрут с четырьмя сценами и двумя вариантами финала.</p><div class="character-list">' +
      Object.values(cast).map(c => '<button class="character-card" data-route="' + c.id + '"><div class="art art-' + c.color + '"><div class="person"><i class="hair"></i><i class="shine"></i></div></div><div class="character-info"><span class="age">' + c.age + ' ЛЕТ · ВЗРОСЛЫЙ ПЕРСОНАЖ</span><h3>' + safe(c.name) + '</h3><p>' + safe(c.vibe) + '</p><span class="pill">' + safe(c.role) + '</span></div></button>').join("") +
      '</div></div>';
  }
  function renderStory() {
    const c = cast[state.route];
    if (!c) { state.screen = "select"; return renderSelect(); }
    const scene = c.scenes[state.scene];
    const progress = Math.round((state.scene + (state.feedback ? 1 : 0)) / c.scenes.length * 100);
    let content = '<div class="shell">' + header() +
      '<div class="story-header"><button class="back" data-action="menu">← Сохранить и выйти</button><div class="chapter">История ' + safe(c.name) + '</div></div>' +
      '<div class="progress"><span style="width:' + progress + '%"></span></div>' +
      art({...c, place: scene.place}, true) +
      '<section class="dialogue"><div class="speaker">' + safe(c.name) + ' · ' + safe(scene.place) + '</div><h2 class="screen-title" style="font-size:21px;margin-top:7px">' + safe(scene.title) + '</h2><p>' + safe(scene.text) + '</p></section>';
    if (state.feedback) {
      content += '<div class="feedback">' + safe(state.feedback) + '<button class="btn btn-primary" data-action="next">' + (state.scene === c.scenes.length - 1 ? 'Узнать финал' : 'Следующая сцена →') + '</button></div>';
    } else {
      content += '<div class="section-label">Твой ответ</div><div class="choice-list">' +
        scene.options.map((o, i) => '<button class="choice" data-choice="' + i + '">' + safe(o.label) + '</button>').join("") +
        '</div><p class="note">Выбор влияет на близость отношений и финальную сцену. Можно переиграть маршрут с самого начала.</p>';
    }
    content += '</div>';
    $app.innerHTML = content;
  }
  function renderEnding() {
    const c = cast[state.route];
    if (!c) { state.screen = "menu"; return renderMenu(); }
    const close = state.score >= 3;
    $app.innerHTML = '<div class="shell">' + header() + '<div class="ending"><div class="symbol">' + (close ? "♥" : "✦") + '</div><div class="eyebrow">Финал маршрута · ' + safe(c.name) + '</div><h2>' + (close ? "Ближе, чем вчера" : "Тёплое начало") + '</h2><p>' +
      (close ? safe(c.name) + ' смотрит на тебя с улыбкой. Между вами больше нет недосказанности: вы решили дать этой истории шанс. Ночь заканчивается, но ваша история только начинается.' :
      'Вы стали ближе и оставили друг другу обещание встретиться снова. Возможно, следующая глава изменит всё. Иногда хорошая история начинается с дружбы.') +
      '</p><div class="score">Близость: ' + state.score + ' / 4</div><div class="actions"><button class="btn btn-primary" data-action="replay">Переиграть ' + safe(c.name) + '</button><button class="btn btn-secondary" data-action="new">Выбрать другую историю</button><button class="btn btn-quiet" data-action="menu">На главную</button></div></div></div>';
  }
  function render() {
    if (!ageApproved) return renderAge();
    if (state.screen === "select") return renderSelect();
    if (state.screen === "story") return renderStory();
    if (state.screen === "ending") return renderEnding();
    return renderMenu();
  }

  $app.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "age-yes") {
      ageApproved = true;
      localStorage.setItem(AGE_KEY, "yes");
      state.screen = "menu";
      return render();
    }
    if (action === "age-no") {
      $app.innerHTML = '<div class="shell age-screen"><section class="age-card"><h1>Доступ закрыт</h1><p>Эта игра предназначена только для совершеннолетних игроков.</p></section></div>';
      return;
    }
    if (action === "new") {
      state = { screen: "select", route: null, scene: 0, score: 0, feedback: null, hasProgress: false };
      saveState(); return render();
    }
    if (action === "menu") {
      state.screen = "menu"; state.feedback = null; saveState(); return render();
    }
    if (action === "continue") {
      if (state.route) { state.screen = "story"; state.feedback = null; return render(); }
    }
    if (action === "replay") {
      state.scene = 0; state.score = 0; state.feedback = null; state.screen = "story"; saveState(); return render();
    }
    if (action === "next") {
      state.feedback = null;
      if (state.scene >= cast[state.route].scenes.length - 1) state.screen = "ending";
      else state.scene += 1;
      saveState(); return render();
    }
    if (button.dataset.route) {
      state.route = button.dataset.route;
      state.scene = 0; state.score = 0; state.feedback = null; state.screen = "story"; saveState(); return render();
    }
    if (button.dataset.choice !== undefined && state.screen === "story") {
      const scene = cast[state.route].scenes[state.scene];
      const choice = scene.options[Number(button.dataset.choice)];
      if (!choice) return;
      state.score += choice.delta;
      state.feedback = choice.reply;
      saveState(); return render();
    }
  });

  window.handleAndroidBack = function() {
    if (state.screen !== "menu") {
      state.screen = "menu";
      state.feedback = null;
      saveState();
      render();
    }
  };

  render();
})();
