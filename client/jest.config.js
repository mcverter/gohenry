module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom-sixteen",

  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  setupFilesAfterEnv: ["./testSetup.js"],
};
