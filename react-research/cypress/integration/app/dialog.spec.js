/// <reference types="cypress" />

context('Dialog', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('it should open a dialog', () => {
        cy.get('[data-cy=search-result-grid-card]').first().click();
        cy.wait(2000);
        cy.get('#DetailPage [data-cy=object-actions-download]').eq(1).click();
        cy.get('.MuiDialog-container').should('exist');
    });
    it('it should close a dialog', () => {
        cy.get('[data-cy=search-result-grid-card]').first().click();
        cy.wait(2000);
        cy.get('#DetailPage [data-cy=object-actions-download]').eq(1).click();
        cy.get('.MuiDialog-container').should('exist');
        cy.get('[data-cy=dialog-close]').click();
        cy.get('.MuiDialog-container').should('not.exist');
    });
    it('it should download image', () => {
        cy.get('[data-cy=search-result-grid-card]').first().click();
        cy.wait(2000);
        cy.get('#DetailPage [data-cy=object-actions-download]').eq(1).click();
        cy.get('[data-cy=download-dialog-download]').should('exist');
    });
});
