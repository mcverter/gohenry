import "./Slider";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "testing-library__dom";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import fetchMock from "fetch-mock";
import "regenerator-runtime/runtime";
import userEvent from "@testing-library/user-event";

const getCardsWrapper = (document) => {
  return document.body.getElementsByTagName("gohenry-slider")[0].shadowRoot
    .childNodes[1];
};
const getButtonsWrapper = (document) => {
  return document.body.getElementsByTagName("gohenry-slider")[0].shadowRoot
    .childNodes[2];
};

const getNextButton = (document) => {
  return getButtonsWrapper(document).getElementsByTagName("button")[1];
};
const getPreviousButton = (document) => {
  return getButtonsWrapper(document).getElementsByTagName("button")[0];
};

const expectCorrectCardsToBeOnScreen = (cards, size, offset = 0) => {
  for (let i = 0; i < size; i++) {
    expect(cards[i].getAttribute("title")).toEqual(
      fetchMockResponse[i + offset].title
    );
    expect(cards[i].getAttribute("subtitle")).toEqual(
      fetchMockResponse[i + offset].subtitle
    );
    expect(cards[i].getAttribute("text")).toEqual(
      fetchMockResponse[i + offset].text
    );
    expect(cards[i].getAttribute("image_url")).toEqual(
      fetchMockResponse[i + offset].image_url
    );
  }
};

const getTotalCards = (document, size) => {
  let numSlides = size;
  while (getNextButton(document).style.visibility !== "hidden") {
    userEvent.click(getNextButton(document));
    numSlides++;
  }
  return numSlides;
};
const fetchMockResponse = [
  {
    id: 1,
    title: "We are Humans",
    subtitle: "What will you find here",
    text:
      "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
    image_url: "http://lorempixel.com/300/150/",
  },
  {
    id: 2,
    title: "We work together",
    subtitle: "What will you find here",
    text:
      "We insist on working collaborativelly. <strong>No rockstars</strong>. No departments. The whole owns the whole project together.",
    image_url: "http://lorempixel.com/300/140/",
  },
  {
    id: 3,
    title: "We change",
    subtitle: "What will you find here",
    text:
      "Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it.",
    image_url: "http://lorempixel.com/300/130/",
  },
  {
    id: 4,
    title: "We hire differently",
    subtitle: "What will you find here",
    text:
      "Most companies operate under the premise that employees should be replaceable like parts of an assembly line. We choose our people more carefully.",
    image_url: "http://lorempixel.com/300/120/",
  },
  {
    id: 5,
    title: "Get autonomous",
    subtitle: "What will you find here",
    text:
      "You’re given an incredible amount of freedom and autonomy at gohenry. That goes for everyone.",
    image_url: "http://lorempixel.com/300/110/",
  },
  {
    id: 6,
    title: "Work together",
    subtitle: "What will you find here",
    text:
      "Our flat structure calls for it by necessity. Being a leader may feel unnatural at first, but we expect everyone to step up and own part of the project.",
    image_url: "http://lorempixel.com/300/100/",
  },
  {
    id: 7,
    title: "Human Truths #1",
    subtitle: "What will you find here",
    text:
      "Humans are not perfect. Don’t be afraid to fail. And when you do, you might as well fail spectacularly. This is how we grow and learn.",
    image_url: "http://lorempixel.com/300/150/",
  },
  {
    id: 8,
    title: "Human Truths #2",
    subtitle: "What will you find here",
    text:
      "Humans are unique. Do you love Portugueses Pop Music (<em>Pimba</em>)? Do you prefer your desk covered with sunflowers? There’s no need to hide it. Be yourself. That’s how you’ll fit in here.",
    image_url: "http://lorempixel.com/300/150/",
  },
  {
    id: 9,
    title: 'Humans are not "resources"',
    subtitle: "What will you find here",
    text:
      "New hires are interviewed by the people who will be working with them. So get ready to care a lot about the people you work with.",
    image_url: "http://lorempixel.com/300/150/",
  },
];

describe("Slider Custom Element. Size=3.  Total=8.", () => {
  const size = 3;
  const total = 8;

  beforeAll(() => {
    fetchMock.get(
      "http://localhost:3000/cards",
      JSON.stringify(fetchMockResponse)
    );
  });

  beforeEach(async () => {
    await fixture(`
        <gohenry-slider
          total=${total}
          size=${size}
          >
         </gohenry-slider>`);
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it(`has ${size} cards initially`, () => {
    expect(
      getCardsWrapper(document).getElementsByTagName("gohenry-card")
    ).toHaveLength(3);
  });

  it(`shows the first ${size} cards`, () => {
    const cards = getCardsWrapper(document).getElementsByTagName(
      "gohenry-card"
    );
    expectCorrectCardsToBeOnScreen(cards, size);
  });

  it("has an invisible previous button and a visible next button", () => {
    const [previousButton, nextButton] = getButtonsWrapper(
      document
    ).getElementsByTagName("button");
    expect(previousButton.innerHTML).toEqual("〈");
    expect(previousButton.id).toMatch("previous");
    expect(previousButton).not.toBeVisible();
    expect(nextButton.id).toMatch("next");
    expect(nextButton.innerHTML).toEqual("〉");
    expect(nextButton).toBeVisible();
  });

  it("clicking the next button will move the slides ahead", () => {
    const nextButton = getButtonsWrapper(document).getElementsByTagName(
      "button"
    )[1];
    userEvent.click(nextButton);

    const cards = getCardsWrapper(document).getElementsByTagName(
      "gohenry-card"
    );
    expectCorrectCardsToBeOnScreen(cards, size, 1);
  });
  it("clicking the previous button will move the slides back", () => {
    userEvent.click(getNextButton(document));
    userEvent.click(getNextButton(document));
    userEvent.click(getNextButton(document));
    userEvent.click(getNextButton(document));
    userEvent.click(getPreviousButton(document));

    const cards = getCardsWrapper(document).getElementsByTagName(
      "gohenry-card"
    );
    expectCorrectCardsToBeOnScreen(cards, size, 3);
  });

  it("Next button will be hidden when there are no remaining slides", () => {
    const size = 3;
    expect(getNextButton(document)).toBeVisible();
    userEvent.click(getNextButton(document));
    expect(getNextButton(document)).toBeVisible();
    userEvent.click(getNextButton(document));
    expect(getNextButton(document)).toBeVisible();
    userEvent.click(getNextButton(document));
    expect(getNextButton(document)).toBeVisible();
    userEvent.click(getNextButton(document));
    expect(getNextButton(document)).toBeVisible();
    userEvent.click(getNextButton(document));
    expect(getNextButton(document)).not.toBeVisible();
  });

  it("Contains 8 cards total", () => {
    const numSlides = getTotalCards(document, size);
    expect(numSlides).toEqual(total);
  });
});

describe("Slider Size=2.  Total=8", () => {
  const size = 2;
  const total = 8;
  beforeEach(async () => {
    await fixture(`
        <gohenry-slider
          total=${total}
          size=${size}
          >
         </gohenry-slider>`);
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it(`shows the first ${size} cards`, async () => {
    const cards = getCardsWrapper(document).getElementsByTagName(
      "gohenry-card"
    );
    expectCorrectCardsToBeOnScreen(cards, size);
    expect(cards).toHaveLength(size);
    expectCorrectCardsToBeOnScreen(cards, size);
  });

  it(`contains ${total} cards total`, () => {
    const numSlides = getTotalCards(document, size);
    expect(numSlides).toEqual(total);
  });
});

describe("Slider: Size=3, Total=6", () => {
  const size = 3;
  const total = 6;
  beforeEach(async () => {
    await fixture(`
        <gohenry-slider
          total=${total}
          size=${size}
          >
         </gohenry-slider>`);
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it(`shows the first ${size} cards`, async () => {
    const cards = getCardsWrapper(document).getElementsByTagName(
      "gohenry-card"
    );
    expectCorrectCardsToBeOnScreen(cards, size);
    expect(cards).toHaveLength(size);
    expectCorrectCardsToBeOnScreen(cards, size);
  });

  it(`contains ${total} cards total`, () => {
    const numSlides = getTotalCards(document, size);
    expect(numSlides).toEqual(total);
  });
});
