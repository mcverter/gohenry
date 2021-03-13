import "./Card";
import "@testing-library/jest-dom/extend-expect";
import { getByTestId } from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";

describe("Card Custom Element", () => {
  const title = "We are Humans";
  const subtitle = "What will you find here";
  const text =
    "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.";
  const image_url = "http://lorempixel.com/300/150/";
  const wrapper = document.createElement("div");

  beforeEach(async () => {
    await fixture(`
        <gohenry-card
          title="${title}"
          subtitle="${subtitle}"
          text="${text}"
          image_url="${image_url}"
          >
         </gohenry-card>`);
    wrapper.innerHTML = document.body.getElementsByTagName(
      "gohenry-card"
    )[0].shadowRoot.innerHTML;
  });

  it("has title", () => {
    expect(wrapper.getElementsByClassName("gh-card-title")[0]).toBeDefined();
    expect(
      wrapper.getElementsByClassName("gh-card-title")[0]
    ).toHaveTextContent(title);
  });
  it("has subtitle", () => {
    expect(wrapper.getElementsByClassName("gh-card-subtitle")[0]).toBeDefined();
    expect(
      wrapper.getElementsByClassName("gh-card-subtitle")[0]
    ).toHaveTextContent(subtitle);
  });

  it("has text", () => {
    expect(wrapper.getElementsByClassName("gh-card-text")[0]).toBeDefined();
    expect(wrapper.getElementsByClassName("gh-card-text")[0]).toHaveTextContent(
      text
    );
  });

  it("has image url", () => {
    expect(wrapper.getElementsByTagName("img")[0]).toBeDefined();
    expect(wrapper.getElementsByTagName("img")[0]).toHaveAttribute(
      "src",
      image_url
    );
  });
  it("has a learn more link that points to gohenry webpage", () => {
    const learnMoreDiv = wrapper.getElementsByClassName(
      "gh-card-learn-more"
    )[0];
    expect(learnMoreDiv).toBeDefined();
    expect(learnMoreDiv).toHaveTextContent(/learn more/i);
    expect(learnMoreDiv.childNodes[1].getAttribute("href")).toEqual(
      "https://gohenry.com/uk"
    );
  });
});
