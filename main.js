import "./sass/style.scss";

const key = "AIzaSyAenWpaU3tqIjJc1d2HtM0juCYilYx1gPs";
const url = encodeURIComponent("https://kea.dk");
let performance;
let greenHost;
let energy;
let co2Grams;
let kB;
let cleanerThan;
let sharableURL = "https://yoursharableURL.com/id";

new ClipboardJS("#share button");

async function getPageSpeedData() {
  // const result = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`);
  const result = await fetch(`ecosiaPS.json`);

  const data = await result.json();

  console.log(data.lighthouseResult.categories.performance.score);

  performance = data.lighthouseResult.categories.performance.score * 100;
  perfomancePerc(performance);
  getCarbonData();
}

async function getCarbonData() {
  // const result = await fetch(`https://api.websitecarbon.com/site?url=${url}`);
  const result = await fetch(`ecosiaCW.json`);

  const data2 = await result.json();
  console.log(data2);
  kB = data2.bytes * 0.00097656;
  co2Grams = data2.statistics.co2.grid.grams;
  cleanerThan = data2.cleanerThan * 100;
  energy = data2.statistics.energy;
  greenHost = data2.green;

  changeData();
}

window.addEventListener("load", start);

function start() {
  // addEventListeners();
  rangeSlider();
  windmills();
  getPageSpeedData();

  console.log("start");
}

// ----------------- Change Data ---------------------------

function changeData() {
  // discuss new design accordingly
  document.querySelector(".percentage").innerHTML = `${cleanerThan}%`;
  document.querySelector("#co2 h2").innerHTML = `${co2Grams.toFixed(2)}`;
  document.querySelector("#bytes h2").innerHTML = `${kB.toFixed(0)}`;

  if (greenHost === true) {
    document.querySelector("#host h2").innerHTML = `👍`;
    document.querySelector(".further").firstElementChild.classList.add("hidden");
  } else if (greenHost === false) {
    document.querySelector("#host h2").innerHTML = `👎`;
    document.querySelector(".further").firstElementChild.classList.remove("hidden");
  } else {
    document.querySelector("#host h2").innerHTML = `🤷`;
    document.querySelector(".further").firstElementChild.classList.remove("hidden");
  }
  document.querySelector("#share output").innerHTML = sharableURL;
  document.querySelector("#share button").setAttribute("data-clipboard-text", sharableURL);

  document.querySelector("#recalculate").addEventListener("click", recalculateResults);
}

// ----------------- Pie charts ---------------------------

function perfomancePerc(value) {
  const perfomanceChart = (document.querySelector(".percent svg circle:nth-child(2)").style.strokeDashoffset = pieChartPercentage(value));
  const percentageOutput = (document.querySelector("#performance h2").textContent = value);
}

function pieChartPercentage(number) {
  let numberInPercentage = 440 - (440 * number) / 100;

  return numberInPercentage;
}

// ----------------- Recalculate Results ---------------------------
function recalculateResults() {
  console.log("recalculate results");
  let newCleaner = 93;
  document.querySelector(".percentage").innerHTML = `${newCleaner}%`;
  document.querySelector(".previous_score").classList.remove("hidden");
  document.querySelector(".previous_score span").innerHTML = ` ${cleanerThan}%`;
}

// -----------------Animation ------------------------
const properties = {
  duration: 1000,
  iterations: Infinity,
  direction: "alternate",
  easing: "ease-in-out",
};
const keyframes = [
  {
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
const keyframes2 = [
  {
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
  const output = document.querySelector("#rangevalue");
  checkContainer.addEventListener("click", updateState);
  if (slider.disabled) {
    output.style = "filter: opacity(.2)";
  }

  function updateState() {
    if (checkbox.checked) {
      slider.disabled = false;
    } else {
      slider.disabled = true;
    }
    updateStyle();
  }

  slider.addEventListener("input", updateNumber);

  function updateNumber() {
    output.innerHTML = `${slider.value}%`;
  }

  function updateStyle() {
    if (slider.disabled) {
      output.style = "filter: opacity(.2)";
    } else {
      output.style = "filter: opacity(1)";
    }
  }
}

// windmill animation
function windmills() {
  fetch("./assets/windmills_layers.svg")
    .then((e) => e.text())
    .then((d) => {
      document.querySelector(".windmills_container").insertAdjacentHTML("afterbegin", d);
      spinBlades();
    });

  function spinBlades() {
    const blades1 = document.querySelector("#left_blades");
    const blades2 = document.querySelector("#middle_blades");
    const blades3 = document.querySelector("#right_blades");
    const allBlades = [blades1, blades2, blades3];

    blades1.style = "border: solid 1px white";
    // allBlades.map(item => item.classList.add("rotate"));
    blades1.classList.add("rotate");
  }
}
