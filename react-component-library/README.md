# SMB react components library

## Quick start

```bash
git clone https://gitlab.xailabs.com/smb/mui-component-library.git
npm install
npm run start
```

## Introduction

This is a components library for sharing react components via GitLab. It is based in material-ui.

## Using library

In order to use the library in other projects install it as dependency.

### npm

```bash
npm i --save git+https://gitlab.xailabs.com/smb/mui-component-library.git
```

### yarn

```bash
yarn add  git+https://gitlab.xailabs.com/smb/mui-component-library.git
```

## Link lib with project

_On project_

```bash
cd node_modules/react && npm link && cd ../../
cd node_modules/react-dom && npm link && cd ../../
cd node_modules/@material-ui/core && npm link && cd ../../../
cd node_modules/@material-ui/icons && npm link && cd ../../../
cd node_modules/react-router-dom && npm link && cd ../../
```

_On library_

```bash
npm link react
npm link react-dom
npm link react-router-dom
npm link @material-ui/core
npm link @material-ui/icons
npm link
```

_On project_

```bash
npm link smb-react-components-library
```

## Unlink the library

_On project_

```bash
npm unlink smb-react-components-library
```

_On library_

```bash
npm unlink
npm unlink react
npm unlink react-dom
npm unlink react-router-dom
npm unlink @material-ui/core
npm unlink @material-ui/icons
```

_On project_

```bash
cd node_modules/react && npm unlink && cd ../../
cd node_modules/react-dom && npm unlink && cd ../../
cd node_modules/@material-ui/core && npm unlink && cd ../../../
cd node_modules/@material-ui/icons && npm unlink && cd ../../../
cd node_modules/react-router-dom && npm unlink && cd ../../
```

## Component library update problems

### TLDR

- Every time you commit a change to the component library increase the version number in the `package.json`.
- Every portal that wants to use the new component library version needs to update the `package-lock.json`.
- Confirm that the 'package-lock.json' has the right commit hash in the `smb-react-components-library` version

### The full story

In the past we had build problems with the root cause, that the `package-lock.json` was not valid or not up to date. So the `npm install` during build failed.

So what is happening? `npm install` uses the `package-lock.json` to install all dependencies and uses the exact versions that are stated there. In our case this is when we want to update the component library and use the new changes in all platforms.
But in case of our git dependency, the `package-lock.json` specifies the version using the commit hash. Just running `npm install` won't update this version.

Hence use the following command to update the component library:

```bash
npm i git+https://gitlab.xailabs.com/smb/mui-component-library.git
```

And what else could go wrong?

1. the commit hash won't update
   --> the version in the lib was probably not increased
2. npm install afterwards fails
   --> `rm package-lock.json && npm install`
3. npm install still fails
   --> `rm package-lock.json && yarn add git+https://gitlab.xailabs.com/smb/mui-component-library.git && npm install`
