/* eslint-disable */
/// <reference types="cypress" />

context('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it should animate label on focus', () => {
    cy.get('.MuiAutocomplete-inputFocused')
      .focus()
      .parent()
      .should('have.class', 'Mui-focused');
  });

  it('it should display 3 item when type "Trinkschale" and possibility to click them', () => {
    cy.get('.MuiAutocomplete-inputFocused').type('Trinkschale');
    cy.get('.MuiAutocomplete-option').should('have.length', 3);
    cy.wait(2000)
    cy.get('.MuiAutocomplete-option').first().click();
  });

  it('it should display selected toggles item when user  click on them', () => {
    cy.findAllByTestId('grid-searchControls-switcher-wrapper')
      .children('.MuiFormControlLabel-root')
      .should('have.length', 3);

    //Check first switcher('attachments')
    cy.get('.MuiFormControlLabel-root').first().click();
    cy.url().should('include', 'limit=20&controls=attachments');
    cy.get('.MuiFormControlLabel-root').first().click();
    cy.url().should('include', 'limit=20&controls=none');

    //Check second switcher('highlights')
    cy.get('.MuiFormControlLabel-root').eq(1).click();
    cy.url().should('include', 'limit=20&controls=highlight');
    cy.get('.MuiFormControlLabel-root').eq(1).click();
    cy.url().should('include', 'limit=20&controls=none');

    //Check last switcher('exhibit')
    cy.get('.MuiFormControlLabel-root').last().click();
    cy.url().should('include', 'limit=20&controls=exhibit');
    cy.get('.MuiFormControlLabel-root').last().click();
    cy.url().should('include', 'limit=20&controls=none');
  });

  it('it should display addCondition field click on them', () => {
    cy.findAllByTestId('advance-search-filter-button').click()
    cy.findAllByTestId('addCondition-button').should('not.be.disabled').click()
    cy.findAllByTestId('search-condition-list-wrapper').should('have.length',1)
  });
  it('it should display "Collection" field', () => {
    cy.findAllByTestId('advance-search-filter-button').click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(0).click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(1).should('be.visible')
  });
  it('it should open "Collection" field and close it', () => {
    cy.findAllByTestId('advance-search-filter-button').trigger('click')
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(0).click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(1).should('be.visible')
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(0).click()
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(1).should('not.be.visible')
  });

  it('it should display "Location" field', () => {
    cy.findAllByTestId('advance-search-filter-button').click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(2).children().eq(1).click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(2).should('be.visible')
  });
  it('it should open "Location" field and  close it', () => {
    cy.findAllByTestId('advance-search-filter-button').click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(2).click()
    cy.wait(2000)
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(3).should('be.visible')
    cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(2).click()
      cy.findAllByTestId('search_filter_accordion_wrapper').children().eq(3).should('not.be.visible')
  });
});
