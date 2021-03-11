const CARDS_URL = "http://localhost:3000/cards";

export default class Slider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["loading", "cards"];
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
  async fetchCards(url) {
    const size = this.getAttribute("size") || Number.MAX_SAFE_INTEGER;
    this.loading = true;
    const response = await fetch(url);
    const json = await response.json();
    this.cards = json.slice(0, size);
    this.loading = false;
  }
  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (event) => {
      const name = event.srcElement.id;
      if (this[name]) {
        this[name]();
      }
    });
    await this.fetchCards(CARDS_URL);
  }
  disconnectedCallback() {}
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
  next() {
    this.fetchCards(this.cards.next);
  }
  previous() {
    this.fetchCards(this.cards.previous);
  }
  renderPrevious() {
    if (this.cards.previous) {
      return `<div id="previous">Previous</div>`;
    } else {
      return `<div>No previous cards.</div>`;
    }
  }
  renderNext() {
    if (this.cards.next) {
      return `<div id="next">Next</div>`;
    } else {
      return `<div>No more cards.</div>`;
    }
  }
  render() {
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = `
            ${this.renderPrevious()}
            ${this.renderNext()}
            <style>
              .slider {
                display: flex;
              }
            </style>
            <div class="slider">
              ${this.cards
                .slice(0, 3)
                .map((card) => {
                  const { title, subtitle, text, image_url } = card;
                  return `
                  <gohenry-card
                  title="${title}"
                  subtitle="${subtitle}"
                  text="${text}"
                  image_url="${image_url}"
                ></gohenry-card>
            
              `;
                })
                .join("")}
        `;
    }
  }
}
