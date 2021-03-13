import "./Card";
import "@testing-library/jest-dom/extend-expect";
import {getByTestId} from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";

describe("Card Custom Element", () => {
  const title="We are Humans"
  const subtitle="What will you find here"
  const text="We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite."
  const image_url="http://lorempixel.com/300/150/"
  const div = document.createElement('div');

  beforeEach(async () => {
    await fixture(`
        <gohenry-card
          title="${title}"
          subtitle="${subtitle}"
          text="${text}"
          image_url="${image_url}"
          >
         </gohenry-card>`);
    div.innerHTML = document.body.getElementsByTagName('gohenry-card')[0].shadowRoot.innerHTML;
  });

  it("has title", () => {
    expect(div.getElementsByClassName('gh-card-title')[0]).toBeDefined()
    expect(div.getElementsByClassName('gh-card-title')[0]).toHaveTextContent(title)
  });
  it("has subtitle", () => {
    expect(div.getElementsByClassName('gh-card-subtitle')[0]).toBeDefined()
    expect(div.getElementsByClassName('gh-card-subtitle')[0]).toHaveTextContent(subtitle)
  });

  it("has text", () => {
    expect(div.getElementsByClassName('gh-card-text')[0]).toBeDefined()
    expect(div.getElementsByClassName('gh-card-text')[0]).toHaveTextContent(text)
  });

  it("has image url", () => {
    expect(div.getElementsByTagName('img')[0]).toBeDefined()
    expect(div.getElementsByTagName('img')[0]).toHaveAttribute('src', image_url)
  });
  it("has a learn more link that points to gohenry webpage", () => {
  });

});
