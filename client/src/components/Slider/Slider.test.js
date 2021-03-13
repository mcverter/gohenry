import "./Slider";
import "@testing-library/jest-dom/extend-expect";
import {fireEvent, getByTestId, queryAllByTestId, queryByTestId} from "testing-library__dom";
import { fixture } from "@open-wc/testing-helpers";
import fetchMock from 'fetch-mock'
import 'regenerator-runtime/runtime'

const fetchMockResponse = [
  {
    "id": 1,
    "title": "We are Humans",
    "subtitle": "What will you find here",
    "text": "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 2,
    "title": "We work together",
    "subtitle": "What will you find here",
    "text": "We insist on working collaborativelly. <strong>No rockstars</strong>. No departments. The whole owns the whole project together.",
    "image_url": "http://lorempixel.com/300/140/"
  },
  {
    "id": 3,
    "title": "We change",
    "subtitle": "What will you find here",
    "text": "Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it.",
    "image_url": "http://lorempixel.com/300/130/"
  },
  {
    "id": 4,
    "title": "We hire differently",
    "subtitle": "What will you find here",
    "text": "Most companies operate under the premise that employees should be replaceable like parts of an assembly line. We choose our people more carefully.",
    "image_url": "http://lorempixel.com/300/120/"
  },
  {
    "id": 5,
    "title": "Get autonomous",
    "subtitle": "What will you find here",
    "text": "You’re given an incredible amount of freedom and autonomy at gohenry. That goes for everyone.",
    "image_url": "http://lorempixel.com/300/110/"
  },
  {
    "id": 6,
    "title": "Work together",
    "subtitle": "What will you find here",
    "text": "Our flat structure calls for it by necessity. Being a leader may feel unnatural at first, but we expect everyone to step up and own part of the project.",
    "image_url": "http://lorempixel.com/300/100/"
  },
  {
    "id": 7,
    "title": "Human Truths #1",
    "subtitle": "What will you find here",
    "text": "Humans are not perfect. Don’t be afraid to fail. And when you do, you might as well fail spectacularly. This is how we grow and learn.",
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 8,
    "title": "Human Truths #2",
    "subtitle": "What will you find here",
    "text": "Humans are unique. Do you love Portugueses Pop Music (<em>Pimba</em>)? Do you prefer your desk covered with sunflowers? There’s no need to hide it. Be yourself. That’s how you’ll fit in here.",
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 9,
    "title": "Humans are not \"resources\"",
    "subtitle": "What will you find here",
    "text": "New hires are interviewed by the people who will be working with them. So get ready to care a lot about the people you work with.",
    "image_url": "http://lorempixel.com/300/150/"
  }
]

describe("Slider Custom Element", () => {
  const div = document.createElement('div');

  beforeAll(()=>{
    fetchMock.get("http://localhost:3000/cards", JSON.stringify(fetchMockResponse))
  })

  beforeEach(async () => {
    await fixture(`
        <gohenry-slider
          total="8"
          size="3"
          >
         </gohenry-slider>`);
    div.innerHTML = document.body.getElementsByTagName('gohenry-slider')[0].shadowRoot.innerHTML;
  });

  it("has three cards initially", () => {
    expect(div.getElementsByTagName('gohenry-card')).toHaveLength(3)
  });

  it("shows the first three cards", () => {
    const cards = div.getElementsByTagName('gohenry-card')
    for (let i=0; i<3; i++) {
     expect(cards[i].getAttribute("title")).toEqual(fetchMockResponse[i].title)
      expect(cards[i].getAttribute("subtitle")).toEqual(fetchMockResponse[i].subtitle)
      expect(cards[i].getAttribute("text")).toEqual(fetchMockResponse[i].text)
      expect(cards[i].getAttribute("image_url")).toEqual(fetchMockResponse[i].image_url)
    }
  });

  it("has an invisible previous button and a visible next button", () => {
    const buttons = div.getElementsByTagName('button')
    expect(buttons[0].innerHTML).toEqual("‹")
    expect(buttons[0]).not.toBeVisible()
    expect(buttons[1].innerHTML).toEqual("›")
    expect(buttons[1]).toBeVisible()
  });

  it("clicking the next button will move the slides ahead", () => {
    const nextButton = div.getElementsByTagName('button')[1]
    fireEvent.click(nextButton)
    const cards = div.getElementsByTagName('gohenry-card')
    for (let i=0; i<3; i++) {
      expect(cards[i].getAttribute("title")).toEqual(fetchMockResponse[i+1].title)
      expect(cards[i].getAttribute("subtitle")).toEqual(fetchMockResponse[i+1].subtitle)
      expect(cards[i].getAttribute("text")).toEqual(fetchMockResponse[i+1].text)
      expect(cards[i].getAttribute("image_url")).toEqual(fetchMockResponse[i+1].image_url)
    }
  });
  it("clicking the previous button will move the slides back", () => {
    console.log('This can not be tested until next button test is implemented')
    expect(true).toBe(false)
  })

  it("can be customized for size", async () => {
    await fixture(`
        <gohenry-slider
          total="8"
          size="2"
          >
         </gohenry-slider>`);
    div.innerHTML = document.body.getElementsByTagName('gohenry-slider')[0].shadowRoot.innerHTML;
    expect(div.getElementsByTagName('gohenry-card')).toHaveLength(2)
  });
});
