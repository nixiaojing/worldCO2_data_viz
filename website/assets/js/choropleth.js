var VEGA_DEBUG = (typeof VEGA_DEBUG == "undefined") ? {} : VEGA_DEBUG;
(function(spec, embedOpt){
let outputDiv = document.currentScript.previousElementSibling;
if (outputDiv.id !== "altair-viz-a17fe957b43541bd82d433e395e21ded") {
  outputDiv = document.getElementById("altair-viz-a17fe957b43541bd82d433e395e21ded");
}
const paths = {
  "vega": "https://cdn.jsdelivr.net/npm//vega@5?noext",
  "vega-lib": "https://cdn.jsdelivr.net/npm//vega-lib?noext",
  "vega-lite": "https://cdn.jsdelivr.net/npm//vega-lite@4.17.0?noext",
  "vega-embed": "https://cdn.jsdelivr.net/npm//vega-embed@6?noext",
};

function maybeLoadScript(lib, version) {
  var key = `${lib.replace("-", "")}_version`;
  return (VEGA_DEBUG[key] == version) ?
    Promise.resolve(paths[lib]) :
    new Promise(function(resolve, reject) {
      var s = document.createElement('script');
      document.getElementsByTagName("head")[0].appendChild(s);
      s.async = true;
      s.onload = () => {
        VEGA_DEBUG[key] = version;
        return resolve(paths[lib]);
      };
      s.onerror = () => reject(`Error loading script: ${paths[lib]}`);
      s.src = paths[lib];
    });
}

function showError(err) {
  outputDiv.innerHTML = `<div class="error" style="color:red;">${err}</div>`;
  throw err;
}

function displayChart(vegaEmbed) {
  vegaEmbed(outputDiv, spec, embedOpt)
    .catch(err => showError(`Javascript Error: ${err.message}<br>This usually means there's a typo in your chart specification. See the javascript console for the full traceback.`));
}

if(typeof define === "function" && define.amd) {
  requirejs.config({paths});
  require(["vega-embed"], displayChart, err => showError(`Error loading script: ${err.message}`));
} else {
  maybeLoadScript("vega", "5")
    .then(() => maybeLoadScript("vega-lite", "4.17.0"))
    .then(() => maybeLoadScript("vega-embed", "6"))
    .catch(showError)
    .then(() => displayChart(vegaEmbed));
}