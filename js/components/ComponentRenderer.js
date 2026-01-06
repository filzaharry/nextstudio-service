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

      // Reorder based on position
      const article = clone.querySelector(".service-card");
      const sectionImage = clone.querySelector(".section-image");
      const sectionTitle = clone.querySelector(".section-title");
      const sectionContent = clone.querySelector(".section-content");

      const sections = [
        { el: sectionTitle, pos: cardData.title.position },
        { el: sectionContent, pos: cardData.content.position },
        { el: sectionImage, pos: cardData.image.position },
      ];

      const sortedSections = [];
      sections.forEach((sec) => {
        if (sec.pos === "left") sortedSections[0] = sec.el;
        else if (sec.pos === "center") sortedSections[1] = sec.el;
        else if (sec.pos === "right") sortedSections[2] = sec.el;
      });

      sortedSections.forEach((el) => {
        if (el) article.appendChild(el);
      });

      wrapper.appendChild(clone);
    });
  }
}
