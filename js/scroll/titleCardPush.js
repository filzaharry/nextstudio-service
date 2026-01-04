export function initTitleCardPush() {
  const section = document.getElementById("servicesSection");
  const title = document.querySelector(".title-container");
  const cards = document.querySelector(".cards-wrapper");

  const START = 0.5; // 50%
  const END = 0.9; // 90%
  const RANGE = END - START;

  const START_Y = window.innerHeight * 1.2;
  const THRESHOLD = 10;

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  function update() {
    /* ------------------------------
       1. SCROLL PROGRESS (0–1)
    ------------------------------ */
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const vh = window.innerHeight;

    let progress = (window.scrollY - sectionTop) / (sectionHeight - vh);
    progress = clamp(progress, 0, 1);

    /* ------------------------------
       2. CARDS BASE MOVEMENT (50%–90%)
    ------------------------------ */
    let cardsProgress = clamp((progress - START) / RANGE, 0, 1);

    const baseY = START_Y * (1 - cardsProgress);

    /* ------------------------------
       3. PUSH LOGIC (REAL DISTANCE)
    ------------------------------ */
    const titleRect = title.getBoundingClientRect();
    const cardsRect = cards.getBoundingClientRect();
    const gap = cardsRect.top - titleRect.bottom;

    let push = 0;
    if (gap <= THRESHOLD) {
      push = THRESHOLD - gap;
    }

    /* ------------------------------
       4. APPLY TRANSFORMS
    ------------------------------ */
    title.style.transform = `
      translate(-50%, calc(-50% - ${push}px))
    `;

    cards.style.transform = `
      translateY(${baseY - push}px)
    `;

    requestAnimationFrame(update);
  }

  update();
}
