#### How to work with the smb-component-library

for local dev see README.md of the Component library.

### depoloyment

1. if you have a specific branch you want to deploy add the commit ref to package.json. For example
   `"@smb/smb-react-components-library": "git+https://gitlab.xailabs.com/smb/mui-component-library.git#6005df64490319634e5d03c0d2aa2f8b0a458bbc",` ,
2. then run `npm i --package-lock-only` it writes the changes from package.json to package-lock.json