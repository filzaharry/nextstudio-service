import ComponentRenderer from "./components/ComponentRenderer.js";
import { initScrollProgress } from "./scroll/ScrollProgress.js";
import { initTitleCardPush } from "./scroll/titleCardPush.js";
import { initNavIndicator } from "./ui/navIndicator.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".fixed-nav-container").innerHTML = await ComponentRenderer.loadComponent("components/navbar.html");
  document.querySelector(".title-section").innerHTML = await ComponentRenderer.loadComponent("components/title.html");

  const data = await fetch("data/services.json").then((r) => r.json());
  await ComponentRenderer.renderCards(data);

  initScrollProgress(document.getElementById("servicesSection"));
  initTitleCardPush();
  initNavIndicator();

  console.log("✅ Services animation ready");
});
