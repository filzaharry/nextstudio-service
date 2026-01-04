export function initNavIndicator() {
  const items = document.querySelectorAll(".nav-item");
  const indicator = document.querySelector(".hover-indicator");

  items.forEach((item, i) => {
    item.addEventListener("click", () => {
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      indicator.style.transform = `translateX(${i * 80}px)`;
      indicator.style.opacity = 1;
    });
  });
}
