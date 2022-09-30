import express from 'express';
import { createServer, createPubSub } from '@graphql-yoga/node';
import { resolvers } from './graphql/resolvers';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

import "./db";
import { UserModel } from './model/user.model';
import { BookModel } from './model/book.model';

const main = async () => {

    const PORT = process.env.PORT || 9091;

    const app = express();

    const schema = await loadSchema(join(__dirname, "/graphql/schema/schema.graphql"), {
        loaders: [new GraphQLFileLoader()]
    })

    const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

    const pubsub = createPubSub();

    const server = createServer({
        // endpoint: "/api",
        // port: 9090,
        schema: schemaWithResolvers,
        maskedErrors: false,
        context: ({ request }) => {
            const authHeader = request.headers.get("authorization")

            let token = null;
            if (authHeader) {
                token = authHeader.split(" ")[1]          // "Bearer TOKEN_VALUE"
            }

            return {
                pubsub,
                UserModel,
                BookModel,
                token
            }
        }
    })
    // server.start()
    app.use("/graphql", server)

    app.get("/", (_, res) => res.send({ message: "Graphql Yoga Server running on /graphql API" }))

    app.listen(PORT, () => console.log("Express Server running on PORT : " + PORT))
}

main().catch(console.log)


