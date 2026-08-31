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
      <span><span class="travel-map-legend-dot" aria-hidden="true"></span>Cities &amp; places</span>
      <span><span class="travel-map-legend-dot travel-map-legend-dot--national-park" aria-hidden="true"></span>National parks</span>
    </div>
  </div>
  <p class="travel-map-count"><span id="travel-place-count">{{ site.data.travel_places | size }}</span> places and counting</p>
</div>

<div id="travel-map" class="travel-map" role="region" aria-label="Map of places I have visited"></div>

<script id="travel-places-data" type="application/json">
  {{ site.data.travel_places | default: empty | jsonify }}
</script>

<noscript><p>Please enable JavaScript to view the interactive travel map.</p></noscript>

{% assign travel_countries = site.data.travel_places | group_by: 'country' %}

<section class="travel-place-list" aria-labelledby="travel-place-list-title">
  <h2 id="travel-place-list-title">Places visited</h2>
  <div class="travel-country-grid">
    {% for country in travel_countries %}
      <section class="travel-country" aria-labelledby="travel-country-{{ country.name | slugify }}">
        <h3 id="travel-country-{{ country.name | slugify }}">{{ country.name }}</h3>
        <ul>
          {% for place in country.items %}
            <li>{{ place.city }}</li>
          {% endfor %}
        </ul>
      </section>
    {% endfor %}
  </div>
</section>
