import { createServer } from '@graphql-yoga/node';

const server = createServer({
    endpoint: "/api",
    port: 9090
})

server.start()