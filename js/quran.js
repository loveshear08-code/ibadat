
(() => {
  'use strict';

  const API = 'https://api.alquran.cloud/v1';
  const AYAH_AUDIO = `${API}/ayah/`;
  const $ = id => document.getElementById(id);

  const els = {
    title: $('pageSubtitle'), home: $('homePage'), read: $('readPage'),
    listen: $('listenPage'), homeFooter: $('homeFooter'), readFooter: $('readFooter'),
    listenFooter: $('listenFooter'), homeRead: $('openRead'), homeListen: $('openListen'),
    searchToggle: $('searchToggle'), searchPanel: $('surahSearchPanel'),
    searchInput: $('surahSearchInput'), clearSearch: $('clearSearch'),
    readLayout: $('readLayout'), surahList: $('surahList'), readContent: $('readContent'),
    listenList: $('listenSurahList'), audio: $('quranAudio'), message: $('appMessage'),
    readFooterMessage: $('readFooterMessage'), playPause: $('playPause'),
    prevTrack: $('prevTrack'), nextTrack: $('nextTrack'), prevAyah: $('prevAyah'),
    nextAyah: $('nextAyah'), fontDown: $('fontDown'), fontUp: $('fontUp')
  };

  const TEXT = {
    bn: {
      home:'আল-কুরআন', read:'আল-কুরআন', listen:'আল-কুরআন',
      bismillah:'পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে',
      description:'আল-কুরআন মানবজাতির জন্য হিদায়াত, রহমত ও আলোর পথ। কুরআন তিলাওয়াত করুন, অর্থ অনুধাবন করুন এবং অনুসরণ করুন।',
      readOption:'কুরআন পড়ুন', listenOption:'তিলাওয়াত শুনুন', search:'সূরা খুঁজুন',
      searchPlaceholder:'সূরার নাম বা নম্বর লিখুন', choose:'সূরা নির্বাচন করুন',
      loading:'কুরআন লোড হচ্ছে…', loadingSurah:'সূরার তালিকা লোড হচ্ছে…',
      error:'তথ্য লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
      translationError:'এই ভাষার অনুবাদ এখন লোড করা যায়নি।', noResults:'কোনো সূরা পাওয়া যায়নি।',
      ayah:'আয়াত', meccan:'মাক্কী', medinan:'মাদানী', play:'চালান', pause:'বিরতি',
      quotes:['কুরআন তিলাওয়াত করুন, অন্তরকে প্রশান্ত করুন।','নিশ্চয়ই আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।','কুরআন পড়ুন, বুঝুন এবং জীবনে অনুসরণ করুন।','সালাত কায়েম করুন এবং আল্লাহর ওপর ভরসা রাখুন।','আল্লাহর রহমত থেকে কখনো নিরাশ হবেন না।','সত্য কথা বলুন এবং উত্তম চরিত্র গড়ে তুলুন।','দয়া করুন, ক্ষমা করুন এবং মানুষের উপকার করুন।','প্রতিদিন কুরআনের জন্য কিছু সময় রাখুন।','আল্লাহর শুকরিয়া আদায় করুন।','নেক আমলে জীবনকে সুন্দর করে তুলুন.']
    },
    en: {
      home:'Al-Quran', read:'Al-Quran', listen:'Al-Quran',
      bismillah:'In the name of Allah, the Most Compassionate, the Most Merciful',
      description:'The Quran is guidance, mercy, and light for humanity. Recite the Quran, understand its meaning, and follow its teachings.',
      readOption:'Read Quran', listenOption:'Listen to Quran', search:'Search surah',
      searchPlaceholder:'Search by surah name or number', choose:'Choose a surah',
      loading:'Loading Quran…', loadingSurah:'Loading surah list…',
      error:'Could not load the data. Check your internet connection and try again.',
      translationError:'The translation could not be loaded right now.', noResults:'No surahs found.',
      ayah:'Ayahs', meccan:'Meccan', medinan:'Medinan', play:'Play', pause:'Pause',
      quotes:['Recite the Quran and bring peace to your heart.','Surely, in the remembrance of Allah hearts find peace.','Read the Quran, understand it, and follow its guidance.','Establish prayer and put your trust in Allah.','Never lose hope in the mercy of Allah.','Speak truthfully and build good character.','Show kindness, forgive, and help others.','Make time for the Quran every day.','Be grateful to Allah for His blessings.','Make life beautiful through righteous deeds.']
    },
    hi: {
      home:'अल-क़ुरआन', read:'अल-क़ुरआन', listen:'अल-क़ुरआन',
      bismillah:'अत्यंत कृपाशील, दयावान अल्लाह के नाम से',
      description:'क़ुरआन मानवता के लिए मार्गदर्शन, दया और प्रकाश है। क़ुरआन पढ़ें, अर्थ समझें और उसकी शिक्षाओं पर अमल करें।',
      readOption:'क़ुरआन पढ़ें', listenOption:'क़ुरआन सुनें', search:'सूरह खोजें',
      searchPlaceholder:'सूरह का नाम या नंबर लिखें', choose:'सूरह चुनें',
      loading:'क़ुरआन लोड हो रहा है…', loadingSurah:'सूरह सूची लोड हो रही है…',
      error:'जानकारी लोड नहीं हो सकी। इंटरनेट जाँचकर फिर कोशिश करें।',
      translationError:'अनुवाद अभी लोड नहीं हो सका।', noResults:'कोई सूरह नहीं मिली।',
      ayah:'आयतें', meccan:'मक्की', medinan:'मदनी', play:'चलाएँ', pause:'रोकें',
      quotes:['क़ुरआन पढ़ें और अपने दिल को सुकून दें।','अल्लाह के ज़िक्र से दिलों को सुकून मिलता है।','क़ुरआन पढ़ें, समझें और उसकी शिक्षाओं पर अमल करें।','नमाज़ क़ायम करें और अल्लाह पर भरोसा रखें।','अल्लाह की रहमत से कभी निराश न हों।','सच बोलें और अच्छा चरित्र बनाएँ।','दया करें, माफ़ करें और दूसरों की मदद करें।','हर दिन क़ुरआन के लिए समय निकालें।','अल्लाह की नेमतों के लिए शुक्रगुज़ार रहें।','नेक अमल से जीवन सुंदर बनाएँ।']
    }
  };

  const LOCAL_NAMES = {
    bn: ['আল-ফাতিহা','আল-বাকারা','আলে ইমরান','আন-নিসা','আল-মায়িদা','আল-আনআম','আল-আরাফ','আল-আনফাল','আত-তাওবা','ইউনুস','হুদ','ইউসুফ','আর-রাদ','ইবরাহিম','আল-হিজর','আন-নাহল','বনি ইসরাইল','আল-কাহফ','মারইয়াম','ত্ব-হা','আল-আম্বিয়া','আল-হজ্জ','আল-মুমিনুন','আন-নূর','আল-ফুরকান','আশ-শুআরা','আন-নামল','আল-কাসাস','আল-আনকাবুত','আর-রূম','লুকমান','আস-সাজদা','আল-আহযাব','সাবা','ফাতির','ইয়াসিন','আস-সাফফাত','সোয়াদ','আয-যুমার','গাফির','ফুসসিলাত','আশ-শুরা','আয-যুখরুফ','আদ-দুখান','আল-জাসিয়া','আল-আহকাফ','মুহাম্মদ','আল-ফাতহ','আল-হুজুরাত','কাফ','আয-যারিয়াত','আত-তূর','আন-নাজম','আল-কামার','আর-রহমান','আল-ওয়াকিয়া','আল-হাদিদ','আল-মুজাদালা','আল-হাশর','আল-মুমতাহিনা','আস-সাফ','আল-জুমুআ','আল-মুনাফিকুন','আত-তাগাবুন','আত-তালাক','আত-তাহরিম','আল-মুলক','আল-কলম','আল-হাক্কা','আল-মাআরিজ','নূহ','আল-জিন','আল-মুযযাম্মিল','আল-মুদ্দাসসির','আল-কিয়ামা','আল-ইনসান','আল-মুরসালাত','আন-নাবা','আন-নাযিআত','আবাসা','আত-তাকভির','আল-ইনফিতার','আল-মুতাফফিফিন','আল-ইনশিকাক','আল-বুরুজ','আত-তারিক','আল-আলা','আল-গাশিয়া','আল-ফজর','আল-বালাদ','আশ-শামস','আল-লাইল','আদ-দুহা','আল-ইনশিরাহ','আত-তিন','আল-আলাক','আল-কদর','আল-বাইয়্যিনাহ','আয-যিলযাল','আল-আদিয়াত','আল-কারিআহ','আত-তাকাসুর','আল-আসর','আল-হুমাযাহ','আল-ফিল','কুরাইশ','আল-মাউন','আল-কাওসার','আল-কাফিরুন','আন-নাসর','আল-লাহাব','আল-ইখলাস','আল-ফালাক','আন-নাস'],
    hi: ['अल-फ़ातिहा','अल-बक़रा','आल-इमरान','अन-निसा','अल-माइदा','अल-अनआम','अल-आराफ़','अल-अनफ़ाल','अत-तौबा','यूनुस','हूद','यूसुफ़','अर-रअद','इब्राहीम','अल-हिज्र','अन-नहल','बनी इसराईल','अल-कहफ़','मरयम','ता-हा','अल-अंबिया','अल-हज्ज','अल-मुमिनून','अन-नूर','अल-फ़ुरक़ान','अश-शुअरा','अन-नम्ल','अल-क़सस','अल-अनकबूत','अर-रूम','लुक़मान','अस-सज्दा','अल-अहज़ाब','सबा','फ़ातिर','या-सीन','अस-साफ़्फ़ात','साद','अज़-ज़ुमर','ग़ाफ़िर','फ़ुस्सिलात','अश-शूरा','अज़-ज़ुख़रुफ़','अद-दुख़ान','अल-जासिया','अल-अहक़ाफ़','मुहम्मद','अल-फ़त्ह','अल-हुजुरात','क़ाफ़','अज़-ज़ारियात','अत-तूर','अन-नज्म','अल-क़मर','अर-रहमान','अल-वाक़िआ','अल-हदीद','अल-मुजादिला','अल-हश्र','अल-मुम्तहिना','अस-सफ़्फ़','अल-जुमुआ','अल-मुनाफ़िक़ून','अत-तग़ाबुन','अत-तलाक़','अत-तहरीम','अल-मुल्क','अल-क़लम','अल-हाक़्क़ा','अल-मआरिज','नूह','अल-जिन्न','अल-मुज़्ज़म्मिल','अल-मुद्दस्सिर','अल-क़ियामा','अल-इंसान','अल-मुरसलात','अन-नबा','अन-नाज़िआत','अबस','अत-तकवीर','अल-इन्फ़ितार','अल-मुतफ़्फ़िफ़ीन','अल-इन्शिक़ाक़','अल-बुरूज','अत-तारिक़','अल-आला','अल-ग़ाशिया','अल-फ़ज्र','अल-बलद','अश-शम्स','अल-लैल','अद-दुहा','अल-इन्शिराह','अत-तीन','अल-अलक़','अल-क़द्र','अल-बय्यिना','अज़-ज़िलज़ाल','अल-आदियात','अल-क़ारिआ','अत-तकासुर','अल-अस्र','अल-हुमज़ा','अल-फ़ील','क़ुरैश','अल-माऊन','अल-कौसर','अल-काफ़िरून','अन-नस्र','अल-मसद','अल-इख़लास','अल-फ़लक़','अन-नास']
  };

  const translationEdition = { bn:'bn.bengali', en:'en.sahih', hi:'hi.hindi' };
  const digits = { bn:'০১২৩৪৫৬৭৮৯', hi:'०१२३४५६७८९', en:'0123456789' };
  let settings = { lang:'bn', dark:false, themeColor:'classic' };
  let surahs = [], currentSurah = null, currentPage = 'home';
  let toastTimer = null, arabicSize = 30, readRequestId = 0;
  let playbackToken = 0, playbackMode = null, activeAyahKey = null;
  let currentAyahGlobal = null, currentAyahInSurah = null, pageHistory = ['home'];

  const t = key => (TEXT[settings.lang] || TEXT.bn)[key] ?? key;
  const localizedNumber = value => String(value).replace(/\d/g, d => (digits[settings.lang] || digits.en)[Number(d)]);
  const localizedName = surah => (LOCAL_NAMES[settings.lang] && LOCAL_NAMES[settings.lang][surah.number - 1]) || surah.englishName || surah.name;

  function showMessage(message) {
    els.message.textContent = message;
    els.message.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.message.classList.remove('show'), 3000);
  }

  function readSettings() {
    try {
      settings = { ...settings, ...JSON.parse(localStorage.getItem('appSettings') || '{}') };
    } catch (_) {}

    if (!['bn','en','hi'].includes(settings.lang)) settings.lang = 'bn';
    if (!['classic','royal','rose','pista'].includes(settings.themeColor)) settings.themeColor = 'classic';
    settings.dark = Boolean(settings.dark);
  }

  function applyTheme() {
    document.body.dataset.colorTheme = settings.themeColor;
    document.body.classList.toggle('dark-mode', settings.dark);
    document.documentElement.style.colorScheme = settings.dark ? 'dark' : 'light';
  }

  function renderQuoteMarquee() {
    const track = $('quoteMarquee');
    track.innerHTML = [...t('quotes'), ...t('quotes')].map(x => `<span>${escapeHTML(x)}</span>`).join('');
  }

  function applyLabels() {
    document.documentElement.lang = settings.lang;
    $('bismillahTranslation').textContent = t('bismillah');
    $('quranDescription').textContent = t('description');
    $('readOptionLabel').textContent = t('readOption');
    $('listenOptionLabel').textContent = t('listenOption');
    els.searchToggle.setAttribute('aria-label', t('search'));
    els.searchInput.placeholder = t('searchPlaceholder');
    $('surahListLoading').textContent = t('loadingSurah');
    $('listenLoading').textContent = t('loadingSurah');
    $('readLoading').textContent = t('loading');
    renderQuoteMarquee();
    updatePageTitle();

    if (surahs.length) {
      renderSurahList();
      renderListenList();
    }

    updateFooterMessage();
  }

  function updatePageTitle() {
    els.title.textContent = t(currentPage);
  }

  function setPage(page, options = {}) {
    const { push = true, replace = false } = options;
    if (!['home','read','listen'].includes(page)) page = 'home';
    if (page === currentPage && !push) return;

    currentPage = page;
    els.home.classList.toggle('active', page === 'home');
    els.read.classList.toggle('active', page === 'read');
    els.listen.classList.toggle('active', page === 'listen');
    els.homeFooter.classList.toggle('active', page === 'home');
    els.readFooter.classList.toggle('active', page === 'read');
    els.listenFooter.classList.toggle('active', page === 'listen');

    updatePageTitle();

    if (push) {
      const state = { quranPage:page };
      if (replace) history.replaceState(state, '', `#quran-${page}`);
      else history.pushState(state, '', `#quran-${page}`);
      pageHistory.push(page);
    }

    if (page === 'read' && !currentSurah && surahs.length) loadSurah(1);
    updateFooterMessage();
  }

  async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json.code && json.code !== 200) throw new Error(json.status || 'API error');
    return json.data;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  }

  function renderSurahList() {
    if (!surahs.length) return;
    const query = (els.searchInput.value || '').trim().toLocaleLowerCase();

    const filtered = surahs.filter(s => {
      const number = String(s.number);
      return !query || number.includes(query) || localizedNumber(number).includes(query) ||
        localizedName(s).toLocaleLowerCase().includes(query) ||
        (s.englishName || '').toLocaleLowerCase().includes(query) || (s.name || '').includes(query);
    });

    if (!filtered.length) {
      els.surahList.innerHTML = `<div class="empty-state">${escapeHTML(t('noResults'))}</div>`;
      return;
    }

    els.surahList.innerHTML = filtered.map(s => `
      <button type="button" class="surah-item${currentSurah?.number === s.number ? ' selected' : ''}" data-surah="${s.number}">
        <span class="surah-number">${localizedNumber(s.number)}</span>
        <span class="surah-item-text">
          <span class="surah-item-name">${escapeHTML(localizedName(s))}</span>
          <span class="surah-item-meta">${localizedNumber(s.numberOfAyahs)} ${t('ayah')}</span>
        </span>
        <span class="surah-item-arabic" lang="ar">${escapeHTML(s.name)}</span>
      </button>`).join('');

    els.surahList.querySelectorAll('[data-surah]').forEach(b =>
      b.addEventListener('click', () => { closeSearchPanel(); loadSurah(Number(b.dataset.surah)); })
    );
  }

  function renderListenList() {
    if (!surahs.length) return;

    els.listenList.innerHTML = surahs.map(s => `
      <button type="button" class="listen-item${currentSurah?.number === s.number ? ' selected' : ''}" data-surah="${s.number}">
        <span class="surah-number">${localizedNumber(s.number)}</span>
        <span class="surah-item-text">
          <span class="surah-item-name">${escapeHTML(localizedName(s))}</span>
          <span class="surah-item-meta">${localizedNumber(s.numberOfAyahs)} ${t('ayah')} · ${s.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</span>
        </span>
        <span class="listen-play-icon" aria-hidden="true">▶</span>
      </button>`).join('');

    els.listenList.querySelectorAll('[data-surah]').forEach(b =>
      b.addEventListener('click', () => playSurah(Number(b.dataset.surah)))
    );
  }

  function stopPlayback() {
    playbackToken++;
    playbackMode = null;
    currentAyahGlobal = null;
    currentAyahInSurah = null;
    els.audio.pause();
    els.audio.removeAttribute('src');
    els.audio.load();
    clearAyahHighlight();
  }

  function clearAyahHighlight() {
    document.querySelectorAll('.ayah.is-playing').forEach(node => node.classList.remove('is-playing'));
    activeAyahKey = null;
  }

  function highlightAyah(surahNo, ayahNo) {
    clearAyahHighlight();
    const node = $(`ayah-${surahNo}-${ayahNo}`);
    if (node) {
      node.classList.add('is-playing');
      activeAyahKey = `${surahNo}:${ayahNo}`;
      node.scrollIntoView({ block:'nearest', behavior:'smooth' });
    }
  }

  async function loadSurah(number, scrollTop = true) {
    const surah = surahs.find(s => s.number === number);
    if (!surah) return;

    const requestId = ++readRequestId;
    currentSurah = surah;
    renderSurahList();
    renderListenList();
    updateFooterMessage();
    els.readContent.innerHTML = `<div class="loading">${escapeHTML(t('loading'))}</div>`;

    try {
      const edition = translationEdition[settings.lang] || translationEdition.bn;
      const [arabicData, translationData] = await Promise.all([
        fetchJSON(`${API}/surah/${number}/quran-uthmani`),
        fetchJSON(`${API}/surah/${number}/${edition}`).catch(() => null)
      ]);

      if (requestId !== readRequestId) return;
      if (!Array.isArray(arabicData.ayahs) || arabicData.ayahs.length !== surah.numberOfAyahs) {
        throw new Error('Ayah count mismatch');
      }

      const translations = translationData?.ayahs || [];
      const heading = `<div class="surah-heading">
        <h2>${localizedNumber(number)}. ${escapeHTML(localizedName(surah))}</h2>
        <p>${surah.revelationType === 'Meccan' ? t('meccan') : t('medinan')} · ${localizedNumber(surah.numberOfAyahs)} ${t('ayah')}</p>
        ${number !== 1 && number !== 9 ? '<div class="surah-bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>' : ''}
      </div>`;

      const ayahs = arabicData.ayahs.map((ayah, index) => `
        <section class="ayah" id="ayah-${number}-${ayah.numberInSurah}" data-global-ayah="${ayah.number}">
          <div class="ayah-top">
            <span class="ayah-number">${localizedNumber(ayah.numberInSurah)}</span>
            <button type="button" class="ayah-play" data-global-ayah="${ayah.number}" data-surah="${number}" data-ayah-no="${ayah.numberInSurah}" aria-label="Play ayah ${ayah.numberInSurah}">▶</button>
          </div>
          <div class="ayah-arabic" lang="ar" dir="rtl">${escapeHTML(ayah.text)}</div>
          ${translations[index] ? `<div class="ayah-translation">${escapeHTML(translations[index].text)}</div>` : `<div class="ayah-translation translation-unavailable">${escapeHTML(t('translationError'))}</div>`}
        </section>`).join('');

      els.readContent.innerHTML = heading + ayahs;

      els.readContent.querySelectorAll('[data-global-ayah]').forEach(button => {
        if (button.tagName !== 'BUTTON') return;
        button.addEventListener('click', () =>
          playSingleAyah(Number(button.dataset.globalAyah), Number(button.dataset.surah), Number(button.dataset.ayahNo))
        );
      });

      if (scrollTop) els.readContent.scrollTop = 0;
      if (currentAyahInSurah && playbackMode) highlightAyah(currentSurah.number, currentAyahInSurah);
      renderSurahList();
      updateFooterMessage();
    } catch (_) {
      if (requestId !== readRequestId) return;
      els.readContent.innerHTML = `<div class="empty-state">${escapeHTML(t('error'))}</div>`;
      showMessage(t('error'));
    }
  }

  function updateFooterMessage() {
    els.readFooterMessage.textContent = currentSurah ? `${localizedNumber(currentSurah.number)}. ${localizedName(currentSurah)}` : t('choose');
    els.prevAyah.disabled = !currentSurah || currentSurah.number <= 1;
    els.nextAyah.disabled = !currentSurah || currentSurah.number >= 114;
    els.prevTrack.disabled = !currentSurah || currentSurah.number <= 1;
    els.nextTrack.disabled = !currentSurah || currentSurah.number >= 114;
  }

  function moveSurah(delta, page) {
    const number = currentSurah ? currentSurah.number : 1;
    const next = Math.max(1, Math.min(114, number + delta));
    if (next === number && currentSurah) return;
    if (page === 'listen') playSurah(next);
    else loadSurah(next);
  }

  async function loadAndPlayGlobalAyah(globalAyah, surahNo, ayahNo, token, mode) {
    if (token !== playbackToken) return;

    try {
      const data = await fetchJSON(`${AYAH_AUDIO}${globalAyah}/ar.alafasy`);
      if (token !== playbackToken) return;
      if (!data?.audio) throw new Error('Audio URL missing');

      currentAyahGlobal = globalAyah;
      currentAyahInSurah = ayahNo;
      currentSurah = surahs.find(s => s.number === surahNo) || currentSurah;

      highlightAyah(surahNo, ayahNo);
      renderListenList();
      renderSurahList();
      updateFooterMessage();

      els.audio.src = data.audio;
      await els.audio.play();
    } catch (_) {
      if (token === playbackToken) {
        showMessage(t('error'));
        playbackMode = null;
      }
    }
  }

  function playSingleAyah(globalAyah, surahNo, ayahNo) {
    stopPlayback();
    playbackMode = 'single';
    const token = playbackToken;
    currentSurah = surahs.find(s => s.number === surahNo) || currentSurah;
    if (currentPage !== 'read') setPage('read');
    loadAndPlayGlobalAyah(globalAyah, surahNo, ayahNo, token, 'single');
  }

  function playSurah(number) {
    const surah = surahs.find(s => s.number === number);
    if (!surah) return;

    stopPlayback();
    currentSurah = surah;
    playbackMode = 'surah';
    renderListenList();
    renderSurahList();
    updateFooterMessage();
    setPage('listen');

    const token = playbackToken;
    const firstGlobalAyah = surah.number === 1 ? 1 : surah.startingAyah || null;

    if (firstGlobalAyah) {
      loadAndPlayGlobalAyah(firstGlobalAyah, number, 1, token, 'surah');
    } else {
      fetchJSON(`${API}/surah/${number}/quran-uthmani`).then(data => {
        if (token !== playbackToken) return;
        const first = data.ayahs?.[0];
        if (!first?.number) throw new Error('First ayah missing');
        return loadAndPlayGlobalAyah(first.number, number, 1, token, 'surah');
      }).catch(() => {
        if (token === playbackToken) showMessage(t('error'));
      });
    }
  }

  async function onAudioEnded() {
    const token = playbackToken;
    if (!playbackMode || !currentAyahGlobal || token < 0) return;

    if (playbackMode === 'single') {
      playbackMode = null;
      currentAyahGlobal = null;
      currentAyahInSurah = null;
      return;
    }

    const surah = currentSurah;
    if (!surah) return;

    if (currentAyahInSurah < surah.numberOfAyahs) {
      await loadAndPlayGlobalAyah(
        currentAyahGlobal + 1,
        surah.number,
        currentAyahInSurah + 1,
        token,
        'surah'
      );
      return;
    }

    if (surah.number < 114) {
      playSurah(surah.number + 1);
    } else {
      playbackMode = null;
      currentAyahGlobal = null;
      currentAyahInSurah = null;
      clearAyahHighlight();
    }
  }

  function togglePlayback() {
    if (!els.audio.src) {
      if (currentSurah) playSurah(currentSurah.number);
      else if (surahs.length) playSurah(1);
      return;
    }

    if (els.audio.paused) els.audio.play().catch(() => showMessage(t('error')));
    else els.audio.pause();
  }

  function changeFont(delta) {
    arabicSize = Math.max(20, Math.min(48, arabicSize + delta));
    document.documentElement.style.setProperty('--arabic-size', `${arabicSize}px`);
  }

  function openSearchPanel() {
    els.searchPanel.hidden = false;
    els.readLayout.classList.add('search-open');
    els.searchToggle.setAttribute('aria-expanded','true');
    renderSurahList();
    els.searchInput.focus({ preventScroll:true });
  }

  function closeSearchPanel() {
    els.searchPanel.hidden = true;
    els.readLayout.classList.remove('search-open');
    els.searchToggle.setAttribute('aria-expanded','false');
    els.searchInput.value = '';
    renderSurahList();
  }

  function toggleSearchPanel() {
    if (els.searchPanel.hidden) openSearchPanel();
    else closeSearchPanel();
  }

  function init() {
    readSettings();
    applyTheme();
    applyLabels();

    els.homeRead.addEventListener('click', () => setPage('read'));
    els.homeListen.addEventListener('click', () => setPage('listen'));
    els.searchToggle.addEventListener('click', toggleSearchPanel);
    els.searchInput.addEventListener('input', renderSurahList);

    els.clearSearch.addEventListener('click', () => {
      els.searchInput.value = '';
      renderSurahList();
      els.searchInput.focus({ preventScroll:true });
    });

    els.fontDown.addEventListener('click', () => changeFont(-2));
    els.fontUp.addEventListener('click', () => changeFont(2));
    els.prevAyah.addEventListener('click', () => moveSurah(-1,'read'));
    els.nextAyah.addEventListener('click', () => moveSurah(1,'read'));
    els.prevTrack.addEventListener('click', () => moveSurah(-1,'listen'));
    els.nextTrack.addEventListener('click', () => moveSurah(1,'listen'));
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
      const page = event.state?.quranPage ||
        (location.hash === '#quran-read' ? 'read' :
        location.hash === '#quran-listen' ? 'listen' : 'home');

      pageHistory = pageHistory.slice(0,-1);
      if (!pageHistory.length) pageHistory = ['home'];
      setPage(page,{push:false});
    });

    window.addEventListener('storage', event => {
      if (event.key === 'appSettings' || event.key === null) {
        readSettings();
        applyTheme();
        applyLabels();
        if (currentPage === 'read' && currentSurah) loadSurah(currentSurah.number,false);
      }
    });

    fetchJSON(`${API}/surah`).then(data => {
      if (!Array.isArray(data) || data.length !== 114) throw new Error('Surah list invalid');
      surahs = data;
      renderSurahList();
      renderListenList();

      const requestedPage =
        location.hash === '#quran-read' ? 'read' :
        location.hash === '#quran-listen' ? 'listen' : 'home';

      if (requestedPage !== 'home') setPage(requestedPage,{push:false});
      if (currentPage === 'read') loadSurah(1);
    }).catch(() => {
      $('surahListLoading').textContent = t('error');
      $('listenLoading').textContent = t('error');
      $('readLoading').textContent = t('error');
      showMessage(t('error'));
    });
  }

  init();
})();
