// Small, calm interactions for the personal site. No dependencies.
(function () {
  "use strict";

  var nav = document.querySelector("[data-nav]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasObserver = "IntersectionObserver" in window;

  // The email address is stored reversed in data-mail ("domain|user") and only
  // assembled here, so it never appears as plain text in the page source.
  var reverse = function (s) {
    return s.split("").reverse().join("");
  };
  var emailFrom = function (el) {
    var parts = (el.getAttribute("data-mail") || "").split("|");
    return parts.length === 2 ? reverse(parts[1]) + "@" + reverse(parts[0]) : "";
  };
  document.querySelectorAll("a[data-mail]").forEach(function (link) {
    var arm = function () {
      link.setAttribute("href", "mailto:" + emailFrom(link));
    };
    link.addEventListener("pointerenter", arm);
    link.addEventListener("focus", arm);
    link.addEventListener("click", arm);
  });

  // Hairline under the frosted nav once the page scrolls.
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu.
  var toggle = document.querySelector("[data-nav-toggle]");
  if (nav && toggle) {
    var setMenu = function (open) {
      nav.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll(".nav-menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("nav-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Home page: contact icons join the nav once the hero buttons scroll away.
  var heroActions = document.querySelector("[data-hero-actions]");
  if (nav && heroActions) {
    if (hasObserver) {
      new IntersectionObserver(
        function (entries) {
          var entry = entries[0];
          nav.classList.toggle("show-social", !entry.isIntersecting && entry.boundingClientRect.top < 80);
        },
        { rootMargin: "-52px 0px 0px 0px" }
      ).observe(heroActions);
    } else {
      nav.classList.add("show-social");
    }
  }

  // Sections fade up gently as they enter the viewport.
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (hasObserver && !reduceMotion) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0 }
    );
    revealEls.forEach(function (el) {
      revealer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Abstract / BibTeX drawers: one open per publication.
  var setPanel = function (button, open) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", String(open));
    if (panel) panel.classList.toggle("is-open", open);
  };
  document.querySelectorAll("[data-panel-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") !== "true";
      var card = button.closest(".pub");
      if (open && card) {
        card.querySelectorAll('[data-panel-toggle][aria-expanded="true"]').forEach(function (other) {
          setPanel(other, false);
        });
      }
      setPanel(button, open);
    });
  });

  // Copy helpers: the email button and BibTeX blocks.
  document.querySelectorAll("button[data-mail], [data-copy-target]").forEach(function (button) {
    var label = button.querySelector("[data-copy-label]");
    var original = label ? label.textContent : "";
    var timer;
    button.addEventListener("click", function () {
      var target = button.dataset.copyTarget ? document.querySelector(button.dataset.copyTarget) : null;
      var text = (target ? target.textContent : emailFrom(button)).trim();
      if (!text || !navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(function () {
        button.classList.add("is-copied");
        if (label) label.textContent = "Copied";
        clearTimeout(timer);
        timer = setTimeout(function () {
          button.classList.remove("is-copied");
          if (label) label.textContent = original;
        }, 1600);
      });
    });
  });

  // Misc page: open photos in a lightbox, arrow keys to browse.
  var lightbox = document.querySelector("[data-lightbox]");
  var openers = Array.prototype.slice.call(document.querySelectorAll("[data-full]"));
  if (lightbox && openers.length && typeof lightbox.showModal === "function") {
    var image = lightbox.querySelector("img");
    var caption = lightbox.querySelector("[data-lightbox-caption]");
    var meta = lightbox.querySelector("[data-lightbox-meta]");
    var current = 0;
    var show = function (index) {
      current = (index + openers.length) % openers.length;
      var opener = openers[current];
      image.src = opener.dataset.full;
      image.alt = opener.dataset.caption || "";
      caption.textContent = opener.dataset.caption || "";
      meta.textContent = opener.dataset.meta || "";
    };
    openers.forEach(function (opener, index) {
      opener.addEventListener("click", function () {
        show(index);
        lightbox.showModal();
      });
    });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.hasAttribute("data-lightbox-close")) lightbox.close();
    });
    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") show(current + 1);
      if (event.key === "ArrowLeft") show(current - 1);
    });
  }
})();
