/* ================= GLOBAL THEME ================= */

function applyGlobalTheme(){

    let settings = {
        dark: false
    };

    try{

        const saved =
            localStorage.getItem("appSettings");

        if(saved){
            settings = JSON.parse(saved);
        }

    }catch(e){

        settings = {
            dark: false
        };
    }


    if(settings.dark){

        document.body.classList.add(
            "dark-mode"
        );

    }else{

        document.body.classList.remove(
            "dark-mode"
        );
    }
}


/* ================= INIT ================= */

document.addEventListener(
    "DOMContentLoaded",
    applyGlobalTheme
);
