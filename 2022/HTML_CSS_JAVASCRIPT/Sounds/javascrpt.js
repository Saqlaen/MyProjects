const btnArr = document.querySelectorAll(".btn");

const stopAllSounds = () => {
    btnArr.forEach( ele => {
        const id = ele.innerText;
        const name = document.getElementById(id);
        name.pause();
        name.currentTime = 0; //to start the audio from the biginning
    });
}

btnArr.forEach( btn => {
    btn.addEventListener("click", () => {
        stopAllSounds();
        const id = btn.innerText;
        console.log(btn.innerHTML);
        console.log(btn.innerText);
        document.getElementById(id).play()
    })
})

document.getElementById("stop").addEventListener("click", ()=> {
    stopAllSounds();
});
