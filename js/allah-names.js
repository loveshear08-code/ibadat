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

// 👉 ⚠️ এখানে সব ৯৯ নাম একই structure-এ বসাতে হবে
// আমি sample দিলাম, তুমি আগের list থেকে replace করে দিবে

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
