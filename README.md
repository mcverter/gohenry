# GoHenry Front End Take Home

## Usage

Start backend

```sh
$ cd dummy-card-api
$ yarn install
$ yarn start
```

Start front end

```sh
$ cd client
$ yarn install
$ yarn  start
```

Application will be available on http://localhost:8080/

# Testing

```sh
$ cd client
$ yarn test
```

# Delivered

- This exercise aims to build a card slider component which displays content using a card subcomponent, according to the specs included.

Card and Slider web components implemented.

- This component should show a fixed (configurable) number of cards at a time, and slide for more when the user clicks the arrow buttons.

The Slider component accepts an attribute "size" which controls how many slides will be shown on the screen. If this attribute is not given, it is given a default value of 3. On mobile screens, any given or implicit value will be overridden to the value of 1 so that it only displays a single slide at a time.

- Display 2 of these card sliders in one HTML page. One card slider with 6 slides and one with 8 slides

I was unclear about this instruction. I added a second attribute "total" to control what the total number of slides should be.

This application currently displays 3 Slider components:

1. Total=8, Size=4
2. Total=6 Size=2
3. No attributes are given. Slider will use defaults (Size=3, Total=All fetched results)

- Optimise the HTML page to be SEO friendly with meta for Facebook and Twitter, include Google Analytics and GTM (use dummy SEO data, but have an analytics account setup by yourself)

Meta tags and Analytics javascript added.

- Create a repository on github and commit often to see progress

https://github.com/mcverter/gohenry

- No frameworks/UI Libraries are allowed, that means no Angular/Ember/React code. This is a plain HTML/CSS/JS exercise.

Web Components were used

- The delivered code should include unit tests.

Tests have been added to test the display of the gohenry-card and much of the functionality of the gohenry-slider.
This is my first time working directly with the Shadow DOM so I will be continuing to refine these tests

- The component should be reusable on different parts of the project / different projects.

gohenry-slider and gohenry-card components are Web Components that you can use anywhere

- If transitions are used, make them as smooth as possible.

Transitions were not used

- Since the component is reusable, implement it in order to function properly and smoothly on mobile devices.

On mobile screens, Slider will only display a single slide at a time.

- Learn more will lead to https://gohenry.com/uk

Done

- CSS Modules

CSS Modules are used for Card and Slider components.

- Unit Tests

All tests pass!
