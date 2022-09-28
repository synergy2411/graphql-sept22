import { createServer } from '@graphql-yoga/node';

let authors = [
    { id: "u001", username: "john", email: "john@test", age: 32 },
    { id: "u002", username: "jenny", email: "jenny@test", age: 34 },
    { id: "u003", username: "alice", email: "alice@test", age: 35 },
]

let posts = [
    { id: "p001", title: "GraphQL for Beginners", body: "Awesome write up", published: true, author: "u001" },
    { id: "p002", title: "Mastering GraphQL", body: "Like it", published: false, author: "u003" },
    { id: "p003", title: "GraphQL Learning", body: "Love it", published: true, author: "u002" },
    { id: "p004", title: "GraphQL 101", body: "Not Bad", published: false, author: "u001" },
]

const typeDefs = `
    type Query {
        users (age : Int) : [User!]!
        posts : [Post!]!
    }
    type Post {
        id : ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    type User {
        id : ID!
        username : String!
        email: String!
        age: Int!
        posts : [Post!]!
    }
`
const resolvers = {
    Query: {
        users: (parent, args, context, info) => {
            if (args.age) {
                return authors.filter(author => author.age > args.age)
            }
            return authors;
        },
        posts: () => {
            return posts;
        }
    },
    Post: {
        author: (parent, args, context, info) => {
            return authors.find(author => author.id === parent.author)
        }
    },
    User: {
        posts: (parent, args, context, info) => {
            return posts.filter(post => post.author === parent.id)
        }
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