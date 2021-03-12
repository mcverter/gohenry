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
    return JSON.parse(this.getAttribute("size")) || 3;
  }

  get total() {
    return JSON.parse(this.getAttribute("total"));
  }
  set total(v) {
    this.setAttribute("total", JSON.stringify(v));
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
    if (!this.total) {
      this.total = json.length;
    }
    this.cards = json.slice(0, this.total);
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
      return `<div id="previous">&lt;</div>`;
    } else {
      return `<div>&nbsp;</div>`;
    }
  }
  renderNext() {
    if (this.start + this.size < this.total) {
      return `<div id="next">&gt;</div>`;
    } else {
      return `<div>&nbsp;</div>`;
    }
  }
  render() {
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = `
            <style>
              .slider {
                display: flex;
                justify-content: space-around
              }
              .navigation {
                width: 40px;
                margin: auto;
                color: #2da936;
                font-size: 20px;
                display: flex;
                justify-content: space-between;
              }
            </style>
            <div class="slider">
              ${this.cards
                .slice(this.start, Math.min(this.start + this.size, this.total))
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
              </div>
              <div class="navigation">
                ${this.renderPrevious()}
                ${this.renderNext()}
              </div>
    
        `;
    }
  }
}
