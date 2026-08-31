---
layout: page
title: fun
permalink: /fun/
description: Places I have explored around the world.
nav: true
nav_order: 3
travel_map: true
---

<div class="travel-map-intro">
  <div>
    <p>A growing map of places I have explored.</p>
    <div class="travel-map-legend" aria-label="Map legend">
      <span><span class="travel-map-legend-dot" aria-hidden="true"></span>Cities</span>
      <span><span class="travel-map-legend-dot travel-map-legend-dot--national-park" aria-hidden="true"></span>National parks</span>
      <span><span class="travel-map-legend-dot travel-map-legend-dot--theme-park" aria-hidden="true"></span>Theme parks</span>
    </div>
  </div>
  <p class="travel-map-count"><span id="travel-place-count">{{ site.data.travel_places | size }}</span> places and counting</p>
</div>

<div id="travel-map" class="travel-map" role="region" aria-label="Map of places I have visited"></div>

<script id="travel-places-data" type="application/json">
  {{ site.data.travel_places | default: empty | jsonify }}
</script>

<noscript><p>Please enable JavaScript to view the interactive travel map.</p></noscript>
