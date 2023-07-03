# Creating graphql endpoint with apollo server

## Introspection
It allows to document the available queries, types, fields and directives the API schema supports.

## Resolving Queries
### Resolvers
It's a function that's responsible to populating the data for a single field in your schema.

A resolver map is an object with the relationship of Types -> Field -> Resolver.

### Schema Directives
This are decorators to out fields to indicate
- Skip: when a field should be skiped
- Include: when a field should be included
- Deprecated: to mark a field is deprecated

### Implement Datasources