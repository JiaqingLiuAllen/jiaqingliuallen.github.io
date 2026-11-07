---
layout: page
title: Misc
permalink: /misc/
description: Moments I’ve captured outside the lab.
---

{%- assign photos = site.data.photos -%}
{%- if photos and photos.size > 0 -%}
<div class="gallery">
  {%- for photo in photos -%}
    {%- assign src = photo.file | prepend: '/assets/img/misc/' | relative_url -%}
    {%- capture place -%}{{ photo.place }}{% if photo.place and photo.date %} · {% endif %}{{ photo.date }}{%- endcapture -%}
    {%- assign place = place | strip -%}
    <figure class="gallery-item" data-reveal style="--delay: {{ forloop.index0 | modulo: 3 }}">
      <button class="gallery-open" type="button" data-full="{{ src }}" data-caption="{{ photo.caption | escape }}" data-meta="{{ place | escape }}" aria-label="View photo{% if photo.place %} from {{ photo.place | escape }}{% endif %}">
        <img src="{{ src }}" alt="{% if photo.caption %}{{ photo.caption | escape }}{% elsif photo.place %}{{ photo.place | escape }}{% else %}Photo{% endif %}" loading="lazy" decoding="async">
        {%- if place != '' -%}<span class="gallery-place">{% include icon.liquid name="pin" %}<span>{{ place }}</span></span>{%- endif -%}
      </button>
      {%- if photo.caption -%}<figcaption>{{ photo.caption }}</figcaption>{%- endif -%}
    </figure>
  {%- endfor -%}
</div>
<dialog class="lightbox" data-lightbox aria-label="Photo viewer">
  <button class="lightbox-close" type="button" aria-label="Close" data-lightbox-close>×</button>
  <figure>
    <img alt="">
    <figcaption>
      <span class="lightbox-caption" data-lightbox-caption></span>
      <span class="lightbox-place" data-lightbox-place>{% include icon.liquid name="pin" %}<span data-lightbox-meta></span></span>
    </figcaption>
  </figure>
</dialog>
{%- else -%}
<div class="empty-state card" data-reveal>
  <span class="empty-emoji" aria-hidden="true">📷</span>
  <p>Photos are on the way.</p>
</div>
{%- endif -%}
