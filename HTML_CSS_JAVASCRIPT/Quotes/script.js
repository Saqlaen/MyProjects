const container = document.getElementById("container");
const quote = document.getElementById("quote");
const name = document.getElementById("name");
const btn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const authorName = document.getElementById("name");

let apiQuotes = [];

const getQuotes = async () => {

    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    }
    catch(error){
        console.log(error);
    }
};

getQuotes();

const showLoading = () => {
    container.hidden = true;
    loader.hidden = false;
};

const removeLoading = () => {
    loader.hidden = true;
    container.hidden = false;
};

const newQuote = ()=>{
    showLoading();

    setTimeout(()=>{
        const randomIndx = Math.floor( Math.random() * apiQuotes.length );
        const Quotes = apiQuotes[randomIndx];
        if(Quotes.author == null ){
            authorName.textContent = "Unknown";
        }
        else{
            authorName.textContent = `- ${Quotes.author}`;
        }
        quote.textContent = Quotes.text;
        removeLoading();
    }, 1000);
    
}

btn.addEventListener("click", newQuote);


