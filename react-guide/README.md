# SMB - Guide

## Quick start

```
export REACT_APP_STAGE=local
npm install
npm run start
```

# WARNING

Right now the build process only works when `"prettier/prettier": 1` is set to 1 or 0 in `.eslintrc.json`. This is because we have not yet applied all new prettier changes to all old files.

## Available Scripts

In the project directory, you can run:

### `export REACT_APP_STAGE=local`

Sets the environment to local (required, configLoader will choose configuration based on this env variable, only needed for local exec)

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# Known Issues

## Too many open files

If you encounter the following, you have to increase the limit for open files:

Error:

```
npm ERR! code EMFILE
npm ERR! syscall spawn git
npm ERR! path git
npm ERR! errno -24
npm ERR! An unknown git error occurred
npm ERR! command git --no-replace-objects clone https://gitsrv01.xailabs.dev/smb/eslint-config-smb.git .npm/_cacache/tmp/git-cloneWznM2B --recurse-submodules
```

Fix:

```
sudo prlimit --nofile=8192 --pid $$; ulimit -n 8192
```

Note: This fix did not work inside zsh shells, please use bash.
