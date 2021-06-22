/// <reference types="cypress" />

context('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('it should animate label on focus', () => {
        cy.get('.MuiAutocomplete-inputFocused').focus().parent().should('have.class', 'Mui-focused');
    });
    it('it should display one item when type "Tiroler"', () => {
        cy.get('.MuiAutocomplete-inputFocused').type('Tiroler');
        cy.get('.MuiAutocomplete-option').should('have.length', 1);
    });
});
