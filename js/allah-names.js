const lang = localStorage.getItem("appLang") || "bn";

const names = [
{ar:"الله",bn:"আল্লাহ",bn_mean:"সকল গুণের অধিকারী একমাত্র স্রষ্টা",en:"Allah",en_mean:"The One True God",hi:"अल्लाह",hi_mean:"एकमात्र ईश्वर"},
{ar:"الرَّحْمَٰن",bn:"আর-রহমান",bn_mean:"পরম দয়ালু",en:"Ar-Rahman",en_mean:"The Most Merciful",hi:"अर-रहमान",hi_mean:"सबसे दयालु"},
{ar:"الرَّحِيم",bn:"আর-রহীম",bn_mean:"অত্যন্ত করুণাময়",en:"Ar-Raheem",en_mean:"The Most Compassionate",hi:"अर-रहीम",hi_mean:"अत्यंत कृपालु"},
{ar:"الْمَلِك",bn:"আল-মালিক",bn_mean:"সমস্ত জগতের অধিপতি",en:"Al-Malik",en_mean:"The King",hi:"अल-मलिक",hi_mean:"संसार का बादशाह"},
{ar:"الْقُدُّوس",bn:"আল-কুদ্দুস",bn_mean:"অত্যন্ত পবিত্র",en:"Al-Quddus",en_mean:"The Most Holy",hi:"अल-कुद्दूस",hi_mean:"सबसे पवित्र"},
{ar:"السَّلَام",bn:"আস-সালাম",bn_mean:"শান্তির উৎস",en:"As-Salam",en_mean:"The Source of Peace",hi:"अस-सलाम",hi_mean:"शांति का स्रोत"},
{ar:"الْمُؤْمِن",bn:"আল-মু’মিন",bn_mean:"নিরাপত্তা দানকারী",en:"Al-Mu'min",en_mean:"The Giver of Faith",hi:"अल-मुमिन",hi_mean:"ईमान देने वाला"},
{ar:"الْمُهَيْمِن",bn:"আল-মুহাইমিন",bn_mean:"রক্ষাকারী",en:"Al-Muhaymin",en_mean:"The Protector",hi:"अल-मुहैमिन",hi_mean:"संरक्षक"},
{ar:"الْعَزِيز",bn:"আল-আজিজ",bn_mean:"পরাক্রমশালী",en:"Al-Aziz",en_mean:"The Mighty",hi:"अल-अज़ीज़",hi_mean:"सबसे शक्तिशाली"},
{ar:"الْجَبَّار",bn:"আল-জব্বার",bn_mean:"মহা ক্ষমতাবান",en:"Al-Jabbar",en_mean:"The Powerful",hi:"अल-जबार",hi_mean:"महाशक्तिशाली"},
{ar:"الْمُتَكَبِّر",bn:"আল-মুতাকাব্বির",bn_mean:"মহা গৌরবময়",en:"Al-Mutakabbir",en_mean:"The Supreme",hi:"अल-मुतकब्बिर",hi_mean:"सबसे महान"},

{ar:"الْخَالِق",bn:"আল-খালিক",bn_mean:"সৃষ্টিকর্তা",en:"Al-Khaliq",en_mean:"The Creator",hi:"अल-खालिक",hi_mean:"सृष्टिकर्ता"},
{ar:"الْبَارِئ",bn:"আল-বারি",bn_mean:"সৃষ্টির পরিকল্পনাকারী",en:"Al-Bari",en_mean:"The Maker",hi:"अल-बारी",hi_mean:"रचयिता"},
{ar:"الْمُصَوِّر",bn:"আল-মুসাওয়ির",bn_mean:"রূপদানকারী",en:"Al-Musawwir",en_mean:"The Fashioner",hi:"अल-मुसव्विर",hi_mean:"रूप देने वाला"},
{ar:"الْغَفَّار",bn:"আল-গফ্ফার",bn_mean:"অত্যন্ত ক্ষমাশীল",en:"Al-Ghaffar",en_mean:"The Forgiver",hi:"अल-गफ्फार",hi_mean:"माफ़ करने वाला"},
{ar:"الْقَهَّار",bn:"আল-কাহ্হার",bn_mean:"পরাক্রমে সকলকে পরাজিতকারী",en:"Al-Qahhar",en_mean:"The Subduer",hi:"अल-कह्हार",hi_mean:"सबको परास्त करने वाला"},
{ar:"الْوَهَّاب",bn:"আল-ওয়াহ্হাব",bn_mean:"অপরিমিত দানকারী",en:"Al-Wahhab",en_mean:"The Bestower",hi:"अल-वह्हाब",hi_mean:"सब देने वाला"},
{ar:"الرَّزَّاق",bn:"আর-রজ্জাক",bn_mean:"রিজিকদাতা",en:"Ar-Razzaq",en_mean:"The Provider",hi:"अर-रज्जाक",hi_mean:"रोज़ी देने वाला"},
{ar:"الْفَتَّاح",bn:"আল-ফাত্তাহ",bn_mean:"বিজয় দানকারী",en:"Al-Fattah",en_mean:"The Opener",hi:"अल-फत्ताह",hi_mean:"विजय देने वाला"},
{ar:"الْعَلِيم",bn:"আল-আলীম",bn_mean:"সর্বজ্ঞ",en:"Al-Alim",en_mean:"The All Knowing",hi:"अल-अलीम",hi_mean:"सब जानने वाला"},
{ar:"الْقَابِض",bn:"আল-কাবিদ",bn_mean:"সংকোচনকারী",en:"Al-Qabid",en_mean:"The Restrainer",hi:"अल-काबिद",hi_mean:"रोकने वाला"},

{ar:"الْبَاسِط",bn:"আল-বাসিত",bn_mean:"প্রসারণকারী",en:"Al-Basit",en_mean:"The Expander",hi:"अल-बासित",hi_mean:"फैलाने वाला"},
{ar:"الْخَافِض",bn:"আল-খাফিদ",bn_mean:"অবনতকারী",en:"Al-Khafid",en_mean:"The Abaser",hi:"अल-खाफिद",hi_mean:"नीचा करने वाला"},
{ar:"الرَّافِع",bn:"আর-রাফি",bn_mean:"উন্নতকারী",en:"Ar-Rafi",en_mean:"The Exalter",hi:"अर-राफ़ी",hi_mean:"ऊँचा उठाने वाला"},
{ar:"الْمُعِز",bn:"আল-মুইজ",bn_mean:"সম্মানদানকারী",en:"Al-Muizz",en_mean:"The Honourer",hi:"अल-मुइज़",hi_mean:"सम्मान देने वाला"},
{ar:"الْمُذِل",bn:"আল-মুজিল",bn_mean:"অপমানকারী",en:"Al-Muzil",en_mean:"The Dishonourer",hi:"अल-मुज़िल",hi_mean:"अपमान करने वाला"},
{ar:"السَّمِيع",bn:"আস-সামি",bn_mean:"সব শোনেন যিনি",en:"As-Sami",en_mean:"The All Hearing",hi:"अस-समी",hi_mean:"सब सुनने वाला"},
{ar:"الْبَصِير",bn:"আল-বাছির",bn_mean:"সব দেখেন যিনি",en:"Al-Basir",en_mean:"The All Seeing",hi:"अल-बसीर",hi_mean:"सब देखने वाला"},
{ar:"الْحَكَم",bn:"আল-হাকাম",bn_mean:"সর্বোত্তম বিচারক",en:"Al-Hakam",en_mean:"The Judge",hi:"अल-हकम",hi_mean:"न्याय करने वाला"},
{ar:"الْعَدْل",bn:"আল-আদল",bn_mean:"পরম ন্যায়বিচারক",en:"Al-Adl",en_mean:"The Just",hi:"अल-अदल",hi_mean:"न्यायप्रिय"},
{ar:"اللَّطِيف",bn:"আল-লতিফ",bn_mean:"অত্যন্ত দয়ালু",en:"Al-Latif",en_mean:"The Gentle",hi:"अल-लतीफ़",hi_mean:"कोमल"},

{ar:"الْخَبِير",bn:"আল-খবির",bn_mean:"সবকিছুর খবর রাখেন",en:"Al-Khabir",en_mean:"The Aware",hi:"अल-खबीर",hi_mean:"सब जानने वाला"},
{ar:"الْحَلِيم",bn:"আল-হালিম",bn_mean:"অত্যন্ত সহনশীল",en:"Al-Halim",en_mean:"The Forbearing",hi:"अल-हलीम",hi_mean:"धैर्यवान"},
{ar:"الْعَظِيم",bn:"আল-আজীম",bn_mean:"মহান",en:"Al-Azim",en_mean:"The Magnificent",hi:"अल-अज़ीम",hi_mean:"महान"},
{ar:"الْغَفُور",bn:"আল-গফুর",bn_mean:"অত্যন্ত ক্ষমাশীল",en:"Al-Ghafur",en_mean:"The Forgiving",hi:"अल-गफूर",hi_mean:"क्षमाशील"},
{ar:"الشَّكُور",bn:"আশ-শাকুর",bn_mean:"কৃতজ্ঞতা গ্রহণকারী",en:"Ash-Shakur",en_mean:"The Appreciative",hi:"अश-शकूर",hi_mean:"कृतज्ञ"},
{ar:"الْعَلِي",bn:"আল-আলি",bn_mean:"অত্যন্ত উচ্চ",en:"Al-Ali",en_mean:"The Most High",hi:"अल-अली",hi_mean:"सबसे ऊँचा"},
{ar:"الْكَبِير",bn:"আল-কবির",bn_mean:"মহানতম",en:"Al-Kabir",en_mean:"The Great",hi:"अल-कबीर",hi_mean:"महान"},
{ar:"الْحَفِيظ",bn:"আল-হাফিজ",bn_mean:"রক্ষাকারী",en:"Al-Hafiz",en_mean:"The Preserver",hi:"अल-हफ़ीज़",hi_mean:"रक्षक"},
{ar:"الْمُقِيت",bn:"আল-মুকিত",bn_mean:"জীবিকা দানকারী",en:"Al-Muqit",en_mean:"The Sustainer",hi:"अल-मुकीत",hi_mean:"पालन करने वाला"},
{ar:"الْحَسِيب",bn:"আল-হাসিব",bn_mean:"হিসাব গ্রহণকারী",en:"Al-Hasib",en_mean:"The Reckoner",hi:"अल-हसीब",hi_mean:"हिसाब लेने वाला"}
{ar:"الْجَلِيل",bn:"আল-জালিল",bn_mean:"মহিমান্বিত",en:"Al-Jalil",en_mean:"The Majestic",hi:"अल-जलील",hi_mean:"महिमामय"},
{ar:"الْكَرِيم",bn:"আল-করিম",bn_mean:"অত্যন্ত দানশীল",en:"Al-Karim",en_mean:"The Generous",hi:"अल-करीम",hi_mean:"उदार"},
{ar:"الرَّقِيب",bn:"আর-রকিব",bn_mean:"সর্বদা পর্যবেক্ষণকারী",en:"Ar-Raqib",en_mean:"The Watchful",hi:"अर-रकीब",hi_mean:"निगरानी करने वाला"},
{ar:"الْمُجِيب",bn:"আল-মুজিব",bn_mean:"দোয়া কবুলকারী",en:"Al-Mujib",en_mean:"The Responsive",hi:"अल-मुजीब",hi_mean:"दुआ कबूल करने वाला"},
{ar:"الْوَاسِع",bn:"আল-ওয়াসি",bn_mean:"অপরিসীম",en:"Al-Wasi",en_mean:"The Vast",hi:"अल-वासी",hi_mean:"असीम"},
{ar:"الْحَكِيم",bn:"আল-হাকিম",bn_mean:"পরম প্রজ্ঞাময়",en:"Al-Hakim",en_mean:"The Wise",hi:"अल-हकीम",hi_mean:"बुद्धिमान"},
{ar:"الْوَدُود",bn:"আল-ওয়াদুদ",bn_mean:"অত্যন্ত প্রেমময়",en:"Al-Wadud",en_mean:"The Loving",hi:"अल-वदूद",hi_mean:"प्रेम करने वाला"},
{ar:"الْمَجِيد",bn:"আল-মাজিদ",bn_mean:"মহিমান্বিত",en:"Al-Majid",en_mean:"The Glorious",hi:"अल-मजीद",hi_mean:"महिमामय"},
{ar:"الْبَاعِث",bn:"আল-বাইস",bn_mean:"পুনরুত্থানকারী",en:"Al-Ba'ith",en_mean:"The Resurrector",hi:"अल-बाइस",hi_mean:"पुनर्जीवित करने वाला"},
{ar:"الشَّهِيد",bn:"আশ-শাহিদ",bn_mean:"সর্বদা সাক্ষী",en:"Ash-Shahid",en_mean:"The Witness",hi:"अश-शहीद",hi_mean:"साक्षी"},
{ar:"الْحَق",bn:"আল-হক",bn_mean:"চির সত্য",en:"Al-Haqq",en_mean:"The Absolute Truth",hi:"अल-हक़",hi_mean:"पूर्ण सत्य"},
{ar:"الْوَكِيل",bn:"আল-ওয়াকিল",bn_mean:"অভিভাবক",en:"Al-Wakeel",en_mean:"The Trustee",hi:"अल-वकील",hi_mean:"संरक्षक"},
{ar:"الْقَوِي",bn:"আল-কাওয়ি",bn_mean:"অত্যন্ত শক্তিশালী",en:"Al-Qawiyy",en_mean:"The Most Strong",hi:"अल-क़वी",hi_mean:"सबसे शक्तिशाली"},
{ar:"الْمَتِين",bn:"আল-মাতিন",bn_mean:"অটল শক্তিধর",en:"Al-Mateen",en_mean:"The Firm",hi:"अल-मतीन",hi_mean:"अटूट शक्तिशाली"},
{ar:"الْوَلِي",bn:"আল-ওয়ালি",bn_mean:"অভিভাবক",en:"Al-Waliyy",en_mean:"The Protecting Friend",hi:"अल-वली",hi_mean:"रक्षक"},
{ar:"الْحَمِيد",bn:"আল-হামিদ",bn_mean:"প্রশংসার যোগ্য",en:"Al-Hameed",en_mean:"The Praiseworthy",hi:"अल-हमीद",hi_mean:"प्रशंसा के योग्य"},
{ar:"الْمُحْصِي",bn:"আল-মুহসি",bn_mean:"সবকিছু গণনাকারী",en:"Al-Muhsi",en_mean:"The Reckoner",hi:"अल-मुह्सी",hi_mean:"गणना करने वाला"},
{ar:"الْمُبْدِئ",bn:"আল-মুবদি",bn_mean:"সৃষ্টি শুরু করেন যিনি",en:"Al-Mubdi",en_mean:"The Originator",hi:"अल-मुबदी",hi_mean:"सृष्टि प्रारंभ करने वाला"},
{ar:"الْمُعِيد",bn:"আল-মুইদ",bn_mean:"পুনরায় সৃষ্টি করেন",en:"Al-Mueed",en_mean:"The Restorer",hi:"अल-मुईद",hi_mean:"पुनः सृजन करने वाला"},
{ar:"الْمُحْيِي",bn:"আল-মুহই",bn_mean:"জীবনদানকারী",en:"Al-Muhyi",en_mean:"The Giver of Life",hi:"अल-मुहयी",hi_mean:"जीवन देने वाला"},
{ar:"الْمُمِيت",bn:"আল-মুমিত",bn_mean:"মৃত্যুদানকারী",en:"Al-Mumeet",en_mean:"The Bringer of Death",hi:"अल-मुमीत",hi_mean:"मृत्यु देने वाला"},
{ar:"الْحَي",bn:"আল-হাই",bn_mean:"চিরঞ্জীব",en:"Al-Hayy",en_mean:"The Ever Living",hi:"अल-हय्य",hi_mean:"सदैव जीवित"},
{ar:"الْقَيُّوم",bn:"আল-কাইয়্যুম",bn_mean:"সবকিছুর ধারক",en:"Al-Qayyum",en_mean:"The Self Existing",hi:"अल-कय्यूम",hi_mean:"स्वयं स्थित"},
{ar:"الْوَاجِد",bn:"আল-ওয়াজিদ",bn_mean:"অভাবহীন",en:"Al-Wajid",en_mean:"The Finder",hi:"अल-वाजिद",hi_mean:"सब पाने वाला"},
{ar:"الْمَاجِد",bn:"আল-মাজিদ",bn_mean:"মহান",en:"Al-Majid",en_mean:"The Noble",hi:"अल-माजिद",hi_mean:"महान"},
{ar:"الْوَاحِد",bn:"আল-ওয়াহিদ",bn_mean:"একক",en:"Al-Wahid",en_mean:"The One",hi:"अल-वाहिद",hi_mean:"एकमात्र"},
{ar:"الصَّمَد",bn:"আস-সামাদ",bn_mean:"অমুখাপেক্ষী",en:"As-Samad",en_mean:"The Eternal",hi:"अस-समद",hi_mean:"निरपेक्ष"},
{ar:"الْقَادِر",bn:"আল-কাদির",bn_mean:"সর্বশক্তিমান",en:"Al-Qadir",en_mean:"The Able",hi:"अल-कादिर",hi_mean:"सर्वशक्तिमान"},
{ar:"الْمُقْتَدِر",bn:"আল-মুকতাদির",bn_mean:"ক্ষমতাধর",en:"Al-Muqtadir",en_mean:"The Powerful",hi:"अल-मुक्तदिर",hi_mean:"सामर्थ्यवान"},
{ar:"الْمُقَدِّم",bn:"আল-মুকাদ্দিম",bn_mean:"অগ্রগামী করেন",en:"Al-Muqaddim",en_mean:"The Expediter",hi:"अल-मुकद्दिम",hi_mean:"आगे बढ़ाने वाला"},
{ar:"الْمُؤَخِّر",bn:"আল-মুয়াখখির",bn_mean:"পিছিয়ে দেন",en:"Al-Muakhkhir",en_mean:"The Delayer",hi:"अल-मुअख्खिर",hi_mean:"पीछे करने वाला"},
{ar:"الأوَّل",bn:"আল-আউয়াল",bn_mean:"প্রথম",en:"Al-Awwal",en_mean:"The First",hi:"अल-अव्वल",hi_mean:"प्रथम"},
{ar:"الآخِر",bn:"আল-আখির",bn_mean:"শেষ",en:"Al-Akhir",en_mean:"The Last",hi:"अल-आख़िर",hi_mean:"अंतिम"},
{ar:"الظَّاهِر",bn:"আয-জাহির",bn_mean:"প্রকাশ্য",en:"Az-Zahir",en_mean:"The Manifest",hi:"अज़-ज़ाहिर",hi_mean:"प्रकट"},
{ar:"الْبَاطِن",bn:"আল-বাতিন",bn_mean:"অদৃশ্য",en:"Al-Batin",en_mean:"The Hidden",hi:"अल-बातिन",hi_mean:"अदृश्य"},
{ar:"الْوَالِي",bn:"আল-ওয়ালি",bn_mean:"অধিপতি",en:"Al-Wali",en_mean:"The Governor",hi:"अल-वाली",hi_mean:"शासक"},
{ar:"الْمُتَعَالِي",bn:"আল-মুতাআলি",bn_mean:"অত্যন্ত উচ্চ",en:"Al-Muta'ali",en_mean:"The Most Exalted",hi:"अल-मुतआली",hi_mean:"सबसे ऊँचा"},
{ar:"الْبَر",bn:"আল-বার",bn_mean:"পরম দয়ালু",en:"Al-Barr",en_mean:"The Source of Goodness",hi:"अल-बर्र",hi_mean:"भलाई करने वाला"},
{ar:"التَّوَّاب",bn:"আত-তাওয়াব",bn_mean:"তওবা কবুলকারী",en:"At-Tawwab",en_mean:"The Accepter of Repentance",hi:"अत-तव्वाब",hi_mean:"तौबा कबूल करने वाला"},
{ar:"الْمُنْتَقِم",bn:"আল-মুনতাকিম",bn_mean:"প্রতিশোধ গ্রহণকারী",en:"Al-Muntaqim",en_mean:"The Avenger",hi:"अल-मुन्तक़िम",hi_mean:"प्रतिशोध लेने वाला"},
{ar:"العَفُو",bn:"আল-আফুউ",bn_mean:"ক্ষমাকারী",en:"Al-Afuw",en_mean:"The Pardoner",hi:"अल-अफ़ुव",hi_mean:"माफ़ करने वाला"},
{ar:"الرَّؤُوف",bn:"আর-রউফ",bn_mean:"অত্যন্ত দয়ালু",en:"Ar-Ra'uf",en_mean:"The Compassionate",hi:"अर-रऊफ़",hi_mean:"दयालु"},
{ar:"مَالِكُ الْمُلْك",bn:"মালিকুল মুলক",bn_mean:"সমস্ত রাজত্বের মালিক",en:"Malik-ul-Mulk",en_mean:"Owner of the Kingdom",hi:"मालिकुल मुल्क",hi_mean:"संसार का मालिक"},
{ar:"ذُو الْجَلَالِ وَالإِكْرَام",bn:"যুল-জালালি ওয়াল ইকরাম",bn_mean:"মহিমা ও সম্মানের অধিকারী",en:"Dhul-Jalali wal-Ikram",en_mean:"Lord of Glory and Honour",hi:"ज़ुल जलाली वल इकराम",hi_mean:"महिमा और सम्मान वाला"},
{ar:"الْمُقْسِط",bn:"আল-মুকসিত",bn_mean:"ন্যায়বিচারক",en:"Al-Muqsit",en_mean:"The Just One",hi:"अल-मुक्सित",hi_mean:"न्याय करने वाला"},
{ar:"الْجَامِع",bn:"আল-জামি",bn_mean:"একত্রকারী",en:"Al-Jami",en_mean:"The Gatherer",hi:"अल-जामि",hi_mean:"इकट्ठा करने वाला"},
{ar:"الْغَنِي",bn:"আল-গনি",bn_mean:"অভাবমুক্ত",en:"Al-Ghani",en_mean:"The Self Sufficient",hi:"अल-गनी",hi_mean:"निरपेक्ष"},
{ar:"الْمُغْنِي",bn:"আল-মুগনি",bn_mean:"সম্পদ দানকারী",en:"Al-Mughni",en_mean:"The Enricher",hi:"अल-मुग़नी",hi_mean:"धन देने वाला"},
{ar:"الْمَانِع",bn:"আল-মানি",bn_mean:"প্রতিরোধকারী",en:"Al-Mani",en_mean:"The Preventer",hi:"अल-मानी",hi_mean:"रोकने वाला"},
{ar:"الضَّار",bn:"আদ-দার",bn_mean:"ক্ষতি দানকারী",en:"Ad-Darr",en_mean:"The Distresser",hi:"अद-दर",hi_mean:"हानि पहुँचाने वाला"},
{ar:"النَّافِع",bn:"আন-নাফি",bn_mean:"উপকারকারী",en:"An-Nafi",en_mean:"The Benefactor",hi:"अन-नाफ़ि",hi_mean:"लाभ देने वाला"},
{ar:"النُّور",bn:"আন-নূর",bn_mean:"আলোকদাতা",en:"An-Nur",en_mean:"The Light",hi:"अन-नूर",hi_mean:"प्रकाश"},
{ar:"الْهَادِي",bn:"আল-হাদি",bn_mean:"পথপ্রদর্শক",en:"Al-Hadi",en_mean:"The Guide",hi:"अल-हादी",hi_mean:"मार्गदर्शक"},
{ar:"الْبَدِيع",bn:"আল-বাদি",bn_mean:"অদ্বিতীয় স্রষ্টা",en:"Al-Badi",en_mean:"The Incomparable",hi:"अल-बदी",hi_mean:"अनूठा सृजनकर्ता"},
{ar:"الْبَاقِي",bn:"আল-বাকি",bn_mean:"চিরস্থায়ী",en:"Al-Baqi",en_mean:"The Everlasting",hi:"अल-बाक़ी",hi_mean:"सदैव रहने वाला"},
{ar:"الْوَارِث",bn:"আল-ওয়ারিস",bn_mean:"উত্তরাধিকারী",en:"Al-Warith",en_mean:"The Inheritor",hi:"अल-वारिस",hi_mean:"उत्तराधिकारी"},
{ar:"الرَّشِيد",bn:"আর-রশিদ",bn_mean:"সঠিক পথপ্রদর্শক",en:"Ar-Rashid",en_mean:"The Guide to Right Path",hi:"अर-रशीद",hi_mean:"सही मार्ग दिखाने वाला"},
{ar:"الصَّبُور",bn:"আস-সবুর",bn_mean:"অত্যন্ত ধৈর্যশীল",en:"As-Sabur",en_mean:"The Patient",hi:"अस-सबूर",hi_mean:"अत्यंत धैर्यवान"}
];
];

/* RENDER SYSTEM */

const container = document.getElementById("namesContainer");

let html = "";

names.forEach((item,index)=>{

let pron="";
let meaning="";

if(lang==="bn"){
pron=item.bn;
meaning=item.bn_mean;
}

if(lang==="en"){
pron=item.en;
meaning=item.en_mean;
}

if(lang==="hi"){
pron=item.hi;
meaning=item.hi_mean;
}

html += `

<div class="name-card"><div class="arabic">${index+1}. ${item.ar}</div><div class="pron">${pron}</div><div class="meaning">${meaning}</div></div>
`;});

container.innerHTML = html;
