import styles from './Card.styles.scss';

const template = document.createElement('template');

template.innerHTML = `
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
  'gohenry-card',
  class Card extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const styleTag = document.createElement('style');
      styleTag.textContent = styles;
      this.shadowRoot.appendChild(styleTag);

      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector(
        '.gh-card-title',
      ).innerHTML = this.getAttribute('title');
      this.shadowRoot.querySelector(
        '.gh-card-subtitle',
      ).innerHTML = this.getAttribute('subtitle');
      this.shadowRoot.querySelector(
        '.gh-card-text',
      ).innerHTML = this.getAttribute('text');
      this.shadowRoot.querySelector('img').src = this.getAttribute('image_url');
    }
  },
);
