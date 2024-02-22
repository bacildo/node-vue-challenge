module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.(css|scss|sass|less|styl|html|json)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["js", "json", "vue"],
  transformIgnorePatterns: ["/node_modules/(?!@babel)"],

  
};

module.exports = {
  transform: {
    "^.+\\.vue$": "vue-jest"
  }
};
