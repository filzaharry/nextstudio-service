export function initNavIndicator() {
  const items = document.querySelectorAll(".nav-item");
  const indicator = document.querySelector(".hover-indicator");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });
}
