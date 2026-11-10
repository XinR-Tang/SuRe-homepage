/* SuRe project page — small progressive enhancements (no dependencies) */
(function () {
  "use strict";

  /* ---------- sticky nav shadow + scroll progress + hero parallax ---------- */
  const nav = document.getElementById("nav");
  const bar = document.getElementById("scrollProgress");
  const hero = document.querySelector(".hero");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;

    nav.classList.toggle("is-stuck", y > 8);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

    if (!reduce) {
      if (hero) hero.style.setProperty("--shift", `${Math.min(y, 1200)}px`);
      const inner = hero && hero.querySelector(".hero-inner");
      if (inner && y < 900) inner.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---------- static preview mode (?static disables reveal for screenshots/PDF) ---------- */
  const STATIC = new URLSearchParams(location.search).has("static");

  /* ---------- scroll reveal ---------- */
  const items = document.querySelectorAll(".reveal");
  if (!STATIC && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Math.min(i * 70, 210)}ms`;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- honour #anchor even when smooth scrolling is interrupted ---------- */
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 76);
    }
  }

  /* ---------- active section in nav ---------- */
  const links = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- copy bibtex ---------- */
  const btn = document.getElementById("copyBtn");
  const bib = document.getElementById("bibtex");
  if (btn && bib) {
    btn.addEventListener("click", async () => {
      const text = bib.textContent;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      const old = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = old), 1600);
    });
  }
})();
