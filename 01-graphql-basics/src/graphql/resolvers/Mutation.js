import { v4 } from 'uuid';
import { GraphQLYogaError } from '@graphql-yoga/node';

const Mutation = {
    updateUser: (parent, args, { db }, info) => {
        const position = db.authors.findIndex(author => author.id === args.authorId)
        if (position === -1) {
            throw new GraphQLYogaError("Unable to locate user for ID " + args.authorId)
        }
        db.authors[position].age = args.data.age;
        return db.authors[position]
    },
    createUser: (parent, args, { db }, info) => {
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
        db.authors.push(newUser);
        return newUser;
    },
    createPost: (parent, args, { db, pubsub }, info) => {
        const { data, authorId } = args
        const position = db.authors.findIndex(author => author.id === authorId)
        if (position === -1) {
            throw new GraphQLYogaError("Author NOT found for ID " + authorId)
        }
        const newPost = { ...data, published: false, author: authorId, id: v4() }
        db.posts.push(newPost);
        pubsub.publish("POST_CHANNEL", authorId, { mutationType: "CREATED", data: newPost })
        return newPost
    },
    createComment: (parent, args, { db }, info) => {
        const { postId, data } = args;
        const position = db.posts.findIndex(post => post.id === postId)
        if (position === -1) {
            throw new GraphQLYogaError("Post NOT found for ID " + postId)
        }
        const authorPosition = db.authors.findIndex(author => author.id === data.creator)
        if (authorPosition === -1) {
            throw new GraphQLYogaError("Author NOT found for ID " + data.creator)
        }
        const newComment = { ...data, id: v4(), post: postId }
        db.comments.push(newComment)
        return newComment;
    },
    deleteComment: (parent, args, { db }, info) => {
        // comments = comments.filter(comment => comment.id !== args.commentId)
        const position = db.comments.findIndex(comment => comment.id === args.commentId)
        if (position === -1) {
            throw new GraphQLYogaError("Comment Not deleted for ID " + args.commentId)
        }
        const deletedComments = db.comments.splice(position, 1)
        return deletedComments[0]
    },
    deletePost: (parent, args, { db, pubsub }, info) => {
        const position = db.posts.findIndex(post => post.id === args.postId)
        if (position === -1) {
            throw new GraphQLYogaError("Post NOT found for ID " + args.postId)
        }
        const deletedPosts = db.posts.splice(position, 1)
        db.comments = db.comments.filter(comment => comment.post !== args.postId)
        pubsub.publish("POST_CHANNEL", deletedPosts[0].author, { mutationType: "DELETED", data: deletedPosts[0] })
        return deletedPosts[0]
    },
    deleteUser: (parent, args, { db }, info) => {
        const position = db.authors.findIndex(author => author.id === args.authorId);
        if (position === -1) {
            throw new GraphQLYogaError("User NOT found for ID " + args.authorId)
        }
        const deletedUsers = db.authors.splice(position, 1)

        // Posts created by the user
        db.posts = db.posts.filter(post => {
            const isMatch = post.author === args.authorId
            if (isMatch) {
                // Comments created on Post created by the user
                db.comments = db.comments.filter(comment => comment.post !== post.id)
            }
            return !isMatch;
        })

        // Comments created by the user
        db.comments = db.comments.filter(comment => comment.creator !== args.authorId)
        return deletedUsers[0]
    }
}

export { Mutation }