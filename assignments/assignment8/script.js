const quotes = [
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment - Ralph Waldo Emerson",
    "The only way to do great work is to love what you do - Steve Jobs",
    "In three words I can sum up everything I've learned about life: it goes on - Robert Frost",
    "The best time to plant a tree was 20 years ago. The second best time is now - Chinese Proverb",
    "Life is what happens when you're busy making other plans - John Lennon"
];
let quoteCount = 0; 

const newQuote = () => {
    console.log(quoteCount);

    const quoteText = document.querySelector("#quotes");
    quoteText.innerHTML = quotes[quoteCount];

    quoteCount++;
    if (quoteCount == quotes.length) {
        quoteCount = 0;
    changeQuote();
    }
}

const makeRainbow = () => {
    const rainbow = document.querySelector("#rainbow");
    const potOfGold = document.getElementById("potofGold");

    let colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    let count = 0;

    const addStrip = () => {
        if (count < colors.length) {
            const newStrip = document.createElement("div"); 
            newStrip.classList.add("rainbow-color");
            newStrip.style.backgroundColor = colors[count];

            rainbow.appendChild(newStrip);
            count++;

            setTimeout(addStrip, 600);
        } else {
            potOfGold.classList.remove("hidden");
            setTime(() => {
                rainbow.innerHTML = "";
                makeRainbow();
            }, 2000);
        }
    };

    addStrip();
};

window.onload = () => {
    newQuote();
    setInterval(newQuote, 2000);
    const rainbowButton = document.getElementById("rainbow-button");
    rainbowButton.addEventListener("click", makeRainbow);
}
