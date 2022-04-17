import "./sass/style.scss";

const key = "AIzaSyAenWpaU3tqIjJc1d2HtM0juCYilYx1gPs";
const url = encodeURIComponent("https://kea.dk");
const loader = document.querySelector(".loader");

let performance;
let greenHost;
let energy;
let co2Grams;
let kB;
let cleanerThan;
let sharableURL = "https://yoursharableURL.com/id";

new ClipboardJS("#share button");

async function getPageSpeedData() {
  loader.classList.remove("hidden");
  console.log("loader showed");
  const result = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`);
  // const result = await fetch(`ecosiaPS.json`);

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
  energy = data2.statistics.energy * 1000;
  greenHost = data2.green;
  loader.classList.add("hidden");
  document.querySelector("#your_results").scrollIntoView();
  console.log("loader hidden");

  changeData();
}

window.addEventListener("load", start);

function start() {
  // addEventListeners();
  rangeSlider();
  windmills();
  getPageSpeedData();
  // document.querySelector("#create_report").addEventListener("click", getPageSpeedData);

  console.log("start");
}

// ----------------- Change Data ---------------------------

function changeData() {
  let count = 0;
  updateDisplay();
  function updateDisplay() {
    if (count < cleanerThan) {
      count++;
      setTimeout(updateDisplay, 15);
    }
    document.querySelector(".percentage").innerHTML = `${count}%`;
  }

  document.querySelector("#co2 h2").innerHTML = `${co2Grams.toFixed(2)}`;
  document.querySelector("#bytes h2").innerHTML = `${kB.toFixed(0)}`;
  document.querySelector("#energy h2").innerHTML = `${energy.toFixed(2)}`;

  if (greenHost === true) {
    document.querySelector("#host h2").innerHTML = `♻️`;
    document.querySelector(".further").firstElementChild.classList.add("hidden");
    document.querySelector("#host svg circle:nth-child(2)").style.strokeDashoffset = 0;
  } else if (greenHost === false) {
    document.querySelector("#host h2").innerHTML = `💨`;
    document.querySelector(".further").firstElementChild.classList.remove("hidden");
    document.querySelector("#host svg circle:nth-child(2)").style.strokeDashoffset = 440;
  } else {
    document.querySelector("#host h2").innerHTML = `🤷`;
    document.querySelector(".further").firstElementChild.classList.remove("hidden");
    document.querySelector("#host svg circle:nth-child(2)").style.strokeDashoffset = 220;
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
  let count = cleanerThan;
  let newPerformance = performance;
  let newGreenHost;
  let newEnergy = energy;
  let newCO2 = co2Grams;
  let newKB = kB;

  setTimeout(updateDisplay, 800);
  function updateDisplay() {
    if (count < newCleaner) {
      count++;
      setTimeout(updateDisplay, 15);
    }
    document.querySelector(".percentage").innerHTML = `${count}%`;
  }

  document.querySelector(".previous_score").classList.remove("hidden");
  document.querySelector(".previous_score span").innerHTML = ` ${cleanerThan}%`;

  if (document.querySelector("#caching").checked) {
    console.log("caching checked");
    newPerformance = newPerformance + 0.5;
  }

  if (document.querySelector("#fewer_fonts").checked) {
    console.log("fonts checked");
    newPerformance = newPerformance + 1;
  }

  if (document.querySelector("#minify").checked) {
    console.log("minify checked");
    newPerformance = newPerformance + 2;
  }

  if (document.querySelector("#reduce_img").checked) {
    if (document.querySelector("#reduce_range").value == 25) {
      console.log("images reduces by 25%");
      newPerformance = newPerformance + 1;
      newKB = newKB - 45;
      newEnergy = newEnergy - 0.03;
    }
    if (document.querySelector("#reduce_range").value == 50) {
      console.log("images reduces by 50%");
      newPerformance = newPerformance + 1.8;
      newKB = newKB - 45;
      newEnergy = newEnergy - 0.05;
    }
    if (document.querySelector("#reduce_range").value == 75) {
      console.log("images reduces by 75%");
      newPerformance = newPerformance + 2.4;
      newKB = newKB - 60;
      newEnergy = newEnergy - 0.06;
    }
    if (document.querySelector("#reduce_range").value == 100) {
      console.log("images reduces by 100%");
      newPerformance = newPerformance + 3;
      newKB = newKB - 65;
      newEnergy = newEnergy - 0.08;
    }
  }

  if (document.querySelector("#green_host").checked) {
    console.log("switch host checked");
    newCO2 = newCO2 - 0.1;
    document.querySelector("#host h2").innerHTML = `👍`;
  }

  if (document.querySelector("#remove_vid_img").checked) {
    console.log("remove vid/img checked");
    newCO2 = newCO2 - 0.07;
    newKB = newKB - 205;
    newEnergy = newEnergy - 0.11;
  }

  perfomancePerc(newPerformance);
  document.querySelector("#co2 h2").innerHTML = `${newCO2.toFixed(2)}`;
  document.querySelector("#bytes h2").innerHTML = `${newKB.toFixed(0)}`;
  document.querySelector("#energy h2").innerHTML = `${newEnergy.toFixed(2)}`;
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
