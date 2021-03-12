import "./Card";
import {getByTestId} from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";
import "@testing-library/jest-dom/extend-expect";

const getShadowRoot = (tagName) => {
  return document.body.getElementsByTagName(tagName)[0].shadowRoot;
};

describe("Card Custom Element", () => {
  const title="We are Humans"
  const subtitle="What will you find here"
  const text="We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite."
  const image_url="http://lorempixel.com/300/150/"
  beforeEach(async () => {
    await fixture(`<gohenry-card
    title=${title}
    subtitle=${subtitle}
    text=${text}
    image_url=${image_url}
    ></gohenry-card>`);
  });

  it("has title", () => {
    const div = document.createElement('div')
    div.innerHTML = document.body.getElementsByTagName('gohenry-card')[0].shadowRoot.innerHTML;

    expect(getByTestId(div, 'gh-card-title')).toBeDefined()
    expect(getByTestId(div, 'gh-card-title')).toHaveTextContent(title)
  });
  it("has subtitle", () => {
    const div = document.createElement('div')
    div.innerHTML = document.body.getElementsByTagName('gohenry-card')[0].shadowRoot.innerHTML;

    expect(getByTestId(div, 'gh-card-subtitle')).toBeDefined()
    expect(getByTestId(div, 'gh-card-subtitle')).toHaveTextContent(subtitle)
  });

  it("has text", () => {
    const div = document.createElement('div')
    div.innerHTML = document.body.getElementsByTagName('gohenry-card')[0].shadowRoot.innerHTML;

    expect(getByTestId(div, 'gh-card-text')).toBeDefined()
    expect(getByTestId(div, 'gh-card-text')).toHaveTextContent(subtitle)
  });

  it("has image url", () => {
    const div = document.createElement('div')
    div.innerHTML = document.body.getElementsByTagName('gohenry-card')[0].shadowRoot.innerHTML;

    expect(getByTestId(div, 'gh-card-img')).toBeDefined()
    expect(getByTestId(div, 'gh-card-img')).toHaveAttribute('src', image_url)
  });

});
