# search-indexer

Service that provides indexing objects by Elasticsearch and also providing the search webservice.

## Introduction

This project contains all the code required to index objects using Elasticsearch. 
It also provides the search webservice to fetch the indexed objects from Elasticsearch.

> Note: There is no authentication required on the endpoints since they are not exposed to the outside world.
> The search-indexer is available only inside the k8s cluster and hence needs port-forwarding to be invoked locally.

E.g. `kubectl port-forward service/smb-search-indexer 8085:8085`

### Listing of indexed objects for comparison

There is a dedicated inventory endpoint that allows for fetching all indexed objects. This is highly relevant for 
comparison of indexed objects against objects stored in Hasura and objects published for SMB Online in MDS.

The inventory endpoint allows to specify language, separator, start and end id for partial inventory.

| Parameter | Type      | Optional | Default Value   | Comment                                                                                 |
|-----------|-----------|----------|-----------------|-----------------------------------------------------------------------------------------|
| lang      | oneOf(de) | x        | de              | The language, currently only DE is supported                                            |
| startId   | number    | x        | 1               | Sorting fields, multiple separated by comma. Sort direction is specified by leading +/- |
| endId     | number    | x        | 999999999999999 | First index of requested result for paginated requests                                  |
| sep       | string    | x        | \n              | Separator to use in between object ids                                                  |

GET

```plain
   .../index/listing
   .../index/listing?startId=2347
   .../index/listing?endId=37511
   .../index/listing?startId=23472&endId=37511&sep=,
```

### Indexing an object

For indexing the `IndexController` is available. It provides 4 endpoints to create, update and delete objects 
from the index.

1. `POST /index` - Notify to reindex objects by their id
2. `PUT /index` - Pass a normalized object for (re-)indexing
3. `DELETE /index/{id}` - Remove an object from the index
4. `POST /index/force-full-reindex` - Force full reindexing of all objects available in Hasura

The POST endpoint only expects the `ids` of the objects. The normalization will be performed in the code.  
The PUT endpoint expects an already normalized object.  
The DELETE endpoint expects no payload but only the id of the target object in the url.  
The _force_ POST endpoint does not expect parameters nor payload. However, start and end id can be specified 
for partial reindexing.

Examples:

POST

```json
{
    "ids": ["122143..362234"]
}
```

```json
{
    "ids": [9, 10, 11, 12, 133, 2443, 3434, 324432]
}
```

```json
{
    "ids": [12, "2132..2245", 3434, "98234..98241", 324432]
}
```

PUT

```json
{
    "@id": "782485",
    "@initialImport": "2021-01-28T08:22:37.790821+00:00",
    "@lastSynced": "2021-01-28T08:22:37.790821+00:00",
    "attachments": true,
    "collection": "Kupferstichkabinett",
    "dateRange": {
        "gte": "1808-01-01",
        "lte": "1812-12-31"
    },
    "dating": [
        "um 1810"
    ],
    "dimensionsAndWeight": [
        "Abmessungen: 22,9 x 18,2 cm"
    ],
    "exhibit": true,
    "highlight": false,
    "id": 782485,
    "identNumber": "SZ CD.Friedrich 1",
    "involvedParties": [{
        "id": 23,
        "name": "Caspar David Friedrich",
        "dateOfBirth": "1789-04-21",
        "dateOfDeath": "1840-12-18",
        "roleId": 12,
        "formatted": "Herstellung: Caspar David Friedrich (1789-1840), Zeichner"
    }],
    "location": "Neues Museum, Ebene 0, R002",
    "longDescription": "Von den acht erhaltenen gezeichneten Selbstbildnissen Friedrichs ist dieses das berühmteste.",
    "materialAndTechnique": [{
        "id": 234,
        "specificTypeId": 213,
        "typeId": 32535,
        "details": "Graue Kreide, auf Papier",
        "formatted": "Graue Kreide, auf Papier"
    }],
    "technicalTerm": "Zeichnung",
    "titles": [
        "Selbstbildnis"
    ]
}
```

_force_ POST

```plain
   .../index/force-full-reindex?startId=23472&endId=37511
```

There is an additional REST endpoint `/triggers/index-event` exposed by `EventController` that is supposed
to be called from Hasura.
It expects an event-trigger payload with object info in the request. The implementation behind this endpoint
is similar to calling the `/index` with a single-element in the `ids` array.

Example:

POST

```json
{
    "event": {
        "data": {
            "new": {
                "id": 122143
            }
        }
    }
}
```

### Searching

For searching the `SearchController` is available. It provides 5 endpoints to fetch data from the index.

1. `GET  /search` - Run a (simple) search with query parameters
2. `POST /search` - Run an (advanced) search with filters in the payload
3. `GET  /search/suggestions` - Get autocomplete search suggestions for a search term
4. `GET  /search/{id}` - Fetch an indexed object by id
5. `GET  /search/{id}/export` - Fetch object data as download file

#### Regular Search

The regular search works with query parameters.

| Parameter  | Type                | Optional | Default Value | Comment                                                                                 |
|------------|---------------------|----------|---------------|-----------------------------------------------------------------------------------------|
| q          | string              | x        | *             | The search term                                                                         |
| sort       | string              | x        | -_score       | Sorting fields, multiple separated by comma. Sort direction is specified by leading +/- |
| offset     | number              | x        | 0             | First index of requested result for paginated requests                                  |
| limit      | number              | x        | 20            | Number af requested results for paginated requests                                      |
| projection | oneOf(flat,full,id) | x        | flat          | Defines the response data structure                                                     |
| lang       | oneOf(de)           | x        | de            | The language, currently only DE is supported                                            |

> Note: The `q` parameter also allows for extended search syntax like _?q=titles:Museum+AND+technicalTerm:(Bild+OR+Bildnis)_

> Note: offset+limit must not be greater than 50.000 which is a limit defined by Elasticsearch.

Example:

GET

```plain
   .../search?q=Muse*&sort=-titles&offset=50&limit=25
```

#### Advanced Search

The advanced search provides the same query parameters as the simple search but also allows for definition of the search filters in the payload. In this case the underlying implementation builds an advanced searchterm from the filters and joins it with the optional `q` parameter.

| Field                  | Type                   | Optional | Default Value    | Comment                                    |
|------------------------|------------------------|----------|------------------|--------------------------------------------|
| q_advanced             | complex[]              |          |                  | The advanced search filters                |
| q_advanced[n].operator | enum(AND, OR, AND_NOT) | x        | n=0 AND, else OR | Operator for filter combination            |
| q_advanced[n].field    | string                 |          |                  | Name of field on which this filter applies |
| q_advanced[n].q        | string                 |          |                  | Search term for field specific search      |

> Note: The `q` attribute also allows for extended search syntax like _Bild+OR+Bildnis_

Example:

POST

```json
{
    "q_advanced": [
        {
            "operator": "AND",
            "field": "exhibit",
            "q":"true"
        },
        {
            "operator":"AND",
            "field": "titles",
            "q":"Frau"
        },
        {
            "operator":"AND",
            "field": "dateRange",
            "q":"[1900-01-01 TO *]"
        },
        {
            "operator":"AND",
            "field": "technicalTerm",
            "q":"Bild OR Bildnis"
        }
    ]
}
```

#### Search Suggestions

Search suggestions can be retrieved for a fulltext search term or for concrete fields. If field-specific search suggestions are requested the `q` parameter must be prefixed with the requested fieldname and colon.

| Parameter | Type      | Optional | Default Value | Comment                                            |
|-----------|-----------|----------|---------------|----------------------------------------------------|
| q         | string    |          |               | The search term, possibly prefixed with field name |
| limit     | number    | x        | 15            | Number of requested suggestions                    |
| lang      | oneOf(de) | x        | de            | The language, currently only DE is supported       |

Examples:

GET

```plain
   .../search/suggestions?q=Fra
```

```plain
   .../search/suggestions?q=titles:Fra&limit=15
```

### Fetching Object Data

The fetch endpoint does not support parameters. It only expects the id of the requested object in the url.

Example:

GET

```plain
   .../search/372352
```

#### Exporting Object Data

The export endpoint allows specification of the export format. Supported formats are `json` and `csv` (default).
Note: The export projection is always `flat`.

| Parameter | Type            | Optional | Default Value | Comment                                      |
|-----------|-----------------|----------|---------------|----------------------------------------------|
| format    | oneOf(csv,json) | x        | csv           | The desired export format                    |
| lang      | oneOf(de)       | x        | de            | The language, currently only DE is supported |

Example:

GET

```plain
   .../search/372352/export?format=json
```

## Development

### Technology Stack

- Docker
- Java/Kotlin
- Spring Boot
- Jackson
- Elastic Search API
- JUnit
- Sonar

### Dependencies

- SMB Online-Sammlungen API (Hasura)
- SMB Elasticsearch

### Overall Architecture

The code is written in Java and Kotlin. There is no actual restriction on when to use which.
The general processing of a request ia a 3-level implementation:

1. Controller
2. Service
3. API

The `Controller` receives the request and does all required transformation to pass the data to a Service. In the `Service` business logic is applied. For data access and data write operations the Service uses an `API`.

To facilitate a clean code structure the processing is always unidirectional; an API never accesses a Service, a Service never accesses a Controller.

### Environment Variables

The required env-vars are defined in _application.yml_.  
> Note: There is an additional _application-test.yml_ that is applied during test execution and
> (partially) overrides what is defined in _application.yml_.

### Package Structure

The base package of the application is `de.smbonline.mdssync`.

| Package                              | Description                                                              |
|--------------------------------------|--------------------------------------------------------------------------|
| `de.smbonline.searchindexer`         | Application entry point                                                  |
| `de.smbonline.searchindexer.api`     | API implementations for Elasticsearch and (Hasura) GraphQl               |
| `de.smbonline.searchindexer.conf`    | Runtime configuration incl. configuration wrappers for _application.yml_ |
| `de.smbonline.searchindexer.dto`     | Data transfer objects                                                    |
| `de.smbonline.searchindexer.log`     | Logging utils                                                            |
| `de.smbonline.searchindexer.norm`    | Normalizer implementations                                               |
| `de.smbonline.searchindexer.rest`    | Controller implementations and utilities shared between Controllers      |
| `de.smbonline.searchindexer.service` | Service implementations                                                  |
| `de.smbonline.searchindexer.util`    | Shared utility classes and functions                                     |

### Developer Guidelines and Code Conventions

- The code is based on @NonNullApi, everything that can have a null value is flagged as @Nullable. (Java)
- All access to member attributes is qualified with `this.`. (Java)
- Method arguments are `final`. (Java)
- Every code change needs to be reflected by an increased version number in _build.gradle.kts_.
- We use fully-qualified imports for interfaces and classes.
- We use static wildcard imports for constants and methods from static-only utility classes.
- Developers run `gradlew sonar` before pushing code to Git.
