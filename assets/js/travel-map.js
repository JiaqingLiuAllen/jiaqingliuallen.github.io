import * as maplibregl from "https://unpkg.com/maplibre-gl@6.6.0/dist/maplibre-gl.mjs";

const initializeTravelMap = () => {
  const mapElement = document.getElementById("travel-map");
  const dataElement = document.getElementById("travel-places-data");

  if (!mapElement || !dataElement) return;

  let places = [];
  try {
    const parsedPlaces = JSON.parse(dataElement.textContent);
    places = Array.isArray(parsedPlaces) ? parsedPlaces : [];
  } catch (error) {
    console.error("Unable to load travel map data.", error);
  }

  const mapStyle = "https://tiles.openfreemap.org/styles/liberty";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const map = new maplibregl.Map({
      container: mapElement,
      style: mapStyle,
      center: [-101, 39],
      zoom: 3,
      attributionControl: true,
      dragRotate: false,
      pitchWithRotate: false,
      scrollZoom: true,
    });

    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const bounds = new maplibregl.LngLatBounds();
    let markerCount = 0;

    places.forEach((place) => {
      if (typeof place.latitude !== "number" || typeof place.longitude !== "number") return;

      const locationParts = [place.city];
      if (place.region && place.region !== place.city) locationParts.push(place.region);
      if (place.country) locationParts.push(place.country);
      const fullLabel = locationParts.join(", ");
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = "travel-marker";
      if (place.category === "national_park") {
        markerElement.classList.add("travel-marker--national-park");
      }
      markerElement.setAttribute("aria-label", fullLabel);
      markerElement.title = fullLabel;

      const popup = new maplibregl.Popup({ closeButton: false, offset: 18 }).setText(fullLabel);
      new maplibregl.Marker({ element: markerElement, anchor: "bottom" }).setLngLat([place.longitude, place.latitude]).setPopup(popup).addTo(map);

      bounds.extend([place.longitude, place.latitude]);
      markerCount += 1;
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: { top: 80, right: 80, bottom: 80, left: 80 },
        maxZoom: 4,
        duration: reduceMotion ? 0 : 900,
      });
    }

    map.once("load", () => mapElement.classList.add("travel-map--ready"));

    const countElement = document.getElementById("travel-place-count");
    if (countElement) countElement.textContent = markerCount.toString();
  } catch (error) {
    console.error("Unable to initialize the travel map.", error);
    mapElement.classList.add("travel-map--unavailable");
    mapElement.textContent = "The travel map could not be loaded.";
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTravelMap, { once: true });
} else {
  initializeTravelMap();
}
