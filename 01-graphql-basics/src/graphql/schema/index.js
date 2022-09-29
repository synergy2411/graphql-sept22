
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
    updateUser(authorId: ID!, data: UpdateUserInput): User!
}
input UpdateUserInput {
    age: Int
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

export { typeDefs }