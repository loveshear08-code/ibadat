const LANG = {
  bn: {
    azanSettings: "আজান সেটিং",
    selectAzan: "আজানের সাউন্ড নির্বাচন",
    save: "সংরক্ষণ",
    test: "পরীক্ষা"
  },
  en: {
    azanSettings: "Azan Settings",
    selectAzan: "Select Azan Sound",
    save: "Save",
    test: "Test"
  }
};

function getLang(){
  return localStorage.getItem("lang") || "bn";
}

function applyLang(){
  const lang = getLang();
  const data = LANG[lang];

  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");
    if(data[key]){
      el.innerText = data[key];
    }
  });
}
