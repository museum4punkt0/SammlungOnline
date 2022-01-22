/**
 * Constants to test page loading against.
 * They are implemented with 'data-testid' attribute in lazyload)
 */
const dataTestIds = {
  PAGE_LOADING_SPINNER: 'page-loading-spinner',
  PAGE_CONTENT_WRAPPER: 'page-content-wrapper',
  PAGE_TEXT_BOX_LINKS_WRAPPER: 'page-text-box-links-module-wrapper',
  PAGE_COLLECTION_MODULE_WRAPPER: 'page-content-collection-module-wrapper',
  PAGE_FOOTER_WRAPPER: 'application-footer-wrapper',
  GUIDE_PAGE_CONTENT_WRAPPER: 'guide-page-data-content-wrapper',
  DEFAULT_LOADING_SPINNER: 'default-loading-spinner',
};
describe('Guide Portal Basic Visual Regression tests', () => {
  const {
    PAGE_LOADING_SPINNER,
    PAGE_CONTENT_WRAPPER,
    PAGE_COLLECTION_MODULE_WRAPPER,
    PAGE_FOOTER_WRAPPER,
    GUIDE_PAGE_CONTENT_WRAPPER,
    PAGE_TEXT_BOX_LINKS_WRAPPER,
    DEFAULT_LOADING_SPINNER,
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
    ]);
    // Go to the index Page, wait&scroll and take a picture
    cy.visit('/');

    // Waiting for Slider loading
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Make sure the Slider wrapper visible
    cy.findAllByTestId(PAGE_CONTENT_WRAPPER)
      .children()
      .eq(0)
      .should('be.visible');

    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
    // Check if Slider's cards are visible
    cy.findAllByTestId(PAGE_CONTENT_WRAPPER)
      .children()
      .eq(1)
      .should('be.visible');

    // Check if TextBoxModules wrapper are visible
    cy.findAllByTestId(PAGE_TEXT_BOX_LINKS_WRAPPER).should('be.visible');

    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER_WRAPPER).children().eq(0).should('be.visible');

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('guide_index');
    });
  });

  it('Screenshots the Details page', () => {
    cy.task('log', [
      '*** PLEASE NOTE *****',
      'This test is tightly coupled to the API Data.',
      'The reason for this is, that we are almost always',
      'importing new API Data to the testing servers ourselves.',
      'This usually happens when we change API and Frontend implementations.',
      'If you switch the API you test against these tests will fail.',
    ]);
    // Go to the index Page, wait&scroll and take a picture
    cy.visit('/');
    // Wait for a Page Content Wrapper to show up
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
    // then for all Page Content Wrapper to be gone
    cy.findAllByTestId(PAGE_CONTENT_WRAPPER).should('be.visible');

    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER_WRAPPER).children().eq(0).should('be.visible');

    cy.findAllByTestId(PAGE_CONTENT_WRAPPER).should('be.visible');

    // Navigate the Website to a Collection module wrapper.
    // Select the first Card from wrapper which consist Collections Module.
    // Сlick on it to navigate to the detail page .
    cy.findAllByTestId(PAGE_COLLECTION_MODULE_WRAPPER)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .click();

    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
    //Make sure Page Content Wrapper visible
    cy.findByTestId(GUIDE_PAGE_CONTENT_WRAPPER).should('be.visible');

    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
    //Make sure Page Content Wrapper consist guide general description
    cy.findByTestId(GUIDE_PAGE_CONTENT_WRAPPER)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('be.visible');

    //Make sure Page Content Wrapper consist concrete guide descriptions
    cy.findByTestId(GUIDE_PAGE_CONTENT_WRAPPER)
      .children()
      .eq(0)
      .children()
      .eq(1)
      .should('be.visible');

    // Check if TextBoxModules wrapper are visible
    cy.get('.slider').should('be.visible');
    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER_WRAPPER).children().eq(0).should('be.visible');

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('guide_detail');
    });
  });
});
