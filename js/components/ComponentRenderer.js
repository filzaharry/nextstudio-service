export default class ComponentRenderer {
  static async loadComponent(url) {
    const res = await fetch(url);
    return await res.text();
  }

  static async renderCards(data) {
    const templateHtml = await this.loadComponent("components/card.html");
    const template = document.createElement("template");
    template.innerHTML = templateHtml;

    const wrapper = document.querySelector(".cards-wrapper");

    data.forEach((cardData, index) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".card-title").textContent = cardData.title.text;
      clone.querySelector(".card-subtitle").textContent = cardData.content.subtitle;
      clone.querySelector(".card-count").textContent = String(index + 1).padStart(2, "0");
      clone.querySelector(".card-image").style.backgroundImage = `url(${cardData.image.url})`;

      const tags = clone.querySelector(".card-tags");
      cardData.content.tags.forEach((tag) => {
        const el = document.createElement("span");
        el.className = "tag";
        el.textContent = tag;
        tags.appendChild(el);
      });

      wrapper.appendChild(clone);
    });
  }
}
