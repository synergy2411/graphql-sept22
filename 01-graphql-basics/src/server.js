process.env.NODE_ENV = "development";
import { createServer, GraphQLYogaError } from '@graphql-yoga/node';
import { v4 } from 'uuid';

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

let comments = [
    { id: "c001", text: "Awesome comment", post: "p001", creator: "u002" },
    { id: "c002", text: "Liked it", post: "p003", creator: "u003" },
    { id: "c003", text: "Nice Post", post: "p003", creator: "u001" },
    { id: "c004", text: "Not Bad Post", post: "p001", creator: "u002" },
]

const typeDefs = `
    type Query {
        users (age : Int) : [User!]!
        posts : [Post!]!
        comments : [Comment!]!
    }
    type Mutation {
        createUser(data : CreateUserInput) : User!
        createPost(authorId : ID!, data: CreatePostInput) : Post!
        createComment(postId: ID!, data : CreateCommentInput) : Comment!
        deleteComment(commentId : ID!) : Comment!
        deletePost(postId : ID!) : Post!
        deleteUser(authorId: ID!) : User!
    }
    input CreateCommentInput {
        text: String!
        creator: String!
    }
    input CreatePostInput {
        title : String!
        body: String!
    }
    input CreateUserInput {
        username : String!
        email :String!
        age: Int!
    }
    type Post {
        id : ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments : [Comment!]!
    }
    type User {
        id : ID!
        username : String!
        email: String!
        age: Int!
        posts : [Post!]!
        comments : [Comment!]!
    }
    type Comment {
        id : ID!
        text : String!
        post : Post!
        creator: User!
    }
`
const resolvers = {
    Mutation: {
        createUser: (parent, args, context, info) => {
            const { username, email, age } = args.data;
            if (username === '') {
                throw new GraphQLYogaError("Username is mandatory field")
            }
            if (email === '') {
                throw new GraphQLYogaError("Email is mandatory field")
            }
            if (age === '') {
                throw new GraphQLYogaError("Age is mandatory field")
            }
            const newUser = { ...args.data, id: v4() }
            authors.push(newUser);
            return newUser;
        },
        createPost: (parent, args, context, info) => {
            const { data, authorId } = args
            const position = authors.findIndex(author => author.id === authorId)
            if (position === -1) {
                throw new GraphQLYogaError("Author NOT found for ID " + authorId)
            }
            const newPost = { ...data, published: false, author: authorId, id: v4() }
            posts.push(newPost);
            return newPost
        },
        createComment: (parent, args, context, info) => {
            const { postId, data } = args;
            const position = posts.findIndex(post => post.id === postId)
            if (position === -1) {
                throw new GraphQLYogaError("Post NOT found for ID " + postId)
            }
            const authorPosition = authors.findIndex(author => author.id === data.creator)
            if (authorPosition === -1) {
                throw new GraphQLYogaError("Author NOT found for ID " + data.creator)
            }
            const newComment = { ...data, id: v4(), post: postId }
            comments.push(newComment)
            return newComment;
        },
        deleteComment: (parent, args, context, info) => {
            // comments = comments.filter(comment => comment.id !== args.commentId)
            const position = comments.findIndex(comment => comment.id === args.commentId)
            if (position === -1) {
                throw new GraphQLYogaError("Comment Not deleted for ID " + args.commentId)
            }
            const deletedComments = comments.splice(position, 1)
            return deletedComments[0]
        },
        deletePost: (parent, args, context, info) => {
            const position = posts.findIndex(post => post.id === args.postId)
            if (position === -1) {
                throw new GraphQLYogaError("Post NOT found for ID " + args.postId)
            }
            const deletedPosts = posts.splice(position, 1)
            comments = comments.filter(comment => comment.post !== args.postId)
            return deletedPosts[0]
        }
    },
    Query: {
        users: (parent, args, context, info) => {
            if (args.age) {
                return authors.filter(author => author.age > args.age)
            }
            return authors;
        },
        posts: () => posts,
        comments: () => comments
    },
    Post: {
        author: (parent, args, context, info) => authors.find(author => author.id === parent.author),
        comments: (parent, args, context, info) => comments.filter(comment => comment.post === parent.id)
    },
    User: {
        posts: (parent, args, context, info) => posts.filter(post => post.author === parent.id),
        comments: (parent, args, context, info) => comments.filter(comment => comment.creator === parent.id)
    },
    Comment: {
        post: (parent, args, context, info) => posts.find(post => post.id === parent.post),
        creator: (parent, args, context, info) => authors.find(author => author.id === parent.creator)
    }
}

const server = createServer({
    endpoint: "/api",
    port: 9090,
    schema: {
        typeDefs,           // contains Schema / Structure
        resolvers           // contains Behaviour
    },
    maskedErrors: false
})

server.start()