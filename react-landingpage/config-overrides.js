/* config-overrides.js */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/**
 * Creates a webpack compatible list of package names and their node_modules path
 * @param packageNames an array of strings of package names
 * @returns
 */
const createAliasList = (packageNames) => {
  const newAliases = {};
  packageNames.forEach((element) => {
    newAliases[element] = path.resolve(`./node_modules/${element}`);
  });
  return newAliases;
};

/** This extends the webpack config through react-app-rewired
 * Do be able to comfortably develop the shared '@smb/smb-react-components-library'
 * we need some (temporary) way to resolve the peer dependency issues
 * This config extension adds aliases for the libraries peer dependencies that
 * target the locally installed packages in node_modules
 * It reads the package.json of the library and converts the list to an Object
 * e.g.
 * {"package-name": "absolute-path-to-the-package-in-node_modules"}
 *
 */
// eslint-disable-next-line no-undef
module.exports = function override(config, env) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJSON = require(path.resolve(
    './node_modules/@smb/smb-react-components-library/package.json',
  ));
  const peerDependencies = Object.keys(packageJSON.peerDependencies);
  if (env === 'development') {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...createAliasList(peerDependencies),
    };
  }
  return config;
};
