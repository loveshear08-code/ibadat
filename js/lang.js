const lang = localStorage.getItem("appLang") || "bn";

const TEXT = {
bn:{
bismillah:"পরম করুণাময় অসীম দয়ালু আল্লাহর নামে"
},
en:{
bismillah:"In the name of Allah, Most Merciful"
},
hi:{
bismillah:"अल्लाह के नाम से"
}
};

function applyLang(){

    const el = document.getElementById("bismillahMeaning");

    if(el){
        el.innerText = TEXT[lang].bismillah;
    }

}
