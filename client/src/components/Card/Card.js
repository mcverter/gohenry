// import styles from './Card.styles.scss'
const template = document.createElement("template");

template.innerHTML = `
  <style>
    .gh-card {
      width: 308px;
      height: 375px;
      margin: 26px;
      background-color: white;
      font-family: Arial, Helvetica, sans-serif;
      border: 1px solid #f6f6f6;
      position: relative;
    }

    .gh-card-title {
      font-size: 23px;
      color: #3a3a3a;
      font-weight: bold;
    }
    
    .gh-card-subtitle {
      font-size: 12px;
      color: #adadad;
      font-weight: bold;
    }

    .gh-card-text {
      font-size: 12px;
      color: #3a3a3a;
      line-height: 1.583;
    }

    .gh-card-info {
      margin: 19px;
    }
    .gh-card-learn-more {
      margin-left: 19px;
      position: absolute;
      bottom: 19px;
      }
      .gh-card-learn-more > a {
        font-size: 16px;
        color: #2da936;
        font-weight: bold;
        text-decoration: none;
      }
  </style>

  <div class="gh-card">
    <img alt="Our team at work!" />
    <div class="gh-card-info">
      <h1 class="gh-card-title"></h1>
      <h2 class="gh-card-subtitle"></h2>
      <p class="gh-card-text"></p>
    </div>
    <div class="gh-card-learn-more">
      <a href="https://gohenry.com/uk">    
        Learn more
      </a>
    </div>
  </div>
`;

window.customElements.define(
  "gohenry-card",
  class Card extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      /*   TODO:  Fix CSS imports
      const styleTag = document.createElement('style');
      styleTag.textContent = styles;
      this.shadowRoot.appendChild(styleTag);
      */

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector(
        ".gh-card-title"
      ).innerHTML = this.getAttribute("title");
      this.shadowRoot.querySelector(
        ".gh-card-subtitle"
      ).innerHTML = this.getAttribute("subtitle");
      this.shadowRoot.querySelector(
        ".gh-card-text"
      ).innerHTML = this.getAttribute("text");
      this.shadowRoot.querySelector("img").src = this.getAttribute("image_url");
    }
  }
);
