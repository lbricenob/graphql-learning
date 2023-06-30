# Learning GraphQL
Repo for keeping graphql annotations and examples

# What is GraphQL?
It's a query language for APIs. 

Example of a query:
```json
{
  allPokemon(generation:1,first:3) {
    pokemon {
      name
      type
    }
  }
}
```
Result:
```json
{
  "data": {
    "allPokemon": {
      "pokemon": [
        {
          "name": "bulbasaur",
          "type": "grass"
        },
        {
          "name": "ivysaur",
          "type": "grass"
        },
        {
          "name": "venusaur",
          "type": "grass"
        }
      ]
    }
  }
}
```

## Advantages

- Client using the API can specify what info it needs
- The call is kept in only one request
- It is language agnostic
- Declarative Data Fetching: There is a lot less roundtrips for getting specific information
- Strongly Typed: all the fields in a schema has a defined type

## vs REST
- REST needs more queries to collect information from multiple resources
- REST endpoints may provide too much or too little information
- If caching is needed, it cannot use HTTP spec (as REST does)


## Types
Base Types:
- Int
- Float
- String
- Boolean
- ID Unique identifier

Enumeration Types:
- Scalar types that accept just a set of values
  
  ```json
  enum pokemonType {
    FIRE
    WATER
    GRASS
  }
  ```
Query and Mutation Types:
- Query: what the client asks for
- Mutation: whether we are going to add or delete something in the resource

Non-nullable Type (!):
```json
type Pokemon {
  id: ID!,
  name: String!,
  attributes: [Attributes!]
}
```

## Queries
Composed by:
- Fields: selected properties of the schema to return
- Arguments: parameters passed to schema fields to further filter info if allowed
- Alias: lets you rename fields specified in the query to prevent conflict (syntax: alias: fieldName)
- Fragments: lest you define reusable fields structure to use across the query
- Operation Name: name of the query
- Variables: added to the query to create a function parameter

```json
query viewerInfo ($isOwned: Boolean!) { // viewerInfo: OperationName, $isOwned: variable
  viewer { 
    login // fields
    bio
    id
    name
    starredRepositories (ownedByViewer: $isOwned) { // ownedByViewer: argument
      nodes {
        id
        name
      }
    }
    firstFollowers: followers (first: 3) { // firstFollowers: alias
      nodes {
        ...userInfo
      }
    }
    lastFollowers: followers (last: 1) {
      nodes {
        ...userInfo
      }
    }
  }
}

fragment userInfo on User { // userInfo: fragment 
  id
  bio
  bioHTML
  name
}
```

## Mutations
Modifying the data (create, update, delete)

```json
mutation newStatus($input: ChangeUserStatusInput!) {
  changeUserStatus(input: $input) {
    clientMutationId
    status {
      message
    }
  }
}

query viewerInfo { 
  viewer { 
    login
    bio
    id
    name
    status {
      id
      message
    }
  }
}
```

## GraphQL Client / Server
GraphQL Client buids the query to the server

GraphQL Server:
- Parses query from the client
- Validating schema
- Returs JSON response
- Executes resolvers for each field
- Apollo Server, Express GraphQL