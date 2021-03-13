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
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|sass)$": "<rootDir>/styleMock.js"
  }
};
