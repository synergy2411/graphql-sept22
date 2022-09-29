const Comment = {
    post: (parent, args, { db }, info) => db.posts.find(post => post.id === parent.post),
    creator: (parent, args, { db }, info) => db.authors.find(author => author.id === parent.creator)
}

export { Comment }