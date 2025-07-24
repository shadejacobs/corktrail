let map, service;
export let currentLocation;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 37.8393, lng: -84.2700 } 
  });
}

export function findVineyards(query) {
  const request = {
    query,
    types: ["winery"],
    location: map.getCenter(),
    radius: 50000
  };
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      placeMarkers(results);
    }
  });
}

function placeMarkers(places) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  const bounds = new google.maps.LatLngBounds();
  places.forEach(place => {
    const marker = new google.maps.Marker({ map, position: place.geometry.location });
    bounds.extend(place.geometry.location);
    const infoWin = new google.maps.InfoWindow({
      content: `<h3>${place.name}</h3><div id="rating-${place.place_id}"></div>
                <button onclick="window.app.showReviewForm('${place.place_id}')">Leave Review</button>`
    });
    marker.addListener("click", () => infoWin.open(map, marker));
    resultsDiv.innerHTML += `<div class="vineyard" id="vineyard-${place.place_id}">
      <h4>${place.name}</h4><small>${place.formatted_address}</small>
      <div id="display-ratings-${place.place_id}">⭐ Loading…</div>
    </div>`;
  });
  map.fitBounds(bounds);
}
