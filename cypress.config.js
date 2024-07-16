import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: 'http://10.1.1.252:5173/', // ajuste a URL conforme necessário
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  env: {
    MAILOSAUR_API_KEY: '2cOoGdOo1qf3Qk7AvP4yUBuGbhWzjYSG',
    MAILOSAUR_SERVER_ID: 'xfo34tni',
    MAILOSAUR_SERVER_DOMAIN: 'xfo34tni.mailosaur.net'
  }
});
