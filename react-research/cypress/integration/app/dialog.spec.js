/* eslint-disable */
/// <reference types="cypress" />

context('Dialog', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it should open a dialog', () => {
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.wait(2000);
    cy.findAllByTestId('object-actions-download').click();
    cy.get('.MuiDialog-container').should('exist');
  });
  it('it should close a dialog', () => {
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.findAllByTestId('object-actions-download').click();
    cy.get('.MuiDialog-container').should('exist');
    cy.get('[data-cy=dialog-close]').click(); // attribute getting from component library
    cy.get('.MuiDialog-container').should('not.exist');
  });
  it('it should download image', () => {
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.wait(2000);
    cy.findAllByTestId('object-actions-download').click();
    cy.wait(2000);
    cy.get('[data-cy=download-dialog-download]').should('exist'); // attribute getting from component library
  });
});
