import "./Slider";
import "@testing-library/jest-dom/extend-expect";
import {getByTestId, queryAllByTestId, queryByTestId} from "testing-library__dom";
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
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 3,
    "title": "We change",
    "subtitle": "What will you find here",
    "text": "Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it.",
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 4,
    "title": "We hire differently",
    "subtitle": "What will you find here",
    "text": "Most companies operate under the premise that employees should be replaceable like parts of an assembly line. We choose our people more carefully.",
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 5,
    "title": "Get autonomous",
    "subtitle": "What will you find here",
    "text": "You’re given an incredible amount of freedom and autonomy at gohenry. That goes for everyone.",
    "image_url": "http://lorempixel.com/300/150/"
  },
  {
    "id": 6,
    "title": "Work together",
    "subtitle": "What will you find here",
    "text": "Our flat structure calls for it by necessity. Being a leader may feel unnatural at first, but we expect everyone to step up and own part of the project.",
    "image_url": "http://lorempixel.com/300/150/"
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

  it("has the correct three cards", () => {
    const cards = div.getElementsByTagName('gohenry-card')
    expect(2).toBe(1)
  });
  it("has a working next button and previous button", () => {
    const cards = div.getElementsByTagName('gohenry-card')
    expect(2).toBe(1)
  });
});

describe("Special Tests", () => {
  const div = document.createElement('div');

  beforeAll(()=>{
    fetchMock.get("http://localhost:3000/cards", JSON.stringify(fetchMockResponse))
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



/*


            <style>
              .slider {
                display: flex;
                justify-content: space-around
              }
              .navigation {
                width: 40px;
                margin: auto;
                display: flex;
                justify-content: space-between;
              }
              .navigation > button {
                color: #2da936;
                font-size: 26px;
                font-weight: bold;
                border: none;
                font-family: Arial, Helvetica, sans-serif;
              }

            </style>
            <div class="slider">

                  <gohenry-card title="We are Humans" subtitle="What will you find here" text="We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite." image_url="http://lorempixel.com/300/150/"></gohenry-card>

              ,
                  <gohenry-card title="We work together" subtitle="What will you find here" text="We insist on working collaborativelly. <strong>No rockstars</strong>. No departments. The whole owns the whole project together." image_url="http://lorempixel.com/300/150/"></gohenry-card>

              ,
                  <gohenry-card title="We change" subtitle="What will you find here" text="Nothing is sacred, from our habits to our rituals, to our enviroment. Change is a natural part of the human life, and we prefer to embrace it." image_url="http://lorempixel.com/300/150/"></gohenry-card>


              </div>
              <div class="navigation">
                <button style="visibility:hidden">‹</button>
                <button id="next">›</button>
              </div>


 */