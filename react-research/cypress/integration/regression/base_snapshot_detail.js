/**
 * Constants to test page loading against.
 * They are implemented with 'data-testid' attribute in lazyload)
 */

const dataTestIds = {
  DEFAULT_LOADING_SPINNER: 'default-loading-spinner',
  DETAIL_BOTTOM_CAROUSEL_CARD: 'carousel-card',
  DETAIL_PAGE_IMAGE_CONTAINER: 'detail-page-image-container',
  PAGE_LOADING_SPINNER: 'page-loading-spinner',
  SEARCH_RESULT_CARD: 'search-result-card',
};
const {
  DEFAULT_LOADING_SPINNER,
  DETAIL_BOTTOM_CAROUSEL_CARD,
  DETAIL_PAGE_IMAGE_CONTAINER,
  PAGE_LOADING_SPINNER,
  SEARCH_RESULT_CARD,
} = dataTestIds;

it('Snapshots Research Portal Detail Page', () => {
  // Go to the index Page, wait&scroll and take a picture
  cy.visit('/');
  // Make sure the page Spinner was there
  cy.findByTestId(PAGE_LOADING_SPINNER).should('be.visible');

  // Wait for a Search results card to show up
  // then for all Image Loading Spinners to be gone
  cy.findAllByTestId(SEARCH_RESULT_CARD).should('be.visible');
  cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

  // Scroll to top, then Repeat waiting and scrolling
  // to make sure we did not miss anything
  cy.window().scrollTo(0, 0);
  cy.findAllByTestId(SEARCH_RESULT_CARD).should('be.visible');
  cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

  // Navigate the Website to a Details view:
  // Select the first Search Result
  cy.findAllByTestId(SEARCH_RESULT_CARD).first().click();

  // Wait for a the Detail Page Container to show up
  // then for all Image Loading Spinners to be gone
  cy.findAllByTestId(DETAIL_PAGE_IMAGE_CONTAINER).should('be.visible');
  cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
  // Wait for a Bottom Carousel card to show up
  // then for all Image Loading Spinners to be gone
  cy.findAllByTestId(DETAIL_BOTTOM_CAROUSEL_CARD).should('be.visible');
  cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
    const muiClassExpression = '(?<=mui-)([0-9]*)(?=-[a-zA-Z]*)?';
    const MuiClassExpression = '(?<=Mui[a-zA-Z].*)([0-9]{3,6})(?=-[a-zA-Z]*)?';
    const makeStyleClassExpression = '(?<=makeStyles-[a-zA-Z]*-)([0-9]+)';
    cy.sanitizeDom(
      'body',
      ['class', 'id', 'for'],
      [muiClassExpression, MuiClassExpression, makeStyleClassExpression],
    ).toMatchSnapshot();
  });
});
