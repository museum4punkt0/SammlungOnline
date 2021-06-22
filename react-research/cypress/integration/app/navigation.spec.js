/// <reference types="cypress" />

context('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('cy.reload() - reload the page', () => {
        cy.reload();

        // reload the page without using the cache
        cy.reload(true);
    });
});
