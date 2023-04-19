# Eslint-config-smb

**An npm module exporting recommended eslint and prettier configs for the SMB project.**

## Installation

Eslint-config-smb can be installed by simply running:

```
npm install git+https://gitsrv01.xailabs.dev/smb/eslint-config-smb.git
```

## Project Configuration

Create a file `.eslintrc.json` in your root directory. In this file, eslint can be configured manually. In order to use the configurations of **eslint-config-smb** enter the following configuration:

```
{
  extends: "eslint-config-smb"
}
```

If you wish to furthermore customize the settings for your particular project, you can do so by adding eslint confiurations here. For example add:

```
{
  extends: "eslint-config-smb",
  ignorePatterns:[
    "src/generated/*"
  ],
}
```

If you want to ignore eslint settings for a particular directory within your project. For more settings visit the [Official Documentation of Eslint](https://eslint.org/docs/user-guide/configuring/)

## Execute Linter

To run the linter over your code, call from within your project root directory:

```
eslint '*/**/*.{js,ts,tsx}'
```

**Recommended**: Extend the npm scripts in `package.json` to contain a script which runs the linter:

```javascript
scripts: {
    build: ...,
    eject: ...,
    lint: "eslint '*/**/*.{js,ts,tsx}'",
  },
```

The linter can then be executed by running:

```
npm run lint
```

**Advanced**: Running the following command will automatically fix linting errors in your code:

```
eslint '*/**/*.{js,ts,tsx} --fix'
```

Make sure that everything works as expected with the above command before executing automatic lint fixes.

## Current prettier configuration

- "endOfLine": "auto"
- "printWidth": 90
- "semi": true
- "singleQuote": true
- "tabWidth": 2
- "trailingComma": "all"
