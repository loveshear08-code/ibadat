// ================= SETTINGS =================

let s = localStorage.getItem("appSettings");

if(s){
    s = JSON.parse(s);
}else{
    s = {lang:"bn"};
}

const lang = s.lang || "bn";

// ================= TITLE =================

const TITLE = {
bn: "আল্লাহর ৯৯টি নাম",
en: "Allah 99 Names",
hi: "अल्लाह के 99 नाम"
};

document.getElementById("pageTitle").innerText = TITLE[lang];
document.title = TITLE[lang];

// ================= BISMILLAH =================

const BISMILLAH = {
bn:{
ar:"﷽",
text:"بِسْمِ ٱللَّٰهِ",
meaning:"পরম করুণাময় আল্লাহর নামে"
},
en:{
ar:"﷽",
text:"Bismillah",
meaning:"In the name of Allah"
},
hi:{
ar:"﷽",
text:"बिस्मिल्लाह",
meaning:"अल्लाह के नाम से"
}
};

// ================= DATA =================

const names = [

{ar:"الله",bn:"আল্লাহ",en:"Allah",hi:"अल्लाह",bn_mean:"সকল গুণের অধিকারী একমাত্র স্রষ্টা",en_mean:"The One God",hi_mean:"एकमात्र ईश्वर"},

{ar:"الرَّحْمَٰن",bn:"আর-রহমান",en:"Ar-Rahman",hi:"अर-रहमान",bn_mean:"পরম দয়ালু",en_mean:"The Most Merciful",hi_mean:"सबसे दयालु"},

{ar:"الرَّحِيم",bn:"আর-রহীম",en:"Ar-Raheem",hi:"अर-रहीम",bn_mean:"অত্যন্ত করুণাময়",en_mean:"The Most Compassionate",hi_mean:"अत्यंत दयालु"},

{ar:"الْمَلِك",bn:"আল-মালিক",en:"Al-Malik",hi:"अल-मलिक",bn_mean:"সর্বশক্তিমান অধিপতি",en_mean:"The King",hi_mean:"सर्वशक्तिमान बादशाह"},

{ar:"الْقُدُّوس",bn:"আল-কুদ্দুস",en:"Al-Quddus",hi:"अल-कुद्दूस",bn_mean:"অত্যন্ত পবিত্র",en_mean:"The Most Holy",hi_mean:"अत्यंत पवित्र"},

{ar:"السَّلَام",bn:"আস-সালাম",en:"As-Salam",hi:"अस-सलाम",bn_mean:"শান্তির উৎস",en_mean:"The Source of Peace",hi_mean:"शांति का स्रोत"},

{ar:"الْمُؤْمِن",bn:"আল-মু’মিন",en:"Al-Mu'min",hi:"अल-मुमिन",bn_mean:"নিরাপত্তা দানকারী",en_mean:"The Giver of Faith",hi_mean:"ईमान देने वाला"},

{ar:"الْمُهَيْمِن",bn:"আল-মুহাইমিন",en:"Al-Muhaymin",hi:"अल-मुहैमिन",bn_mean:"রক্ষাকারী",en_mean:"The Guardian",hi_mean:"संरक्षक"},

{ar:"الْعَزِيز",bn:"আল-আজিজ",en:"Al-Aziz",hi:"अल-अज़ीज़",bn_mean:"পরাক্রমশালী",en_mean:"The Mighty",hi_mean:"सर्वशक्तिमान"},

{ar:"الْجَبَّار",bn:"আল-জব্বার",en:"Al-Jabbar",hi:"अल-जबार",bn_mean:"মহা ক্ষমতাবান",en_mean:"The Compeller",hi_mean:"बलवान"},

{ar:"الْمُتَكَبِّر",bn:"আল-মুতাকাব্বির",en:"Al-Mutakabbir",hi:"अल-मुतकब्बिर",bn_mean:"মহা গৌরবময়",en_mean:"The Supreme",hi_mean:"महान"},

{ar:"الْخَالِق",bn:"আল-খালিক",en:"Al-Khaliq",hi:"अल-खालिक",bn_mean:"সৃষ্টিকর্তা",en_mean:"The Creator",hi_mean:"सृष्टिकर्ता"},

{ar:"الْبَارِئ",bn:"আল-বারি",en:"Al-Bari",hi:"अल-बारि",bn_mean:"সৃষ্টির পরিকল্পনাকারী",en_mean:"The Evolver",hi_mean:"रचना करने वाला"},

{ar:"الْمُصَوِّر",bn:"আল-মুসাওয়ির",en:"Al-Musawwir",hi:"अल-मुसव्विर",bn_mean:"রূপদানকারী",en_mean:"The Fashioner",hi_mean:"आकार देने वाला"},

{ar:"الْغَفَّار",bn:"আল-গফ্ফার",en:"Al-Ghaffar",hi:"अल-गफ्फार",bn_mean:"অত্যন্ত ক্ষমাশীল",en_mean:"The Forgiver",hi_mean:"बहुत क्षमा करने वाला"},

{ar:"الْقَهَّار",bn:"আল-কাহ্হার",en:"Al-Qahhar",hi:"अल-कह्हार",bn_mean:"পরাক্রমশালী",en_mean:"The Subduer",hi_mean:"विजेता"},

{ar:"الْوَهَّاب",bn:"আল-ওয়াহ্হাব",en:"Al-Wahhab",hi:"अल-वह्हाब",bn_mean:"দানকারী",en_mean:"The Bestower",hi_mean:"दाता"},

{ar:"الرَّزَّاق",bn:"আর-রজ্জাক",en:"Ar-Razzaq",hi:"अर-रज़्ज़ाक",bn_mean:"রিজিকদাতা",en_mean:"The Provider",hi_mean:"रिज़्क देने वाला"},

{ar:"الْفَتَّاح",bn:"আল-ফাত্তাহ",en:"Al-Fattah",hi:"अल-फत्ताह",bn_mean:"বিজয়দাতা",en_mean:"The Opener",hi_mean:"खोलने वाला"},

{ar:"الْعَلِيم",bn:"আল-আলীম",en:"Al-Alim",hi:"अल-अलीम",bn_mean:"সর্বজ্ঞ",en_mean:"All Knowing",hi_mean:"सब जानने वाला"},

{ar:"الْقَابِض",bn:"আল-কাবিদ",en:"Al-Qabid",hi:"अल-क़ाबिद",bn_mean:"সংকোচনকারী",en_mean:"The Withholder",hi_mean:"रोकने वाला"},

{ar:"الْبَاسِط",bn:"আল-বাসিত",en:"Al-Basit",hi:"अल-बासित",bn_mean:"প্রসারক",en_mean:"The Expander",hi_mean:"फैलाने वाला"},

{ar:"الْخَافِض",bn:"আল-খাফিদ",en:"Al-Khafid",hi:"अल-खाफिद",bn_mean:"অবনতকারী",en_mean:"The Abaser",hi_mean:"नीचा करने वाला"},

{ar:"الرَّافِع",bn:"আর-রাফি",en:"Ar-Rafi",hi:"अर-राफ़ी",bn_mean:"উন্নতকারী",en_mean:"The Exalter",hi_mean:"ऊँचा उठाने वाला"},

{ar:"الْمُعِز",bn:"আল-মুইজ",en:"Al-Mu'izz",hi:"अल-मुइज़्ज़",bn_mean:"সম্মানদাতা",en_mean:"The Honorer",hi_mean:"सम्मान देने वाला"},

{ar:"الْمُذِل",bn:"আল-মুজিল",en:"Al-Muzil",hi:"अल-मुज़िल्ल",bn_mean:"অপমানকারী",en_mean:"The Dishonorer",hi_mean:"अपमान करने वाला"},

{ar:"السَّمِيع",bn:"আস-সামি",en:"As-Sami",hi:"अस-समी",bn_mean:"সব শোনেন",en_mean:"All Hearing",hi_mean:"सब सुनने वाला"},

{ar:"الْبَصِير",bn:"আল-বাছির",en:"Al-Basir",hi:"अल-बसीर",bn_mean:"সব দেখেন",en_mean:"All Seeing",hi_mean:"सब देखने वाला"},

{ar:"الْحَكَم",bn:"আল-হাকাম",en:"Al-Hakam",hi:"अल-हकम",bn_mean:"বিচারক",en_mean:"The Judge",hi_mean:"न्यायाधीश"},

{ar:"الْعَدْل",bn:"আল-আদল",en:"Al-Adl",hi:"अल-अदल",bn_mean:"ন্যায়বিচারক",en_mean:"The Just",hi_mean:"न्यायी"},

{ar:"اللَّطِيف",bn:"আল-লতিফ",en:"Al-Latif",hi:"अल-लतीफ़",bn_mean:"অত্যন্ত দয়ালু",en_mean:"The Gentle",hi_mean:"दयालु"},

{ar:"الْخَبِير",bn:"আল-খবির",en:"Al-Khabir",hi:"अल-ख़बीर",bn_mean:"সর্বজ্ঞ",en_mean:"The Aware",hi_mean:"सब जानने वाला"},

{ar:"الْحَلِيم",bn:"আল-হালিম",en:"Al-Halim",hi:"अल-हलीम",bn_mean:"সহনশীল",en_mean:"The Forbearing",hi_mean:"सहनशील"},

{ar:"الْعَظِيم",bn:"আল-আজীম",en:"Al-Azim",hi:"अल-अज़ीम",bn_mean:"মহান",en_mean:"The Great",hi_mean:"महान"},

{ar:"الْغَفُور",bn:"আল-গফুর",en:"Al-Ghafur",hi:"अल-गफूर",bn_mean:"ক্ষমাশীল",en_mean:"The Forgiving",hi_mean:"क्षमाशील"},

{ar:"الشَّكُور",bn:"আশ-শাকুর",en:"Ash-Shakur",hi:"अश-शकूर",bn_mean:"কৃতজ্ঞতা গ্রহণকারী",en_mean:"The Appreciative",hi_mean:"आभार मानने वाला"},

{ar:"الْعَلِي",bn:"আল-আলি",en:"Al-Ali",hi:"अल-अली",bn_mean:"সর্বোচ্চ",en_mean:"The Most High",hi_mean:"सबसे ऊँचा"},

{ar:"الْكَبِير",bn:"আল-কবির",en:"Al-Kabir",hi:"अल-कबीर",bn_mean:"মহান",en_mean:"The Greatest",hi_mean:"महान"},

{ar:"الْحَفِيظ",bn:"আল-হাফিজ",en:"Al-Hafiz",hi:"अल-हाफिज",bn_mean:"রক্ষাকারী",en_mean:"The Preserver",hi_mean:"संरक्षक"},

{ar:"الْمُقِيت",bn:"আল-মুকিত",en:"Al-Muqit",hi:"अल-मुक़ीत",bn_mean:"রিজিকদাতা",en_mean:"The Sustainer",hi_mean:"पालन करने वाला"},

{ar:"الْحَسِيب",bn:"আল-হাসিব",en:"Al-Hasib",hi:"अल-हसीब",bn_mean:"হিসাবগ্রহণকারী",en_mean:"The Reckoner",hi_mean:"हिसाब लेने वाला"},

{ar:"الْجَلِيل",bn:"আল-জালিল",en:"Al-Jalil",hi:"अल-जलील",bn_mean:"মহিমান্বিত",en_mean:"The Majestic",hi_mean:"महिमामय"},

{ar:"الْكَرِيم",bn:"আল-করিম",en:"Al-Karim",hi:"अल-करीम",bn_mean:"দানশীল",en_mean:"The Generous",hi_mean:"उदार"},

{ar:"الرَّقِيب",bn:"আর-রকিব",en:"Ar-Raqib",hi:"अर-रकीब",bn_mean:"পর্যবেক্ষণকারী",en_mean:"The Watchful",hi_mean:"निगरानी करने वाला"},

{ar:"الْمُجِيب",bn:"আল-মুজিব",en:"Al-Mujib",hi:"अल-मुजीब",bn_mean:"দোয়া কবুলকারী",en_mean:"The Responder",hi_mean:"दुआ सुनने वाला"},

{ar:"الْوَاسِع",bn:"আল-ওয়াসি",en:"Al-Wasi",hi:"अल-वासी",bn_mean:"অপরিসীম",en_mean:"The All-Encompassing",hi_mean:"असीम"},

{ar:"الْحَكِيم",bn:"আল-হাকিম",en:"Al-Hakim",hi:"अल-हकीम",bn_mean:"প্রজ্ঞাময়",en_mean:"The Wise",hi_mean:"बुद्धिमान"},

{ar:"الْوَدُود",bn:"আল-ওয়াদুদ",en:"Al-Wadud",hi:"अल-वदूद",bn_mean:"প্রেমময়",en_mean:"The Loving",hi_mean:"प्रेम करने वाला"},

{ar:"الْمَجِيد",bn:"আল-মাজিদ",en:"Al-Majid",hi:"अल-मजीद",bn_mean:"মহিমান্বিত",en_mean:"The Glorious",hi_mean:"महान"},

{ar:"الْبَاعِث",bn:"আল-বাইস",en:"Al-Ba'ith",hi:"अल-बाइस",bn_mean:"পুনরুত্থানকারী",en_mean:"The Resurrector",hi_mean:"जिंदा करने वाला"},

{ar:"الشَّهِيد",bn:"আশ-শাহিদ",en:"Ash-Shahid",hi:"अश-शहीद",bn_mean:"সাক্ষী",en_mean:"The Witness",hi_mean:"गवाह"},

{ar:"الْحَق",bn:"আল-হক",en:"Al-Haqq",hi:"अल-हक़",bn_mean:"সত্য",en_mean:"The Truth",hi_mean:"सत्य"},

{ar:"الْوَكِيل",bn:"আল-ওয়াকিল",en:"Al-Wakil",hi:"अल-वकील",bn_mean:"অভিভাবক",en_mean:"The Trustee",hi_mean:"संरक्षक"},

{ar:"الْقَوِي",bn:"আল-কাওয়ি",en:"Al-Qawi",hi:"अल-क़वी",bn_mean:"শক্তিশালী",en_mean:"The Strong",hi_mean:"शक्तिशाली"},

{ar:"الْمَتِين",bn:"আল-মাতিন",en:"Al-Matin",hi:"अल-मतीन",bn_mean:"অটল",en_mean:"The Firm",hi_mean:"मजबूत"},

{ar:"الْوَلِي",bn:"আল-ওয়ালি",en:"Al-Wali",hi:"अल-वली",bn_mean:"বন্ধু",en_mean:"The Protector",hi_mean:"संरक्षक"},

{ar:"الْحَمِيد",bn:"আল-হামিদ",en:"Al-Hamid",hi:"अल-हमीद",bn_mean:"প্রশংসনীয়",en_mean:"The Praiseworthy",hi_mean:"प्रशंसनीय"},

{ar:"الْمُحْصِي",bn:"আল-মুহসি",en:"Al-Muhsi",hi:"अल-मुह्सी",bn_mean:"গণনাকারী",en_mean:"The Counter",hi_mean:"गिनने वाला"},

{ar:"الْمُبْدِئ",bn:"আল-মুবদি",en:"Al-Mubdi",hi:"अल-मुबदी",bn_mean:"সৃষ্টি শুরু করেন",en_mean:"The Originator",hi_mean:"आरंभ करने वाला"},

{ar:"الْمُعِيد",bn:"আল-মুইদ",en:"Al-Mu'id",hi:"अल-मुईद",bn_mean:"পুনরায় সৃষ্টি করেন",en_mean:"The Restorer",hi_mean:"पुनः बनाने वाला"},

{ar:"الْمُحْيِي",bn:"আল-মুহই",en:"Al-Muhyi",hi:"अल-मुही",bn_mean:"জীবনদানকারী",en_mean:"The Giver of Life",hi_mean:"जीवन देने वाला"},

{ar:"الْمُمِيت",bn:"আল-মুমিত",en:"Al-Mumit",hi:"अल-मुमीत",bn_mean:"মৃত্যুদাতা",en_mean:"The Creator of Death",hi_mean:"मौत देने वाला"},

{ar:"الْحَي",bn:"আল-হাই",en:"Al-Hayy",hi:"अल-हय्य",bn_mean:"চিরঞ্জীব",en_mean:"The Ever-Living",hi_mean:"हमेशा जीवित"},

{ar:"الْقَيُّوم",bn:"আল-কাইয়্যুম",en:"Al-Qayyum",hi:"अल-कय्यूम",bn_mean:"ধারক",en_mean:"The Sustainer",hi_mean:"सबको संभालने वाला"},

{ar:"الْوَاجِد",bn:"আল-ওয়াজিদ",en:"Al-Wajid",hi:"अल-वाजिद",bn_mean:"অভাবহীন",en_mean:"The Finder",hi_mean:"सब कुछ पाने वाला"},

{ar:"الْمَاجِد",bn:"আল-মাজিদ",en:"Al-Majid",hi:"अल-माजिद",bn_mean:"মহান",en_mean:"The Noble",hi_mean:"महान"},

{ar:"الْوَاحِد",bn:"আল-ওয়াহিদ",en:"Al-Wahid",hi:"अल-वाहिद",bn_mean:"একক",en_mean:"The One",hi_mean:"एक"},

{ar:"الصَّمَد",bn:"আস-সামাদ",en:"As-Samad",hi:"अस-समद",bn_mean:"অমুখাপেক্ষী",en_mean:"The Eternal",hi_mean:"सबसे निर्भर"},

{ar:"الْقَادِر",bn:"আল-কাদির",en:"Al-Qadir",hi:"अल-कादिर",bn_mean:"সর্বশক্তিমান",en_mean:"The Powerful",hi_mean:"शक्तिशाली"},

{ar:"الْمُقْتَدِر",bn:"আল-মুকতাদির",en:"Al-Muqtadir",hi:"अल-मुक्तदर",bn_mean:"ক্ষমতাধর",en_mean:"The Creator of Power",hi_mean:"शक्ति देने वाला"},

{ar:"الْمُقَدِّم",bn:"আল-মুকাদ্দিম",en:"Al-Muqaddim",hi:"अल-मुकद्दिम",bn_mean:"অগ্রগামী",en_mean:"The Expediter",hi_mean:"आगे बढ़ाने वाला"},

{ar:"الْمُؤَخِّر",bn:"আল-মুয়াখখির",en:"Al-Mu'akhkhir",hi:"अल-मुअख्खिर",bn_mean:"পিছিয়ে দেন",en_mean:"The Delayer",hi_mean:"पीछे करने वाला"},

{ar:"الأوَّل",bn:"আল-আউয়াল",en:"Al-Awwal",hi:"अल-अव्वल",bn_mean:"প্রথম",en_mean:"The First",hi_mean:"पहला"},

{ar:"الآخِر",bn:"আল-আখির",en:"Al-Akhir",hi:"अल-आख़िर",bn_mean:"শেষ",en_mean:"The Last",hi_mean:"अंतिम"},

{ar:"الظَّاهِر",bn:"আয-জাহির",en:"Az-Zahir",hi:"अज़-ज़ाहिर",bn_mean:"প্রকাশ্য",en_mean:"The Manifest",hi_mean:"प्रकट"},

{ar:"الْبَاطِن",bn:"আল-বাতিন",en:"Al-Batin",hi:"अल-बातिन",bn_mean:"অদৃশ্য",en_mean:"The Hidden",hi_mean:"छिपा हुआ"},

{ar:"الْوَالِي",bn:"আল-ওয়ালি",en:"Al-Wali",hi:"अल-वाली",bn_mean:"অধিপতি",en_mean:"The Governor",hi_mean:"शासक"},

{ar:"الْمُتَعَالِي",bn:"আল-মুতাআলি",en:"Al-Muta'ali",hi:"अल-मुतआली",bn_mean:"উচ্চতম",en_mean:"The Most High",hi_mean:"सबसे ऊँचा"},

{ar:"الْبَر",bn:"আল-বার",en:"Al-Barr",hi:"अल-बर्र",bn_mean:"দয়ালু",en_mean:"The Good",hi_mean:"दयालु"},

{ar:"التَّوَّاب",bn:"আত-তাওয়াব",en:"At-Tawwab",hi:"अत-तव्वाब",bn_mean:"তওবা কবুলকারী",en_mean:"The Acceptor of Repentance",hi_mean:"तौबा कबूल करने वाला"},

{ar:"الْمُنْتَقِم",bn:"আল-মুনতাকিম",en:"Al-Muntaqim",hi:"अल-मुन्तकिम",bn_mean:"প্রতিশোধ গ্রহণকারী",en_mean:"The Avenger",hi_mean:"बदला लेने वाला"},

{ar:"العَفُو",bn:"আল-আফুউ",en:"Al-Afuw",hi:"अल-अफुव",bn_mean:"ক্ষমাকারী",en_mean:"The Pardoner",hi_mean:"माफ करने वाला"},

{ar:"الرَّؤُوف",bn:"আর-রউফ",en:"Ar-Ra'uf",hi:"अर-रऊफ",bn_mean:"দয়ালু",en_mean:"The Compassionate",hi_mean:"दयालु"},

{ar:"مَالِكُ الْمُلْك",bn:"মালিকুল মুলক",en:"Malik-ul-Mulk",hi:"मालिकुल मुल्क",bn_mean:"রাজত্বের মালিক",en_mean:"Owner of Kingdom",hi_mean:"राज्य का मालिक"},

{ar:"ذُو الْجَلَالِ وَالإِكْرَام",bn:"যুল-জালালি",en:"Dhul-Jalali wal-Ikram",hi:"ज़ुल-जलाली",bn_mean:"মহিমাময়",en_mean:"Lord of Majesty",hi_mean:"महिमा का स्वामी"},

{ar:"الْمُقْسِط",bn:"আল-মুকসিত",en:"Al-Muqsit",hi:"अल-मुक्सित",bn_mean:"ন্যায়বিচারক",en_mean:"The Just",hi_mean:"न्याय करने वाला"},

{ar:"الْجَامِع",bn:"আল-জামি",en:"Al-Jami",hi:"अल-जामि",bn_mean:"একত্রকারী",en_mean:"The Gatherer",hi_mean:"इकट्ठा करने वाला"},

{ar:"الْغَنِي",bn:"আল-গনি",en:"Al-Ghani",hi:"अल-गनी",bn_mean:"অভাবমুক্ত",en_mean:"The Self-Sufficient",hi_mean:"निर्भर नहीं"},

{ar:"الْمُغْنِي",bn:"আল-মুগনি",en:"Al-Mughni",hi:"अल-मुगनी",bn_mean:"সম্পদদাতা",en_mean:"The Enricher",hi_mean:"धन देने वाला"},

{ar:"الْمَانِع",bn:"আল-মানি",en:"Al-Mani",hi:"अल-मानी",bn_mean:"প্রতিরোধকারী",en_mean:"The Preventer",hi_mean:"रोकने वाला"},

{ar:"الضَّار",bn:"আদ-দার",en:"Ad-Darr",hi:"अद-दर्र",bn_mean:"ক্ষতিদানকারী",en_mean:"The Distresser",hi_mean:"हानि देने वाला"},

{ar:"النَّافِع",bn:"আন-নাফি",en:"An-Nafi",hi:"अन-नाफ़ी",bn_mean:"উপকারকারী",en_mean:"The Benefactor",hi_mean:"लाभ देने वाला"},

{ar:"النُّور",bn:"আন-নূর",en:"An-Nur",hi:"अन-नूर",bn_mean:"আলোকদাতা",en_mean:"The Light",hi_mean:"प्रकाश"},

{ar:"الْهَادِي",bn:"আল-হাদি",en:"Al-Hadi",hi:"अल-हादी",bn_mean:"পথপ্রদর্শক",en_mean:"The Guide",hi_mean:"मार्गदर्शक"},

{ar:"الْبَدِيع",bn:"আল-বাদি",en:"Al-Badi",hi:"अल-बदी",bn_mean:"অদ্বিতীয়",en_mean:"The Originator",hi_mean:"अद्वितीय"},

{ar:"الْبَاقِي",bn:"আল-বাকি",en:"Al-Baqi",hi:"अल-बाकी",bn_mean:"চিরস্থায়ী",en_mean:"The Everlasting",hi_mean:"हमेशा रहने वाला"},

{ar:"الْوَارِث",bn:"আল-ওয়ারিস",en:"Al-Warith",hi:"अल-वारिस",bn_mean:"উত্তরাধিকারী",en_mean:"The Inheritor",hi_mean:"विरासत लेने वाला"},

{ar:"الرَّشِيد",bn:"আর-রশিদ",en:"Ar-Rashid",hi:"अर-रशीद",bn_mean:"সঠিক পথপ্রদর্শক",en_mean:"The Guide",hi_mean:"सही रास्ता दिखाने वाला"},

{ar:"الصَّبُور",bn:"আস-সবুর",en:"As-Sabur",hi:"अस-सबूर",bn_mean:"ধৈর্যশীল",en_mean:"The Patient",hi_mean:"धैर्यवान"}

];

// ================= RENDER =================

const container = document.getElementById("namesContainer");

let html = "";

// 🔥 BISMILLAH FIRST

html += `
<div class="name-card" style="
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
background:#a5d6a7;
">

<div style="font-size:32px;color:#1b5e20;">${BISMILLAH[lang].ar}</div>
<div style="margin-top:10px;font-weight:bold;color:#1b4332;">
${BISMILLAH[lang].text}
</div>
<div style="font-size:12px;color:#52796f;margin-top:6px;">
${BISMILLAH[lang].meaning}
</div>

</div>
`;

// 🔥 1–99 NAMES

names.forEach((item,index)=>{

let name = item[lang];
let meaning = item[lang+"_mean"];

html += `
<div class="name-card">
<div class="arabic">${index+1}. ${item.ar}</div>
<div class="pron">${name}</div>
<div class="meaning">${meaning}</div>
</div>
`;

});

container.innerHTML = html;
