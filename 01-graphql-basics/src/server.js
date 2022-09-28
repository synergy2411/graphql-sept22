import { createServer } from '@graphql-yoga/node';

let authors = [
    { id: "u001", username: "john", email: "john@test", age: 32 },
    { id: "u002", username: "jenny", email: "jenny@test", age: 34 },
    { id: "u003", username: "alice", email: "alice@test", age: 35 },
]

const typeDefs = `
    type Query {
        counter : Int
        hello: String!
        salary: Float!
        userId : ID!
        isAdmin : Boolean!
        getUser: User!
        users : [User!]!
    }
    type User {
        id : ID!
        username : String!
        email: String!
        age: Int!
    }
`
const resolvers = {
    Query: {
        counter: () => 101,
        hello: () => "Hello World",
        salary: () => 1999.99,
        userId: () => 10999,
        isAdmin: () => true,
        getUser: () => {
            return { id: "u9991", username: "john doe", email: "john@test", age: 32 }
        },
        users: () => authors
    }
}

const server = createServer({
    endpoint: "/api",
    port: 9090,
    schema: {
        typeDefs,           // contains Schema / Structure
        resolvers           // contains Behaviour
    }
})

server.start()