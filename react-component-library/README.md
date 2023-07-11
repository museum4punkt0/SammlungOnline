# SMB React components library

## Quick start

```bash
git clone https://gitlab-smb.xaidev.net/smb/react-component-library-2.git
npm install
npm run start
```

## Introduction

This is a components library for sharing React components and SMB services via GitLab. It is based on material-ui.

## Using library

In order to use the library in other projects install it as dependency.

```bash
npm i --save git+https://gitlab-smb.xaidev.net/smb/react-component-library-2.git
```

### How to install in SMB platform projects

- Use node -v `v14.17.3`
- In both projects (library and platform) run `npm install`
- In the "react-component-library" run `npm link`
- In the platform project run `npm link @smb/smb-react-components-library`

Now you should be able to run `npm run start` in both projects simultaneously, with live reload working.

### Unlink the library

- In the platform project run `npm unlink @smb/smb-react-components-library`
- In the "react-component-library" run `npm unlink`

### Translations

- Must be added for each field that needs translation in `src/config/locales/<lang: de | en>/translation.ts`

## Licenes

see ./LICENCES for further licence information

