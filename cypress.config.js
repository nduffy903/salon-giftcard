const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "https://gift-cards.phorest.com/salons/demous",
    chromeWebSecurity: false,
    defaultCommandTimeout: 5000
  },
})