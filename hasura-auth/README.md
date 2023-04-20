# hasura-auth

Authentication Service for Hasura running in webhook mode

## Introduction

This project represents an implementation of an authentication webhook for Hasura. See [Hasura Documentation](https://hasura.io/docs/1.0/graphql/core/auth/authentication/webhook.html) for specification.

### Getting started

This project depends on a GraphQL endpoint from where to fetch the schema for roles and users. The implementation is an example based on the datamodel from SMB. For a new project, changes to `UserFetch` and `UserRepository` are required.

Steps to getting started:

1. Check/adjust GraphQL _auth\_header_ and _endpoint_ in `updateApolloSchema.bat`
2. Run `updateApolloSchema.bat` (or create an *.sh equivalent and run it)
3. Check/adjust `UserFetch.qraphql`
4. Run gradle task `generateApolloSources`
5. Check/adjust `UserRepository.kt`
6. Check/adjust env-variables (see _application.yml_)
7. Run gradle task `bootRun`

## Development

### The Basic Concept

Hasura needs to be started-up in webhook mode, and the _login_ endpoint defined in `AuthController` needs to be set in the env-variable `HASURA_GRAPHQL_AUTH_HOOK`. Each request to hasura which does not contain an admin secret in the header is delegated to this endpoint for authentication. This auth-service validates the credentials passed in the request by checking validity against entries in the _user_ database table. If authentication is successful the role determined from _user\_role_ database table is returned. If no authentication info is given in the request the service returns the anonymous role as defined in _application.yml_.

Multiple alternatives of authentication are supported (by `LoginAlternatives`):

1. Bearer token authentication (`com.xailabs.microservices.hasura.auth.handler.TokenLogin`)
2. Basic authentication (`com.xailabs.microservices.hasura.auth.handler.TokenLogin`)
3. Simple username/password authentication (`com.xailabs.microservices.hasura.auth.handler.TokenLogin`)

Examples:

GET /login

```shell script
header: Authorization=Bearer DF43fer8zt45kGFreg5kghleriggrg54rgFDGJrgh56uP
```

```shell script
header: Authorization=Basic wGFpbGFic19NQjoxNkhKdTBDamNJajY=
```

```shell script
header: Authorization=username:secret
```

POST /login

```json
{
    "Authorization": "Bearer DF43fer8zt45kGFreg5kghleriggrg54rgFDGJrgh56uP"
}
```

```json
{
    "Authorization": "Basic wGFpbGFic19NQjoxNkhKdTBDamNJajY="
}
```

```json
{
    "Authorization": "username:secret"
}
```

### Technology Stack

- Docker
- Java/Kotlin
- Spring Boot
- Jackson
- Apollo GraphQl
- JUnit
- Sonar

### Dependencies

- Hasura GraphQL API (e.g. SMB Online-Sammlungen API)

### Overall Architecture

The code is partially written in Java and Kotlin. There is no actual restriction on when to use which. However, after the project was initially setup on Java basis it almost entirely moved to Kotlin syntax. Developers are encouraged to use Kotlin only.

### Environment Variables

The required env-vars are defined in _application.yml_.  
> Note: There is an additional _application-test.yml_ that is applied during test execution and (partially) overrides what is defined in _application.yml_.

### Package Structure

The base package of the application is `com.xailabs.microservices.hasura.auth`.

| Package                                         | Description                                 |
| ----------------------------------------------- | ------------------------------------------- |
| `com.xailabs.microservices.hasura.auth`         | Application entry point                     |
| `com.xailabs.microservices.hasura.auth.config`  | Configuration wrapper for _application.yml_ |
| `com.xailabs.microservices.hasura.auth.data`    | Data transfer objects                       |
| `com.xailabs.microservices.hasura.auth.handler` | Implementation of authentication handlers   |
| `com.xailabs.microservices.hasura.auth.graphql` | GraphQl client and repositories             |
| `com.xailabs.microservices.hasura.auth.rest`    | Webhook entry point invoked by Hasura       |

### Developer Guidelines and Code Conventions

- Developers are encouraged to write Kotlin code.
- Every code change needs to be reflected by an increased version number in _build.gradle.kts_.
- Developers run `gradlew sonar` before pushing code to Git.
