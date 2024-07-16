// cypress/support/index.js
import 'cypress-mailosaur';

// Ignorar erros de ResizeObserver loop
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false;
  }
  return true;
});
