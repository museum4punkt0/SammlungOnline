/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

const { initPlugin } = require('cypress-plugin-snapshots/plugin');

export default (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  on('task', {
    log(message) {
      message.forEach((element) => {
        console.log('\x1b[33m%s\x1b[0m', element);
      });

      return null;
    },
  });
  initPlugin(on, config);
  return config;
};
