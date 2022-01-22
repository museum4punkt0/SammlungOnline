/* eslint-disable */
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

  it('it should change  url`s query parameters  by pagination ', () => {
    cy.url().should('include', 'limit=20&controls=none');
    cy.findAllByTestId('next-icon-button')
      .first()
      .then(($button) => {
        if (!$button.is(':disabled')) {
          $button.trigger('click');
          cy.url().should('include', 'limit=20&offset=20&controls=none');
        } else {
          cy.url().should('include', 'limit=20&controls=none');
        }
      });
  });
  it('it should  open detail pages ', () => {
    cy.findAllByTestId('search-result-grid-card').should('exist');
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.findAllByTestId('detail_page_loader_wrapper').should('be.visible')
    cy.wait(2000)
    cy.url().should('include', 'detail');
  });

  it('it should  open detail page and go to previous card ', () => {
    cy.findAllByTestId('search-result-grid-card').should('exist');
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.findAllByTestId('detail_page_loader_wrapper').should('be.visible')
    cy.url().should('include', 'detail');
    cy.wait(2000)
    cy.findAllByTestId('detail_page_navigation_wrapper')
      .children()
      .get('[data-testid=detail_page-detail_navigation]')
      .children()
      .eq(0)
      .children()
      .eq(2)
      .children()
      .eq(0)
      .children()
      .eq(0).click()
    cy.findAllByTestId('detail_page_loader_wrapper').should('be.visible')
    cy.url().should('include', 'detail');
  });
  it('it should  open detail page  and go back to main page', () => {
    cy.findAllByTestId('search-result-grid-card').should('exist');
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.findAllByTestId('detail_page_loader_wrapper').should('be.visible')
    cy.wait(2000)
    cy.url().should('include', 'detail');
    // click on logo to navigate to main page
    cy.findAllByTestId('root-wrapper')
      .children().eq(0)
      .children().eq(0)
      .children().eq(0)
      .children().eq(0)
      .children().eq(0)
      .children().eq(0)
      .click()
    cy.url().should('not.include', 'detail');
  });
  it('it should  open detail page  and go to another detail page  by click on carousel', () => {
    cy.findAllByTestId('search-result-grid-card').should('exist');
    cy.findAllByTestId('search-result-grid-card').first().click();
    cy.findAllByTestId('detail_page_loader_wrapper').should('be.visible')
    cy.wait(2000)
    cy.url().should('include', 'detail');
    cy.findAllByTestId('detail_page_wrapper')
      .children().eq(3)
      .children().eq(1)
      .children().eq(0)
      .children().eq(1)
      .children().eq(0)
      .click()
    cy.findAllByTestId('detail_page_loader_wrapper').should('be.visible')
    cy.wait(2000)
    cy.url().should('include', 'detail');
    cy.findAllByTestId('detail_page_wrapper').should('be.visible')
  });
  it('it should  display list and then display grid  ', () => {
    cy.findAllByTestId('search_pagination-change-view-button').should('exist');
    cy.findAllByTestId('search-result-grid-card').should('exist')
    cy.findAllByTestId('search_pagination-change-view-button').click()
    cy.findAllByTestId('search-result-list-card').should('exist')
    cy.findAllByTestId('search_pagination-change-view-button').click()
    cy.findAllByTestId('search-result-grid-card').should('exist')
  });
});
