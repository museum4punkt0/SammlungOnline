/**
 * Constants to test page loading against.
 * They are implemented with 'data-testid' attribute in lazyload)
 */
const dataTestIds = {
  PAGE_LOADING_SPINNER: 'page-loading-spinner',
  TOPIC_LOADING_SPINNER: 'topic-loading-spinner',
  PAGE_SLIDER_WRAPPER: 'page-image-content-wrapper',
  PAGE_OUTBOUND_LINKS_WRAPPER: 'page-outbound-links-module-wrapper',
  PAGE_TOPICS_WRAPPER: 'page-topics-wrapper',
  PAGE_FOOTER: 'application-footer',

  COLLECTION_PLAYER_MODULE_WRAPPER: 'collection-player-module-wrapper',
  COLLECTION_PLAYER_MODULE_DETAILS: 'collection-player-module-details',
  COLLECTION_PLAYER_MODULE_IMAGE_WRAPPER: 'collection-player-module-image-wrapper',
  MEDIA_PLAYER_BUTTON_WRAPPER: 'media-player-button-wrapper',
  COLLECTION_MODULE_CONTENT_WRAPPER: 'collection-module-content-wrapper',

  DEFAULT_LOADING_SPINNER: 'default-loading-spinner',
};
describe('Topics Portal Basic Visual Regression tests', () => {
  const {
    PAGE_LOADING_SPINNER,
    PAGE_SLIDER_WRAPPER,
    PAGE_OUTBOUND_LINKS_WRAPPER,
    PAGE_FOOTER,
    PAGE_TOPICS_WRAPPER,
    TOPIC_LOADING_SPINNER,
    COLLECTION_PLAYER_MODULE_WRAPPER,
    COLLECTION_PLAYER_MODULE_DETAILS,
    COLLECTION_PLAYER_MODULE_IMAGE_WRAPPER,
    MEDIA_PLAYER_BUTTON_WRAPPER,
    COLLECTION_MODULE_CONTENT_WRAPPER,
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
    // Make sure the page Spinner was there
    cy.findByTestId(PAGE_LOADING_SPINNER).should('be.visible');

    // Make sure the Slider wrapper visible
    cy.findAllByTestId(PAGE_SLIDER_WRAPPER).should('be.visible');

    // Check if Slider wrapper is visible
    cy.findAllByTestId(PAGE_SLIDER_WRAPPER).children().eq(0).should('be.visible');
    // Check if Slider's cards are visible
    cy.findAllByTestId(PAGE_SLIDER_WRAPPER).children().eq(1).should('be.visible');

    // Check if OutboundLinksModules are visible
    cy.findAllByTestId(PAGE_OUTBOUND_LINKS_WRAPPER).should('be.visible');

    // Make sure the Header visible
    cy.findByTestId(PAGE_FOOTER).should('be.visible');

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
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
      'If you switch the API you test against these tests will fail.',
    ]);
    // Go to the index Page, wait&scroll and take a picture
    cy.visit('/');
    // Make sure the page Spinner was there
    cy.findByTestId(PAGE_LOADING_SPINNER).should('be.visible');

    // Wait for a PAGE_SLIDER_WRAPPER to show up
    // then for all Image Loading Spinners to be gone
    cy.findAllByTestId(PAGE_SLIDER_WRAPPER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.findAllByTestId(PAGE_SLIDER_WRAPPER).should('be.visible');
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);

    // Navigate the Website to a Topic view cards.
    // Select the first Card from wrapper which consist Collections Module.
    // Сlick on it to navigate to the detail page .
    cy.findAllByTestId(PAGE_TOPICS_WRAPPER)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .children()
      .eq(0)
      .click();

    // Make sure the page Topic Spinner was there
    cy.findByTestId(TOPIC_LOADING_SPINNER).should('be.visible');

    // Make sure the page topic details wrapper was there
    cy.findAllByTestId(COLLECTION_PLAYER_MODULE_WRAPPER).should('be.visible');

    // Make sure the page topic details  was there
    cy.findAllByTestId(COLLECTION_PLAYER_MODULE_DETAILS).should('be.visible');

    // Make sure the image lazy loading wrapper was there
    cy.findAllByTestId(COLLECTION_PLAYER_MODULE_IMAGE_WRAPPER).should('be.visible');

    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER);
    //  Make sure the image loaded
    cy.findAllByTestId(COLLECTION_PLAYER_MODULE_IMAGE_WRAPPER)
      .children()
      .eq(0)
      .should('be.visible');

    // Make sure MediaPlayer Button should be visible
    cy.get(`[data-testid=${MEDIA_PLAYER_BUTTON_WRAPPER}] > .MuiButtonBase-root`).should(
      'be.visible',
    );

    //Make sure CollectionDiscoverModule visible
    cy.findByTestId('collection-discover-module-wrapper').children().should('be.visible');

    //Make sure button under card visible
    cy.findAllByTestId(COLLECTION_MODULE_CONTENT_WRAPPER).should('be.visible');

    // Make sure the Footer visible
    cy.findByTestId(PAGE_FOOTER).should('be.visible');


    // Scroll to top, then Repeat waiting and scrolling
    // to make sure we did not miss anything
    cy.window().scrollTo(0, 0);
    cy.waitAndScroll(PAGE_LOADING_SPINNER, DEFAULT_LOADING_SPINNER).then(() => {
      cy.matchImageSnapshot('research_detail');
    });
  });
});
