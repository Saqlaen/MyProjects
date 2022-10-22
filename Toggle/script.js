const toggles = document.querySelectorAll(".toggle");

const little = document.getElementById("broke");
const RichMoney = document.getElementById("rich");
const zero = document.getElementById("poor");

toggles.forEach( (ele) => {
    ele.addEventListener("change", (event) => {
        console.log(event);
        if( little.checked && RichMoney.checked && zero.checked ){
            if(RichMoney.checked){
                little.checked = false;
                zero.checked = false;
            }
            else if(little.checked){
                RichMoney.checked = false;
                zero.checked = false;
            }
            else if(zero.checked){
                little.checked = false;
                RichMoney.checked = false;
            }
        }
    })
})
