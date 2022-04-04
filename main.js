import "./style.css";
import "./sass/style.scss";

/* const userInput = "https://kea.dk/";

const url = `https://api.websitecarbon.com/site?url=${userInput}`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })

  .then((data) => {
    handleData(data);
  })

  .catch((e) => {
    console.error("An error occured:", e.message);
  });

function handleData(data) {
  console.log(data);
} */
/* <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>hello</h1>
    <script>
  
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

    </script>
  </body>
</html> */
/* ------------------------------------------------------------------------------------------------------------------- */
const key = "AIzaSyAenWpaU3tqIjJc1d2HtM0juCYilYx1gPs";
const url = encodeURIComponent("https://kea.dk");
async function getPageSpeedData() {
  const result = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`);
  const data = await result.json();
  console.log(data);
}

async function getCarbonData() {
  const result = await fetch(`https://kea-alt-del.dk/websitecarbon/?url=https://facebook.com`);
  const data = await result.json();
  console.log(data);
  console.log(data.loadingExperience);
}
getPageSpeedData();
getCarbonData();

/* ------------------------------------------------------------------ */
