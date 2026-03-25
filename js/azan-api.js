async function getPrayerTimes(){

    try{
        const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Kolkata&country=India&method=2");
        const data = await res.json();

        const t = data.data.timings;

        const times = [
            t.Fajr,
            t.Dhuhr,
            t.Asr,
            t.Maghrib,
            t.Isha
        ];

        localStorage.setItem("azanTimes", JSON.stringify(times));

        console.log("Namaz time updated:", times);

    }catch(e){
        console.log("API error", e);
    }
}
