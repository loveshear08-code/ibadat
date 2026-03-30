let count = 0;

function increment(){
count++;
document.getElementById("counter").innerText = count;
}

function reset(){
count = 0;
document.getElementById("counter").innerText = count;
}
