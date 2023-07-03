import { ApolloServer, gql } from "apollo-server";
import { SessionAPI } from "./datasources/sessions";

const typeDefs = gql`
  type Query {
    sessions: [Session]
  }

  type Session {
    id: ID!,
    title: String!,
    description: String,
    startsAt: String,
    endsAt: String,
    room: String,
    day: String,
    format: String,
    track: String @deprecated(reason: "This will be deprecated"),
    level: String,
  }
`

const dataSources = () => ({
  sessionAPI: new SessionAPI()
});

const resolvers = {
  Query: {
    sessions: (parent, args, {dataSources}, info) => {
      var result = dataSources.sessionAPI.getSessions();
      console.log(result);
      return result;
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers, dataSources});

server
  .listen({port: process.env.PORT || 4000})
  .then(({url}) => {
    console.log(`graphql running at ${url}`);
  });