---
layout: page
title: Misc
permalink: /misc/
description: Moments I’ve captured outside the lab.
---

{%- assign photos = site.data.photos -%}
{%- if photos and photos.size > 0 -%}
<div class="gallery" data-gallery>
  {%- for photo in photos -%}
    {%- assign src = photo.file | prepend: '/assets/img/misc/' | relative_url -%}
    {%- capture meta -%}{{ photo.place }}{% if photo.place and photo.date %} · {% endif %}{% if photo.date %}{{ photo.date }}{% endif %}{%- endcapture -%}
    <figure class="gallery-item" data-reveal style="--delay: {{ forloop.index0 | modulo: 3 }}">
      <button class="gallery-open" type="button" data-full="{{ src }}" data-caption="{{ photo.caption | escape }}" data-meta="{{ meta | strip | escape }}" aria-label="View photo{% if photo.caption %}: {{ photo.caption | escape }}{% endif %}">
        <img src="{{ src }}" alt="{{ photo.caption | default: '' | escape }}" loading="lazy" decoding="async">
      </button>
      {%- if photo.caption or meta != '' -%}
        <figcaption>{% if photo.caption %}<span>{{ photo.caption }}</span>{% endif %}{% if meta != '' %}<small>{{ meta | strip }}</small>{% endif %}</figcaption>
      {%- endif -%}
    </figure>
  {%- endfor -%}
</div>
<dialog class="lightbox" data-lightbox aria-label="Photo viewer">
  <button class="lightbox-close" type="button" aria-label="Close" data-lightbox-close>×</button>
  <figure>
    <img alt="">
    <figcaption><span data-lightbox-caption></span><small data-lightbox-meta></small></figcaption>
  </figure>
</dialog>
{%- else -%}
<div class="empty-state card" data-reveal>
  <span class="empty-emoji" aria-hidden="true">📷</span>
  <p>Photos are on the way.</p>
</div>
{%- endif -%}
