document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("travel-map");
  const dataElement = document.getElementById("travel-places-data");

  if (!mapElement || !dataElement || typeof L === "undefined") return;

  let places = [];
  try {
    const parsedPlaces = JSON.parse(dataElement.textContent);
    places = Array.isArray(parsedPlaces) ? parsedPlaces : [];
  } catch (error) {
    console.error("Unable to load travel map data.", error);
  }

  const map = L.map(mapElement, {
    minZoom: 2,
    worldCopyJump: true,
    scrollWheelZoom: false,
  }).setView([22, 8], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const bounds = [];
  places.forEach((place) => {
    if (typeof place.latitude !== "number" || typeof place.longitude !== "number") return;

    const marker = L.circleMarker([place.latitude, place.longitude], {
      radius: 6,
      color: "#ffffff",
      weight: 2,
      fillColor: "#0076df",
      fillOpacity: 0.9,
    }).addTo(map);

    const label = [place.city, place.region, place.country].filter(Boolean).join(", ");
    if (label) marker.bindTooltip(label, { direction: "top", offset: [0, -4] });
    bounds.push([place.latitude, place.longitude]);
  });

  if (bounds.length > 0) map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5 });

  const countElement = document.getElementById("travel-place-count");
  if (countElement) countElement.textContent = places.length.toString();
});
