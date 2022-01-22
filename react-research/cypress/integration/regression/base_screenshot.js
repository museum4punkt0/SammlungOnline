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
  SEARCH_RESULT_CARD_CONTAINER: 'search-result-card-container',
};
describe('Research Portal Basic Visual Regression tests', () => {
  const {
    DEFAULT_LOADING_SPINNER,
    DETAIL_BOTTOM_CAROUSEL_CARD,
    DETAIL_PAGE_IMAGE_CONTAINER,
    PAGE_LOADING_SPINNER,
    SEARCH_RESULT_CARD_CONTAINER,
  } = dataTestIds;

  it('Screenshots the index page', () => {
    cy.task('log', [
      '*** PLEASE NOTE *****',
      'This test is tightly coupled to the API Data.',
      'The reason for this is, that we are almost always',
      'importing new API Data to the testing servers ourselves.',
      'This usually happens when we change API and Frontend implementations.',
      '',
      'If you switch the API you test against these tests will fail.',
      'Screenshots are produced against the dev-api server started with',
      '"REACT_APP_STAGE=dev npm run start"',
    ]);
    // Go to the index Page, wait&scroll and take a picture
    cy.visit('/');
    // Make sure the page Spinner was there
    cy.findByTestId(PAGE_LOADING_SPINNER).should('be.visible');

    // Wait for a Search results card to show up
    // then for all Image Loading Spinners to be gone
    cy.findAllByTestId(SEARCH_RESULT_CARD_CONTAINER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.findAllByTestId(SEARCH_RESULT_CARD_CONTAINER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('research_index');
    });
  });
  it('Screenshots the Details page', () => {
    cy.task('log', [
      '*** PLEASE NOTE *****',
      'This test is tightly coupled to the API Data.',
      'The reason for this is, that we are almost always',
      'importing new API Data to the testing servers ourselves.',
      'This usually happens when we change API and Frontend implementations.',
      '',
      'If you switch the API you test against these tests will fail.',
      'Screenshots are produced against the dev-api server started with',
      '"REACT_APP_STAGE=dev npm run start"',
    ]);
    // Go to the index Page, wait&scroll and take a picture
    cy.visit('/');
    // Make sure the page Spinner was there
    cy.findByTestId(PAGE_LOADING_SPINNER).should('be.visible');

    // Wait for a Search results card to show up
    // then for all Image Loading Spinners to be gone
    cy.findAllByTestId(SEARCH_RESULT_CARD_CONTAINER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.findAllByTestId(SEARCH_RESULT_CARD_CONTAINER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Navigate the Website to a Details view:
    // Select the first Search Result
    cy.findAllByTestId(SEARCH_RESULT_CARD_CONTAINER).children().first().click();

    // Wait for a the Detail Page Container to show up
    // then for all Image Loading Spinners to be gone
    cy.findAllByTestId(DETAIL_PAGE_IMAGE_CONTAINER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
    // Wait for a Bottom Carousel card to show up
    // then for all Image Loading Spinners to be gone
    cy.findAllByTestId(DETAIL_BOTTOM_CAROUSEL_CARD).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot(`research_detail`);
    });
  });
});
