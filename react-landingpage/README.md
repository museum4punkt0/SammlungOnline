This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
