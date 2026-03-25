document.addEventListener("DOMContentLoaded",()=>{

    // STATUS AUTO HIDE
    const status = document.getElementById("status");
    if(status){
        const observer = new MutationObserver(()=>{
            if(status.innerText !== ""){
                setTimeout(()=>{
                    status.innerText="";
                },2000);
            }
        });

        observer.observe(status,{childList:true});
    }

    // ACTIVE STYLE STRONG
    const style = document.createElement("style");
    style.innerHTML = `
    .item.active{
        background:#a8e6c1 !important;
        border:2px solid #2e7d32;
        font-weight:bold;
    }
    `;
    document.head.appendChild(style);

});
