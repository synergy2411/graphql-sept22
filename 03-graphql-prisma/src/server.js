const { createServer, GraphQLYogaError } = require("@graphql-yoga/node")
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const typeDefs = `
    type Query {
        hello: String!
        users(take: Int!, skip: Int!) : [User!]!
    }
    type Mutation {
        createUser(data : CreateUserInput) : User!
        createPost(authorId:ID! data : CreatePostInput) : Post!
    }
    input CreatePostInput {
        title: String!
        published: Boolean!
    }
    input CreateUserInput {
        name: String!
        email: String!
    }
    type User {
        id:ID!
        name: String!
        email:String!
        posts : [Post!]!
    }
    type Post {
        id: ID!
        title:String!
        published: Boolean!
        author : User!
    }
`

const resolvers = {
    Mutation: {
        createUser: async (_, args) => {
            try {
                const { email, name } = args.data
                const user = await prisma.user.create({
                    data: {
                        email, name
                    }
                })
                return user;
            } catch (err) {
                throw new GraphQLYogaError(err)
            }
        },
        createPost: async (_, args) => {
            try {
                const { authorId, data } = args;
                const post = await prisma.post.create({
                    data: {
                        title: data.title,
                        published: data.published,
                        authorId: Number(authorId)
                    }
                })
                return post;
            } catch (err) {
                throw new GraphQLYogaError(err)
            }
        }
    },
    Query: {
        hello: () => "World",
        users: (_, args) => {
            try {
                const { take, skip } = args;
                const allUsers = prisma.user.findMany({
                    orderBy: {
                        name: 'desc'
                    },
                    include: {
                        posts: true
                    }
                    // where: {
                    //     NOT: [{
                    //         email: {
                    //             contains: "@test.com"
                    //         }
                    //     },
                    //     {
                    //         name: {
                    //             contains: "alice"
                    //         }
                    //     }
                    //     ]
                    // }
                })
                return allUsers;
            } catch (err) {
                throw new GraphQLYogaError(err)
            }
        }
    }
}

const server = createServer({
    schema: {
        typeDefs,
        resolvers
    }
})

server.start()