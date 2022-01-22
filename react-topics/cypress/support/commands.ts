import { scrollToBottom } from './helpers';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add(
  'waitAndScroll',
  (PAGE_LOADING_SPINNER: string, DEFAULT_LOADING_SPINNER: string) => {
    // Make sure the page is not loading anymore
    cy.findByTestId(PAGE_LOADING_SPINNER).should('not.exist');
    // Scroll to the bottom of the page slowly (to trigger lazy loading)
    cy.window().then(async ($window) => {
      await scrollToBottom({
        frequency: 100,
        timing: 2,
        remoteWindow: $window,
      });
      await $window.scrollTo(0, 0);
      await scrollToBottom({
        remoteWindow: $window,
      });
    });
    //  Wait for all Image Loading Spinners to be gone
    cy.findAllByTestId(DEFAULT_LOADING_SPINNER).should('not.exist');
  },
);
addMatchImageSnapshotCommand();
/**
 * This removes typical dynamic classes from the html to prepare for a snapshot
 * @param subject
 */
Cypress.Commands.add(
  'sanitizeDom',
  (subject: string, attributes: string[], expressions: string[]) => {
    return cy.get(subject).then(() => {
      const matchingExpression = new RegExp(expressions.join('|'), 'g');
      Cypress.$('*').each(function () {
        attributes.forEach((attribute) => {
          const attributeValue = Cypress.$(this).attr(attribute);
          if (attributeValue) {
            this.setAttribute(
              attribute,
              attributeValue.replace(matchingExpression, ''),
            );
          }
        });
      });
    });
  },
);
