const quizdata = [
    {
        question:"what language runs in a browser",
        a: "java",
        b: "c++",
        c: "ruby",
        d: "javascript",
        correctAns: "d"
    },
    {
        question: "what does css stand for",
        a: "cat sec sex",
        b: "carbon style sheet",
        c: "cascading style sheet",
        d: "cario stop start",
        correctAns: "c"
    },
    {
        question: "what does HTML stand for",
        a: "hii to me Love",
        b: "heeehhee tommorow mine lives",
        c: "hyperText markup language",
        d: "hyperText python language",
        correctAns: "c"
    },
    {
        question: "what year was javascript launched",
        a: "1996",
        b: "1994",
        c: "1995",
        d: "FUCK YOU I DON'T KNOW",
        correctAns: "b"
    }
];

const container = document.querySelector(".container");

const question = document.getElementById("question");
const submit = document.getElementById("submit");
const answers = document.querySelectorAll(".answer");

const option_A = document.getElementById("optionA_text");
const option_B = document.getElementById("optionB_text");
const option_C = document.getElementById("optionC_text");
const option_D = document.getElementById("optionD_text");

let indx = 0; //question index

function deselectAns(){
    answers.forEach( ele => ele.checked = false );
}

function loadQuestion(){
    deselectAns();
    const currentQuestion = quizdata[indx];
    question.textContent = currentQuestion.question;

    option_A.innerText = currentQuestion.a;
    option_B.textContent = currentQuestion.b;
    option_C.textContent = currentQuestion.c;
    option_D.textContent = currentQuestion.d;

}

loadQuestion();

let score = 0;
function selectedAns(){
    let answer;
    answers.forEach( ele => {
        if(ele.checked){
            answer = ele.id;
        }
    })
    return answer;
}
submit.addEventListener("click", ()=> {
    const ans = selectedAns();
    if(ans){
        if(ans == quizdata[indx].correctAns ){
            score++;
        }
        indx++;
        if(indx < quizdata.length ){
            loadQuestion();
        }
        else{
            //show quiz result
            document.querySelector(".container").innerHTML = 
            `<h2>
                your score comes out as ${score} for ${quizdata.length}
            </h2>
            <button onclick="location.reload()">Reload</button>
            `
        }
    }
    else{
        alert("idiot chose a fucking option!!!")
    }

})
