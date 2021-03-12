const template = document.createElement("template");
template.innerHTML = `
  <style>
    .slide {
      width: 308px;
      margin: 26px;
      background-color: white;
      border: 1px solid #f6f6f6;
    }

    .title {
      font-size: 23px;
      color: #3a3a3a;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
    }
    .subtitle {
      font-size: 12px;
      color: #adadad;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
    }

    .text {
      font-size: 12px;
      color: #3a3a3a;
      line-height: 1.583;
      font-family: Arial, Helvetica, sans-serif;
    }

    .info {
      margin: 19px;
    }
    .learn-more {
      font-size: 16px;
      color: #2da936;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
    }
  </style>

  <div class="slide">
    <img />
    <div class="info">
      <h1 class="title"></h1>
      <h2 class="subtitle"></h2>
      <p class="text"></p>
      <div class="learn-more">Learn more</div>
    </div>
  </div>
`;

export default class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".title").innerText = this.getAttribute(
      "title"
    );
    this.shadowRoot.querySelector(".subtitle").innerText = this.getAttribute(
      "subtitle"
    );
    this.shadowRoot.querySelector(".text").innerHTML = this.getAttribute(
      "text"
    );
    this.shadowRoot.querySelector("img").src = this.getAttribute("image_url");
  }
}
