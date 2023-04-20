# SMB - Topics

Platform to show stories from storytelling tools.

# WARNING

Right now the build process only works when `"prettier/prettier": 1` is set to 1 or 0 in `.eslintrc.json`. This is because we have not yet applied all new prettier changes to all old files.

---

## Development Environment

To use a local development environment, start the appropriate containers with docker:

```
cd docker
./run-containers.sh
docker-compose up -d
docker exec -ti smb-topics npm start
```

### Conventions

#### Naming Conventions

-   UI page sections should end with `Module` - i.e. CollectionModule
-   Components should start with an uppercase char
-   JSS Code will be implemented in `.jss.ts` files and imported in components
-   JSS files should have the exact name as the component, except the leading char which has to be lowercased
-   Components should never to project config!

## Available Scripts

In the project directory, you can run:

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
