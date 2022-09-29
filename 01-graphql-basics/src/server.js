process.env.NODE_ENV = "development";
import { createServer } from '@graphql-yoga/node';
import * as db from './db/data';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';

const server = createServer({
    endpoint: "/api",
    port: 9090,
    schema: {
        typeDefs,           // contains Schema / Structure
        resolvers           // contains Behaviour
    },
    maskedErrors: false,
    context: {
        db
    }
})

server.start()