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
<<<<<<< HEAD

    </script>
  </body>
</html> */
/* ------------------------------------------------------------------------------------------------------------------- */

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

/* document.querySelector("#submit").addEventListener("click", measureWebsite);

const key = "AIzaSyAenWpaU3tqIjJc1d2HtM0juCYilYx1gPs";
const url = encodeURIComponent("https://kea.dk");

async function getPageSpeedData() {
  const result = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${key}`
  );
  const data = await result.json();
  console.log(data);
}
function measureWebsite() {
  const text_box = document.querySelector("#url").value;

  console.log(text_box);
  getCarbonData(text_box);
}
async function getCarbonData(url) {
  console.log(url);

  const result = await fetch(
    `https://kea-alt-del.dk/websitecarbon/?url=${url}`
  );
  const data = await result.json();
  console.log(data);
  console.log(url);
} */

/* ------------------------------------------------------------------ */
=======
>>>>>>> bda176852e514b60d5967460b1b6c0cd91d3b2ab
