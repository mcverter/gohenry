const CARDS_URL = "http://localhost:3000/cards";

export default class Slider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["loading", "cards", "start"];
  }

  get start() {
    return JSON.parse(this.getAttribute("start"));
  }
  set start(v) {
    this.setAttribute("start", JSON.stringify(v));
  }
  get size() {
    return this.getAttribute("size")
      ? JSON.parse(this.getAttribute("size"))
      : Number.MAX_SAFE_INTEGER;
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
    this.loading = true;
    const response = await fetch(url);
    const json = await response.json();
    this.start = 0;
    this.cards = json.slice(0, this.size);
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
    this.start = this.start + 1;
  }
  previous() {
    this.start = this.start - 1;
  }
  renderPrevious() {
    if (this.start > 0) {
      return `<div id="previous">Previous</div>`;
    } else {
      return `<div>No previous cards.</div>`;
    }
  }
  renderNext() {
    if (this.start + 3 < this.size) {
      return `<div id="next">Next</div>`;
    } else {
      return `<div>No more slides.</div>`;
    }
  }
  render() {
    console.log(
      "start",
      this.start,
      "size",
      this.size,
      Math.min(this.start + 3, this.size),
      this.cards.slice(this.start, Math.min(this.start + 3, this.size))
    );
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = `
            <style>
              .slider {
                display: flex;
                justify-content: space-around
              }
            </style>
            <div class="slider">
              ${this.cards
                .slice(this.start, Math.min(this.start + 3, this.size))
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
                })}
              <div class="navigation">
                ${this.renderPrevious()}
                ${this.renderNext()}
              </div>
    
        `;
    }
  }
}
