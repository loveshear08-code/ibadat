/* ==========================================
   IBADAT — FARZ, WAJIB O SUNNAT
   Page JavaScript
   ========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const page = document.querySelector(".farz-wajib-sunnat-page");

  if (!page) {
    console.warn("Farz-Wajib-Sunnat page not found.");
    return;
  }

  // 1. Check required page sections.
  const requiredElements = [
    ".hero-board",
    "#farz",
    "#wajib",
    "#sunnat",
    ".page-footer"
  ];

  requiredElements.forEach(function (selector) {
    if (!page.querySelector(selector)) {
      console.warn("Required page section not found:", selector);
    }
  });

  // 2. Check topic images without changing their paths or appearance.
  page.querySelectorAll(".topic-image img").forEach(function (image) {
    image.addEventListener("error", function () {
      console.warn("Image could not be loaded:", image.getAttribute("src"));
      image.classList.add("image-load-error");
    });

    image.addEventListener("load", function () {
      image.classList.remove("image-load-error");
    });
  });

  // 3. Smooth scrolling for links to sections on this page.
  page.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);

      if (!target || !page.contains(target)) {
        return;
      }

      event.preventDefault();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // 4. Respect the user's reduced-motion preference.
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function updateMotionPreference(event) {
    if (event.matches) {
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      document.documentElement.style.scrollBehavior = "";
    }
  }

  updateMotionPreference(motionPreference);

  if (motionPreference.addEventListener) {
    motionPreference.addEventListener(
      "change",
      updateMotionPreference
    );
  }

  console.info("Farz-Wajib-Sunnat page initialized.");
});
