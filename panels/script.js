const panels = document.querySelectorAll(".panel");

panels.forEach( ele => {
    ele.addEventListener("click", ()=> {
        removeActive();
        ele.classList.add("active");
    })
});

function removeActive(){
    panels.forEach( ele => {
        ele.classList.remove("active");
    })
}