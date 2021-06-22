module.exports = {
    schema: [
        {
            'https://smb-api.xailabs.dev/v1/graphql': {
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
    },
};
