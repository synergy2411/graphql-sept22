const Subscription = {
    post: {
        subscribe: (parent, args, { db, pubsub }, info) => {
            return pubsub.subscribe("POST_CHANNEL", args.authorId)             // asyncIterator
        },
        resolve: payload => {
            console.log("PAYLOAD : ", payload);
            return payload
        }
    }
}

export { Subscription }