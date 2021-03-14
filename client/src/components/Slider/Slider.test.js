import './Slider';
import '@testing-library/jest-dom/extend-expect';
import 'testing-library__dom';
import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import fetchMock from 'fetch-mock';
import 'regenerator-runtime/runtime';
import userEvent from '@testing-library/user-event';
import {
  expectCorrectCardsToBeOnScreen,
  fetchMockResponse,
  getButtonsWrapper,
  getCardsWrapper,
  getNextButton,
  getPreviousButton,
  getTotalCards,
} from './Slider.test.utils';

describe('Slider Custom Element. Size=3.  Total=8.', () => {
  const size = 3;
  const total = 8;

  beforeAll(() => {
    fetchMock.get(
      'http://localhost:3000/cards',
      JSON.stringify(fetchMockResponse),
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
      getCardsWrapper(document).getElementsByTagName('gohenry-card'),
    ).toHaveLength(3);
  });

  it(`shows the first ${size} cards`, () => {
    const cards = getCardsWrapper(document).getElementsByTagName(
      'gohenry-card',
    );
    expectCorrectCardsToBeOnScreen(cards, size);
  });

  it('has an invisible previous button and a visible next button', () => {
    const [previousButton, nextButton] = getButtonsWrapper(
      document,
    ).getElementsByTagName('button');
    expect(previousButton.innerHTML).toEqual('〈');
    expect(previousButton.id).toMatch('previous');
    expect(previousButton).not.toBeVisible();
    expect(nextButton.id).toMatch('next');
    expect(nextButton.innerHTML).toEqual('〉');
    expect(nextButton).toBeVisible();
  });

  it('clicking the next button will move the slides ahead', () => {
    const nextButton = getButtonsWrapper(document).getElementsByTagName(
      'button',
    )[1];
    userEvent.click(nextButton);

    const cards = getCardsWrapper(document).getElementsByTagName(
      'gohenry-card',
    );
    expectCorrectCardsToBeOnScreen(cards, size, 1);
  });
  it('clicking the previous button will move the slides back', () => {
    userEvent.click(getNextButton(document));
    userEvent.click(getNextButton(document));
    userEvent.click(getNextButton(document));
    userEvent.click(getNextButton(document));
    userEvent.click(getPreviousButton(document));

    const cards = getCardsWrapper(document).getElementsByTagName(
      'gohenry-card',
    );
    expectCorrectCardsToBeOnScreen(cards, size, 3);
  });

  it('Next button will be hidden when there are no remaining slides', () => {
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

  it(`contains ${total} cards total`, () => {
    const numSlides = getTotalCards(document, size);
    expect(numSlides).toEqual(total);
  });
});

describe('Slider Size=2.  Total=8', () => {
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
      'gohenry-card',
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

describe('Slider: Size=3, Total=6', () => {
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
      'gohenry-card',
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
