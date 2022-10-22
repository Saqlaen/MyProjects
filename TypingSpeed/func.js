const displaytext = document.getElementById("text");
const speed = document.getElementById("speed");

const text = "we love programming!!!!!!!!!!!!!";

let indx = 1;
const NUM = 500;
let time = NUM/ speed.value;

function writeText(){
    displaytext.innerHTML = text.slice(0,indx);
    indx++;
    if(indx > text.length ){
        indx = 1;
    }
    setTimeout( writeText, time);
}

writeText();
speed.addEventListener("input", (element)=>{
    time = NUM/element.target.value;
})
