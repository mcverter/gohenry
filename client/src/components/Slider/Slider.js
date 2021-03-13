import "regenerator-runtime/runtime";
import styles from "./Slider.styles.css";

const CARDS_URL = "http://localhost:3000/cards";

window.customElements.define(
  "gohenry-slider",
  class Slider extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
      return ["loading", "cards", "start"];
    }
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    }
    get cards() {
      return JSON.parse(this.getAttribute("cards"));
    }
    set cards(v) {
      this.setAttribute("cards", JSON.stringify(v));
    }
    get start() {
      return JSON.parse(this.getAttribute("start"));
    }
    set start(v) {
      this.setAttribute("start", JSON.stringify(v));
    }
    get size() {
      return JSON.parse(this.getAttribute("size")) || 3;
    }
    set size(v) {
      this.setAttribute("size", JSON.stringify(v));
    }
    get total() {
      return JSON.parse(this.getAttribute("total"));
    }
    set total(v) {
      this.setAttribute("total", JSON.stringify(v));
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render();
    }

    async fetchCards(url) {
      this.loading = true;
      const response = await fetch(url);
      const json = await response.json();
      this.start = 0;
      if (!this.total) {
        this.total = json.length;
      }
      this.cards = json.slice(0, this.total);
      this.loading = false;
    }

    async connectedCallback() {
      this.shadowRoot.addEventListener("click", (event) => {
        const name = event.target.id;
        if (this[name]) {
          this[name]();
        }
      });

      /* Mobile devices only show one slide */
      if (screen.width && screen.width < 720) {
        this.size = 1;
      }
      await this.fetchCards(CARDS_URL);
    }

    next() {
      this.start = this.start + 1;
    }
    previous() {
      this.start = this.start - 1;
    }

    render() {
      if (this.loading) {
        this.shadowRoot.innerHTML = `Loading...`;
      } else {
        while (this.shadowRoot.firstChild) {
          this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
        const styleTag = document.createElement("style");
        styleTag.textContent = styles;
        this.shadowRoot.appendChild(styleTag);

        const sliderContainer = document.createElement("div");
        sliderContainer.setAttribute("class", "slider");

        this.cards
          .slice(this.start, Math.min(this.start + this.size, this.total))
          .forEach((card) => {
            const { title, subtitle, text, image_url } = card;

            const goHenryCard = document.createElement("gohenry-card");
            goHenryCard.setAttribute("title", title);
            goHenryCard.setAttribute("subtitle", subtitle);
            goHenryCard.setAttribute("text", text);
            goHenryCard.setAttribute("image_url", image_url);
            sliderContainer.appendChild(goHenryCard.cloneNode(true));
          });

        this.shadowRoot.appendChild(sliderContainer);

        const navContainer = document.createElement("div");
        navContainer.setAttribute("class", "navigation");
        const prevButton = document.createElement("button");
        prevButton.setAttribute("id", "previous");
        prevButton.innerText = "‹";
        if (this.start === 0) {
          prevButton.style.visibility = "hidden";
        }
        const nextButton = document.createElement("button");
        nextButton.setAttribute("id", "next");
        nextButton.innerText = "›";
        if (this.start + this.size === this.total) {
          nextButton.style.visibility = "hidden";
        }
        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);

        this.shadowRoot.append(navContainer);
      }
    }
  }
);
