import "./sass/style.scss";

const key = "AIzaSyAenWpaU3tqIjJc1d2HtM0juCYilYx1gPs";
const url = encodeURIComponent("https://kea.dk");
async function getPageSpeedData() {
    const result = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`
    );
    const data = await result.json();
    console.log(data.lighthouseResult.categories.performance.score);
}
async function getCarbonData() {
    const result = await fetch(`https://api.websitecarbon.com/site?url=${url}`);
    const data = await result.json();
    console.log(data);
}
getPageSpeedData();
getCarbonData();

window.addEventListener("load", start);

function start() {
    // addEventListeners();
    rangeSlider();
}

// ----------------- Pie charts ---------------------------

perfomancePerc(64);

function perfomancePerc(value) {
    const perfomanceChart = (document.querySelector(
        ".percent svg circle:nth-child(2)"
    ).style.strokeDashoffset = pieChartPercentage(value));
    const percentageOutput = (document.querySelector(
        "#performance h2"
    ).textContent = value);
}

function pieChartPercentage(number) {
    let numberInPercentage = 440 - (440 * number) / 100;

    return numberInPercentage;
}

// -----------------Animation ------------------------
const properties = {
    duration: 1000,
    iterations: Infinity,
    direction: "alternate",
    easing: "ease-in-out",
};
const keyframes = [{
        transform: "translate(0,3vw)",
    },
    {
        transform: "translate(0,0)",
    },
];

const arrow = document.querySelector("#arrow");
const animation = arrow.animate(keyframes, properties);

const properties2 = {
    duration: 750,
    iterations: Infinity,
    direction: "alternate",
    easing: "ease-in-out",
};
const keyframes2 = [{
        transform: "translate(0,0.5vw)",
    },
    {
        transform: "translate(0,-0.5vw)",
    },
];

const backToTheTop = document.querySelector("#backArrow");
const animation2 = backToTheTop.animate(keyframes2, properties2);


// function addEventListeners() {

// }

function rangeSlider() {
    const checkContainer = document.querySelector(".reduce_box");
    const checkbox = document.querySelector("#reduce_img");
    const slider = document.querySelector("#reduce_range");
    const output = document.querySelector("#rangevalue")
    checkContainer.addEventListener("click", updateState);
    if (slider.disabled) { output.style = "filter: opacity(.2)" };

    function updateState() {
        if (checkbox.checked) {
            slider.disabled = false;
        } else { slider.disabled = true; }
        updateStyle();
    }

    slider.addEventListener("input", updateNumber);

    function updateNumber() {
        output.innerHTML = `${slider.value}%`
    }

    function updateStyle() {
        if (slider.disabled) { output.style = "filter: opacity(.2)" } else {
            output.style = "filter: opacity(1)"
        }
    }
}