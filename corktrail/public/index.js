let map;
//export let currentLocation;
console.log("index.js");
async function initMap() {
    console.log("Starting to load map.");
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 37.8393, lng: -84.2700 },
  });
}

initMap();

