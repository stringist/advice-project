import "./sass/style.scss";

const key = "AIzaSyAenWpaU3tqIjJc1d2HtM0juCYilYx1gPs";
const url = encodeURIComponent("https://kea.dk");
async function getPageSpeedData() {
    const result = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`
    );
    const data = await result.json();
    console.log(data);
}
async function getCarbonData() {
    const result = await fetch(`https://api.websitecarbon.com/site?url=${url}`);
    const data = await result.json();
    console.log(data);
}
getPageSpeedData();
getCarbonData();