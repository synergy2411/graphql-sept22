import { createServer, createPubSub } from '@graphql-yoga/node';
import { resolvers } from './graphql/resolvers';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

const main = async () => {
    const schema = await loadSchema(join(__dirname, "/graphql/schema/schema.graphql"), {
        loaders: [new GraphQLFileLoader()]
    })

    const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

    const pubsub = createPubSub();

    const server = createServer({
        endpoint: "/api",
        port: 9090,
        schema: schemaWithResolvers,
        maskedErrors: false,
        context: {
            pubsub
        }
    })
    server.start()
}

main().catch(console.log)


