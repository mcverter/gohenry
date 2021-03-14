module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    //   "node_modules/(?!(testing-library__dom|@open-wc)/)",
  ],
  testEnvironment: "jest-environment-jsdom-sixteen",

  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/styleMock.js",
  },
};
