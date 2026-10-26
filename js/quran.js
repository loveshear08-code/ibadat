
(() => {
  'use strict';

  const API = 'https://api.alquran.cloud/v1';
  const AUDIO_BASE = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/';
  const AYAH_AUDIO = 'https://api.alquran.cloud/v1/ayah/';
  const $ = id => document.getElementById(id);

  const els = {
    app: $('quranApp'),
    title: $('pageSubtitle'),
    home: $('homePage'),
    read: $('readPage'),
    listen: $('listenPage'),
    homeFooter: $('homeFooter'),
    readFooter: $('readFooter'),
    listenFooter: $('listenFooter'),
    homeRead: $('openRead'),
    homeListen: $('openListen'),
    searchToggle: $('searchToggle'),
    searchPanel: $('surahSearchPanel'),
    searchInput: $('surahSearchInput'),
    clearSearch: $('clearSearch'),
    surahList: $('surahList'),
    readContent: $('readContent'),
    listenList: $('listenSurahList'),
    audio: $('quranAudio'),
    message: $('appMessage'),
    readFooterMessage: $('readFooterMessage'),
    playPause: $('playPause'),
    prevTrack: $('prevTrack'),
    nextTrack: $('nextTrack'),
    prevAyah: $('prevAyah'),
    nextAyah: $('nextAyah'),
    fontDown: $('fontDown'),
    fontUp: $('fontUp')
  };

  const TEXT = {
    bn: {
      home:'আল-কুরআন', read:'কুরআন পড়ুন', listen:'তিলাওয়াত শুনুন',
      bismillah:'পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে',
      homeTitle:'পবিত্র আল-কুরআন',
      description:'আল-কুরআন মানবজাতির জন্য হিদায়াত, রহমত ও আলোর পথ। নিয়মিত তিলাওয়াত করুন, অর্থ বুঝুন এবং জীবনে কুরআনের শিক্ষা অনুসরণ করুন।',
      readOption:'কুরআন পড়ুন', listenOption:'তিলাওয়াত শুনুন',
      search:'খুঁজুন', searchPlaceholder:'সূরার নাম বা নম্বর লিখুন',
      choose:'সূরা নির্বাচন করুন', loading:'লোড হচ্ছে…',
      loadingSurah:'সূরার তালিকা লোড হচ্ছে…',
      error:'তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
      noResults:'কোনো সূরা পাওয়া যায়নি।', ayah:'আয়াত',
      meccan:'মাক্কী', medinan:'মাদানী',
      quote:'“নিশ্চয়ই এই কুরআন এমন পথ দেখায়, যা সবচেয়ে সরল।”',
      play:'চালান', pause:'বিরতি'
    },
    en: {
      home:'The Holy Quran', read:'Read Quran', listen:'Listen to Quran',
      bismillah:'In the name of Allah, the Most Compassionate, the Most Merciful',
      homeTitle:'The Holy Quran',
      description:'The Quran is guidance, mercy, and light for humanity. Recite it regularly, understand its meaning, and follow its teachings in your life.',
      readOption:'Read Quran', listenOption:'Listen to Quran',
      search:'Search', searchPlaceholder:'Search by surah name or number',
      choose:'Choose a surah', loading:'Loading…',
      loadingSurah:'Loading surah list…',
      error:'Could not load the data. Check your internet connection and try again.',
      noResults:'No surahs found.', ayah:'Ayah',
      meccan:'Meccan', medinan:'Medinan',
      quote:'“Indeed, this Quran guides to that which is most upright.”',
      play:'Play', pause:'Pause'
    },
    hi: {
      home:'पवित्र कुरआन', read:'कुरआन पढ़ें', listen:'कुरआन सुनें',
      bismillah:'अल्लाह के नाम से, जो अत्यंत कृपाशील, दयावान है',
      homeTitle:'पवित्र अल-कुरआन',
      description:'कुरआन मानवता के लिए मार्गदर्शन, दया और प्रकाश है। नियमित तिलावत करें, अर्थ समझें और इसकी शिक्षाओं पर अमल करें।',
      readOption:'कुरआन पढ़ें', listenOption:'कुरआन सुनें',
      search:'खोजें', searchPlaceholder:'सूरह का नाम या नंबर लिखें',
      choose:'सूरह चुनें', loading:'लोड हो रहा है…',
      loadingSurah:'सूरह सूची लोड हो रही है…',
      error:'जानकारी लोड नहीं हो सकी। इंटरनेट कनेक्शन जाँचकर फिर कोशिश करें।',
      noResults:'कोई सूरह नहीं मिली।', ayah:'आयत',
      meccan:'मक्की', medinan:'मदनी',
      quote:'“निश्चय ही यह कुरआन सबसे सीधे मार्ग की ओर मार्गदर्शन करता है।”',
      play:'चलाएँ', pause:'रोकें'
    }
  };

  const LOCAL_NAMES = {
    bn: [
      'আল-ফাতিহা','আল-বাকারা','আলে ইমরান','আন-নিসা','আল-মায়িদা','আল-আনআম','আল-আরাফ','আল-আনফাল','আত-তাওবা','ইউনুস','হুদ','ইউসুফ','আর-রাদ','ইবরাহিম','আল-হিজর','আন-নাহল','বনি ইসরাইল','আল-কাহফ','মারইয়াম','ত্ব-হা','আল-আম্বিয়া','আল-হজ্জ','আল-মুমিনুন','আন-নূর','আল-ফুরকান','আশ-শুআরা','আন-নামল','আল-কাসাস','আল-আনকাবুত','আর-রূম','লুকমান','আস-সাজদা','আল-আহযাব','সাবা','ফাতির','ইয়াসিন','আস-সাফফাত','সোয়াদ','আয-যুমার','গাফির','ফুসসিলাত','আশ-শুরা','আয-যুখরুফ','আদ-দুখান','আল-জাসিয়া','আল-আহকাফ','মুহাম্মদ','আল-ফাতহ','আল-হুজুরাত','কাফ','আয-যারিয়াত','আত-তূর','আন-নাজম','আল-কামার','আর-রহমান','আল-ওয়াকিয়া','আল-হাদিদ','আল-মুজাদালা','আল-হাশর','আল-মুমতাহিনা','আস-সাফ','আল-জুমুআ','আল-মুনাফিকুন','আত-তাগাবুন','আত-তালাক','আত-তাহরিম','আল-মুলক','আল-কলম','আল-হাক্কা','আল-মাআরিজ','নূহ','আল-জিন','আল-মুযযাম্মিল','আল-মুদ্দাসসির','আল-কিয়ামা','আল-ইনসান','আল-মুরসালাত','আন-নাবা','আন-নাযিআত','আবাসা','আত-তাকভির','আল-ইনফিতার','আল-মুতাফফিফিন','আল-ইনশিকাক','আল-বুরুজ','আত-তারিক','আল-আলা','আল-গাশিয়া','আল-ফজর','আল-বালাদ','আশ-শামস','আল-লাইল','আদ-দুহা','আল-ইনশিরাহ','আত-তিন','আল-আলাক','আল-কদর','আল-বাইয়্যিনাহ','আয-যিলযাল','আল-আদিয়াত','আল-কারিআহ','আত-তাকাসুর','আল-আসর','আল-হুমাযাহ','আল-ফিল','কুরাইশ','আল-মাউন','আল-কাওসার','আল-কাফিরুন','আন-নাসর','আল-লাহাব','আল-ইখলাস','আল-ফালাক','আন-নাস'
    ],
    hi: [
      'अल-फ़ातिहा','अल-बक़रा','आल-इमरान','अन-निसा','अल-माइदा','अल-अनआम','अल-आराफ़','अल-अनफ़ाल','अत-तौबा','यूनुस','हूद','यूसुफ़','अर-रअद','इब्राहीम','अल-हिज्र','अन-नहल','बनी इसराईल','अल-कहफ़','मरयम','ता-हा','अल-अंबिया','अल-हज्ज','अल-मुमिनून','अन-नूर','अल-फ़ुरक़ान','अश-शुअरा','अन-नम्ल','अल-क़सस','अल-अनकबूत','अर-रूम','लुक़मान','अस-सज्दा','अल-अहज़ाब','सबा','फ़ातिर','या-सीन','अस-साफ़्फ़ात','साद','अज़-ज़ुमर','ग़ाफ़िर','फ़ुस्सिलात','अश-शूरा','अज़-ज़ुख़रुफ़','अद-दुख़ान','अल-जासिया','अल-अहक़ाफ़','मुहम्मद','अल-फ़त्ह','अल-हुजुरात','क़ाफ़','अज़-ज़ारियात','अत-तूर','अन-नज्म','अल-क़मर','अर-रहमान','अल-वाक़िआ','अल-हदीद','अल-मुजादिला','अल-हश्र','अल-मुम्तहिना','अस-सफ़्फ़','अल-जुमुआ','अल-मुनाफ़िक़ून','अत-तग़ाबुन','अत-तलाक़','अत-तहरीम','अल-मुल्क','अल-क़लम','अल-हाक़्क़ा','अल-मआरिज','नूह','अल-जिन्न','अल-मुज़्ज़म्मिल','अल-मुद्दस्सिर','अल-क़ियामा','अल-इंसान','अल-मुरसलात','अन-नबा','अन-नाज़िआत','अबस','अत-तकवीर','अल-इन्फ़ितार','अल-मुतफ़्फ़िफ़ीन','अल-इन्शिक़ाक़','अल-बुरूज','अत-तारिक़','अल-आला','अल-ग़ाशिया','अल-फ़ज्र','अल-बलद','अश-शम्स','अल-लैल','अद-दुहा','अल-इन्शिराह','अत-तीन','अल-अलक़','अल-क़द्र','अल-बय्यिना','अज़-ज़िलज़ाल','अल-आदियात','अल-क़ारिआ','अत-तकासुर','अल-अस्र','अल-हुमज़ा','अल-फ़ील','क़ुरैश','अल-माऊन','अल-कौसर','अल-काफ़िरून','अन-नस्र','अल-मसद','अल-इख़लास','अल-फ़लक़','अन-नास'
    ]
  };

  let settings = { lang: 'bn', dark: false, themeColor: 'classic' };
  let surahs = [];
  let currentSurah = null;
  let currentPage = 'home';
  let currentAyahAudio = null;
  let toastTimer = null;
  let arabicSize = 30;

  const translationEdition = {
    bn: 'bn.bengali',
    en: 'en.sahih',
    hi: 'hi.hindi'
  };

  const digits = {
    bn: '০১২৩৪৫৬৭৮৯',
    hi: '०१२३४५६७८९',
    en: '0123456789'
  };

  const t = key => (TEXT[settings.lang] || TEXT.bn)[key] || key;

  const localizedNumber = value => String(value).replace(
    /\d/g,
    digit => (digits[settings.lang] || digits.en)[Number(digit)]
  );

  const localizedName = surah =>
    (LOCAL_NAMES[settings.lang] && LOCAL_NAMES[settings.lang][surah.number - 1]) ||
    surah.englishName || surah.name;

  function showMessage(message) {
    els.message.textContent = message;
    els.message.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.message.classList.remove('show'), 2800);
  }

  function readSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem('appSettings') || '{}');
      settings = { ...settings, ...saved };
    } catch (_) {}

    if (!['bn', 'en', 'hi'].includes(settings.lang)) settings.lang = 'bn';
    if (!['classic', 'royal', 'rose', 'pista'].includes(settings.themeColor)) {
      settings.themeColor = 'classic';
    }
    settings.dark = Boolean(settings.dark);
  }

  function applyTheme() {
    document.body.classList.toggle('dark-mode', settings.dark);
    document.documentElement.dataset.theme = settings.themeColor;
    document.documentElement.style.colorScheme = settings.dark ? 'dark' : 'light';
  }

  function applyLabels() {
    document.documentElement.lang = settings.lang;
    $('bismillahTranslation').textContent = t('bismillah');
    $('quranTitle').textContent = t('homeTitle');
    $('quranDescription').textContent = t('description');
    $('readOptionLabel').textContent = t('readOption');
    $('listenOptionLabel').textContent = t('listenOption');
    $('searchLabel').textContent = t('search');
    els.searchInput.placeholder = t('searchPlaceholder');
    $('footerText').textContent = t('quote');

    els.title.textContent =
      currentPage === 'home' ? t('home') :
      currentPage === 'read' ? t('read') : t('listen');

    $('surahListLoading').textContent = t('loadingSurah');
    $('listenLoading').textContent = t('loadingSurah');

    if (surahs.length) {
      renderSurahList();
      renderListenList();
    }

    if (currentSurah && currentPage === 'read') {
      loadSurah(currentSurah.number, false);
    }

    updateFooterMessage();
  }

  function setPage(page, push = true) {
    if (!['home', 'read', 'listen'].includes(page)) page = 'home';
    currentPage = page;

    for (const [key, element] of [
      ['home', els.home],
      ['read', els.read],
      ['listen', els.listen]
    ]) {
      element.classList.toggle('active', key === page);
    }

    for (const [key, element] of [
      ['home', els.homeFooter],
      ['read', els.readFooter],
      ['listen', els.listenFooter]
    ]) {
      element.classList.toggle('active', key === page);
    }

    els.title.textContent =
      page === 'home' ? t('home') :
      page === 'read' ? t('read') : t('listen');

    if (push) history.pushState({ quranPage: page }, '', `#quran-${page}`);

    if (page === 'read' && !currentSurah && surahs.length) {
      loadSurah(1);
    }
  }

  async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json.code && json.code !== 200) throw new Error(json.status || 'API error');
    return json.data;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function renderSurahList() {
    if (!surahs.length) return;

    const query = (els.searchInput.value || '').trim().toLocaleLowerCase();
    const filtered = surahs.filter(s =>
      !query ||
      String(s.number).includes(query) ||
      localizedName(s).toLocaleLowerCase().includes(query) ||
      s.englishName.toLocaleLowerCase().includes(query) ||
      s.name.includes(query)
    );

    if (!filtered.length) {
      els.surahList.innerHTML = `<div class="empty-state">${t('noResults')}</div>`;
      return;
    }

    els.surahList.innerHTML = filtered.map(s => `
      <button type="button"
        class="surah-item${currentSurah?.number === s.number ? ' selected' : ''}"
        data-surah="${s.number}">
        <span class="surah-number">${localizedNumber(s.number)}</span>
        <span class="surah-item-text">
          <span class="surah-item-name">${escapeHTML(localizedName(s))}</span>
          <span class="surah-item-meta">${localizedNumber(s.numberOfAyahs)} ${t('ayah')}</span>
        </span>
        <span class="surah-item-arabic" lang="ar">${escapeHTML(s.name)}</span>
      </button>
    `).join('');

    els.surahList.querySelectorAll('[data-surah]').forEach(button => {
      button.addEventListener('click', () => loadSurah(Number(button.dataset.surah)));
    });
  }

  function renderListenList() {
    if (!surahs.length) return;

    els.listenList.innerHTML = surahs.map(s => `
      <button type="button"
        class="listen-item${currentSurah?.number === s.number ? ' selected' : ''}"
        data-surah="${s.number}">
        <span class="surah-number">${localizedNumber(s.number)}</span>
        <span class="surah-item-text">
          <span class="surah-item-name">${escapeHTML(localizedName(s))}</span>
          <span class="surah-item-meta">
            ${localizedNumber(s.numberOfAyahs)} ${t('ayah')} ·
            ${s.revelationType === 'Meccan' ? t('meccan') : t('medinan')}
          </span>
        </span>
        <span class="listen-play-icon" aria-hidden="true">▶</span>
      </button>
    `).join('');

    els.listenList.querySelectorAll('[data-surah]').forEach(button => {
      button.addEventListener('click', () => playSurah(Number(button.dataset.surah)));
    });
  }

  async function loadSurah(number, scrollTop = true) {
    const surah = surahs.find(item => item.number === number);
    if (!surah) return;

    currentSurah = surah;
    renderSurahList();
    renderListenList();
    updateFooterMessage();

    els.readContent.innerHTML = `<div class="loading">${t('loading')}</div>`;

    try {
      const [arabicData, translationData] = await Promise.all([
        fetchJSON(`${API}/surah/${number}/quran-uthmani`),
        fetchJSON(`${API}/surah/${number}/${translationEdition[settings.lang] || translationEdition.bn}`)
          .catch(() => null)
      ]);

      const translations = translationData?.ayahs || [];

      const heading = `
        <div class="surah-heading">
          <h2>${localizedNumber(number)}. ${escapeHTML(localizedName(surah))}</h2>
          <p>
            ${surah.revelationType === 'Meccan' ? t('meccan') : t('medinan')} ·
            ${localizedNumber(surah.numberOfAyahs)} ${t('ayah')}
          </p>
          ${number !== 1 && number !== 9
            ? '<div class="surah-bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>'
            : ''}
        </div>`;

      const ayahs = arabicData.ayahs.map((ayah, index) => `
        <section class="ayah" id="ayah-${number}-${ayah.numberInSurah}">
          <div class="ayah-top">
            <span class="ayah-number">${localizedNumber(ayah.numberInSurah)}</span>
            <button type="button" class="ayah-play"
              data-ayah="${number}:${ayah.numberInSurah}"
              aria-label="Play ayah ${ayah.numberInSurah}">▶</button>
          </div>
          <div class="ayah-arabic" lang="ar" dir="rtl">${escapeHTML(ayah.text)}</div>
          ${translations[index]
            ? `<div class="ayah-translation">${escapeHTML(translations[index].text)}</div>`
            : ''}
        </section>
      `).join('');

      els.readContent.innerHTML = heading + ayahs;

      els.readContent.querySelectorAll('[data-ayah]').forEach(button => {
        button.addEventListener('click', () => playAyah(button.dataset.ayah));
      });

      if (scrollTop) els.readContent.scrollTop = 0;
      renderSurahList();
      updateFooterMessage();
    } catch (error) {
      els.readContent.innerHTML = `<div class="empty-state">${t('error')}</div>`;
      showMessage(t('error'));
    }
  }

  function updateFooterMessage() {
    els.readFooterMessage.textContent = currentSurah
      ? `${localizedNumber(currentSurah.number)}. ${localizedName(currentSurah)}`
      : t('choose');

    els.prevAyah.disabled = !currentSurah || currentSurah.number <= 1;
    els.nextAyah.disabled = !currentSurah || currentSurah.number >= 114;
    els.prevTrack.disabled = !currentSurah || currentSurah.number <= 1;
    els.nextTrack.disabled = !currentSurah || currentSurah.number >= 114;
  }

  function moveSurah(delta, page) {
    if (!currentSurah) {
      if (surahs.length) {
        page === 'listen' ? playSurah(1) : loadSurah(1);
      }
      return;
    }

    const next = Math.max(1, Math.min(114, currentSurah.number + delta));
    if (page === 'listen') playSurah(next);
    else loadSurah(next);
  }

  async function playAyah(key) {
    try {
      const data = await fetchJSON(`${AYAH_AUDIO}${key}/ar.alafasy`);
      currentAyahAudio = key;
      els.audio.src = data.audio;
      await els.audio.play();
    } catch (_) {
      showMessage(t('error'));
    }
  }

  async function playSurah(number) {
    const surah = surahs.find(item => item.number === number);
    if (!surah) return;

    currentSurah = surah;
    renderListenList();
    renderSurahList();
    updateFooterMessage();
    setPage('listen');

    els.audio.src = `${AUDIO_BASE}${number}.mp3`;
    currentAyahAudio = null;

    try {
      await els.audio.play();
    } catch (_) {
      showMessage(t('error'));
    }
  }

  function togglePlayback() {
    if (!els.audio.src) {
      if (currentSurah) playSurah(currentSurah.number);
      else if (surahs.length) playSurah(1);
      return;
    }

    if (els.audio.paused) {
      els.audio.play().catch(() => showMessage(t('error')));
    } else {
      els.audio.pause();
    }
  }

  function onAudioEnded() {
    if (currentAyahAudio) {
      currentAyahAudio = null;
      return;
    }

    if (currentPage === 'listen' && currentSurah && currentSurah.number < 114) {
      playSurah(currentSurah.number + 1);
    }
  }

  function changeFont(delta) {
    arabicSize = Math.max(20, Math.min(48, arabicSize + delta));
    document.documentElement.style.setProperty('--arabic-size', `${arabicSize}px`);
  }

  function init() {
    readSettings();
    applyTheme();
    applyLabels();

    els.homeRead.addEventListener('click', () => setPage('read'));
    els.homeListen.addEventListener('click', () => setPage('listen'));

    els.searchToggle.addEventListener('click', () => {
      const open = els.searchPanel.hidden;
      els.searchPanel.hidden = !open;
      els.searchToggle.setAttribute('aria-expanded', String(open));
      if (open) els.searchInput.focus();
    });

    els.searchInput.addEventListener('input', renderSurahList);

    els.clearSearch.addEventListener('click', () => {
      els.searchInput.value = '';
      renderSurahList();
      els.searchInput.focus();
    });

    els.fontDown.addEventListener('click', () => changeFont(-2));
    els.fontUp.addEventListener('click', () => changeFont(2));

    els.prevAyah.addEventListener('click', () => moveSurah(-1, 'read'));
    els.nextAyah.addEventListener('click', () => moveSurah(1, 'read'));
    els.prevTrack.addEventListener('click', () => moveSurah(-1, 'listen'));
    els.nextTrack.addEventListener('click', () => moveSurah(1, 'listen'));
    els.playPause.addEventListener('click', togglePlayback);

    els.audio.addEventListener('play', () => {
      els.playPause.textContent = 'Ⅱ';
      els.playPause.setAttribute('aria-label', t('pause'));
    });

    els.audio.addEventListener('pause', () => {
      els.playPause.textContent = '▶';
      els.playPause.setAttribute('aria-label', t('play'));
    });

    els.audio.addEventListener('ended', onAudioEnded);

    window.addEventListener('popstate', event => {
      setPage(event.state?.quranPage || 'home', false);
    });

    window.addEventListener('storage', event => {
      if (event.key === 'appSettings') {
        readSettings();
        applyTheme();
        applyLabels();
      }
    });

    fetchJSON(`${API}/surah`)
      .then(data => {
        surahs = data;
        renderSurahList();
        renderListenList();
        if (currentPage === 'read') loadSurah(1);
      })
      .catch(() => {
        $('surahListLoading').textContent = t('error');
        $('listenLoading').textContent = t('error');
        showMessage(t('error'));
      });

    if (location.hash === '#quran-read') setPage('read', false);
    else if (location.hash === '#quran-listen') setPage('listen', false);
  }

  function applyLabels() {
    document.documentElement.lang = settings.lang;
    $('bismillahTranslation').textContent = t('bismillah');
    $('quranTitle').textContent = t('homeTitle');
    $('quranDescription').textContent = t('description');
    $('readOptionLabel').textContent = t('readOption');
    $('listenOptionLabel').textContent = t('listenOption');
    $('searchLabel').textContent = t('search');
    els.searchInput.placeholder = t('searchPlaceholder');
    $('footerText').textContent = t('quote');

    els.title.textContent =
      currentPage === 'home' ? t('home') :
      currentPage === 'read' ? t('read') : t('listen');

    $('surahListLoading').textContent = t('loadingSurah');
    $('listenLoading').textContent = t('loadingSurah');

    if (surahs.length) {
      renderSurahList();
      renderListenList();
    }

    updateFooterMessage();
  }

  init();
})();
