// eslint-disable-next-line no-undef
module.exports = {
  schema: [
    {
      'http://localhost:8081/v1/graphql': {
        headers: {},
      },
    },
  ],
  overwrite: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/react-hooks',
        reactApolloVersion: 3,
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          enumValues: 'upper-case#upperCase',
          transformUnderscore: true,
        },
      },
    },
    'src/generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
