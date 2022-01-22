/**
 * Constants to test page loading against.
 * They are implemented with 'data-testid' attribute in lazyload)
 */
const dataTestIds = {
  PAGE_LOADING_SPINNER: 'page-loading-spinner-wrapper',
  PAGE_CONTENT_WRAPPER: 'page-content-wrapper',
  PAGE_FOOTER_WRAPPER: 'application-footer-wrapper',

  PAGE_IMPRINT_WRAPPER: 'page-imprint-wrapper',
  PAGE_PRIVACY_WRAPPER: 'page-privacy-wrapper',
  PAGE_ACCESSIBILITY: 'page-accessibility-wrapper',

  DEFAULT_LOADING_SPINNER: 'default-loading-spinner',
};
describe('Landingpage Portal Basic Visual Regression tests', () => {
  const {
    PAGE_LOADING_SPINNER,
    PAGE_CONTENT_WRAPPER,
    PAGE_FOOTER_WRAPPER,
    PAGE_IMPRINT_WRAPPER,
    PAGE_PRIVACY_WRAPPER,
    PAGE_ACCESSIBILITY,
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

    cy.visit('/');
    cy.findAllByTestId(PAGE_LOADING_SPINNER).should('be.visible');
    // trigger lazy loading once
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('landing_index');
    });
  });
  it('Screenshots the imprint page', () => {
    cy.task('log', [
      '*** PLEASE NOTE *****',
      'This test is tightly coupled to the API Data.',
      'The reason for this is, that we are almost always',
      'importing new API Data to the testing servers ourselves.',
      'This usually happens when we change API and Frontend implementations.',
      '',
      'If you switch the API you test against these tests will fail.',
    ]);

    cy.visit('/imprint');

    // // Make sure the imprint script visible
    cy.findAllByTestId(PAGE_IMPRINT_WRAPPER)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('be.visible');

    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER_WRAPPER).children().eq(0).should('be.visible');

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('imprint_index');
    });
  });
  it('Screenshots the accessibility page', () => {
    cy.task('log', [
      '*** PLEASE NOTE *****',
      'This test is tightly coupled to the API Data.',
      'The reason for this is, that we are almost always',
      'importing new API Data to the testing servers ourselves.',
      'This usually happens when we change API and Frontend implementations.',
      '',
      'If you switch the API you test against these tests will fail.',
    ]);

    cy.visit('/accessibility');

    // // Make sure the accessibility script visible
    cy.findAllByTestId(PAGE_ACCESSIBILITY)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('be.visible');

    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER_WRAPPER).children().eq(0).should('be.visible');

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('accessibility_index');
    });
  });
  it('Screenshots the privacy page', () => {
    cy.task('log', [
      '*** PLEASE NOTE *****',
      'This test is tightly coupled to the API Data.',
      'The reason for this is, that we are almost always',
      'importing new API Data to the testing servers ourselves.',
      'This usually happens when we change API and Frontend implementations.',
      '',
      'If you switch the API you test against these tests will fail.',
    ]);

    cy.visit('/privacy');

    // Make sure the privacy script visible
    cy.findAllByTestId(PAGE_PRIVACY_WRAPPER)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .should('be.visible');

    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER_WRAPPER).children().eq(0).should('be.visible');

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('privacy_index');
    });
  });
});
