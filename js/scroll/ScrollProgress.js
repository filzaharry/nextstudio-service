export function initScrollProgress(section) {
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function update() {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const vh = window.innerHeight;

    let progress = (window.scrollY - top) / (height - vh);
    progress = clamp(progress, 0, 1);

    section.style.setProperty("--scroll-progress", progress);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}
