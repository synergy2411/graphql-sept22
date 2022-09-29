const Query = {
    users: (parent, args, { db }, info) => {
        if (args.age) {
            return db.authors.filter(author => author.age > args.age)
        }
        return db.authors;
    },
    posts: (_, args, { db }) => db.posts,
    comments: (_, args, { db }) => db.comments
}

export { Query }