import { defineConfig } from "cypress";
// const { defineConfig } = require("cypress");

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Time-wise",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    // debug:true,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  env: {
    api: "http://localhost:3001",
  },
});
// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   reporter: "cypress-mochawesome-reporter",
//   experimentalStudio: true,
//   screeshotOnRunFailure: true,
//   reporterOptions: {
//     reportDir: " cypress/report",
//     charts: true,
//     reportPageTitle: "custom-title",
//     embeddedScreenshots: true,
//     inlineAssets: true,
//     saveAllAttempts: true,
//     // debug:true,
//   },
//   e2e: {
//     baseUrl: "http://localhost:3000",
//     watchForFileChanges: false,
//     setupNodeEvents(on, config) {
//       require("cypress-mochawesome-reporter/plugin")(on);
//     },
//   },
//   env: {
//     api: "http://localhost:3001",
//   },
// });
