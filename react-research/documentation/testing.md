# Basic Testing Notes

## visual regression testing

***PLEASE NOTE** the tests are currently (30.07.2021) randomly failing on my local machine (osx 11.3.1 chrome Version 92.0.4515.107 (Official Build) (x86_64)) due to
very small pixel differences. This might not happen on a CI system at all.
The Scope of this test as of now, is only to make big automated linting efforts a
little more safe.
Also the tests are coupled to specific `data-testid` attributes (also in the smb-component-library), that are not in the master branch yet.*

WIP:(research)
Currently there is one Test in `cypress/integration/regression/base.js`
This test is loading the `/` route, makes sure every Lazy-loaded element is loaded,
takes a screenshot and compares it with the base screenshot.
Then it transitions to the first search results detail page, handley lazy-loading,
takes a screenshot and compares it with the base screenshot.

### How to take base screenshots

- Start the Dev server with `dev`-Api selected:
  `npm run start:dev`
- Update the screenshots:
  `npm run cypress:update`

### How to test against those screenshots

- Start the Dev server with `dev`-Api selected:
  `npm run start:dev`
- Test the screenshots:
  `npm run cypress:test`
