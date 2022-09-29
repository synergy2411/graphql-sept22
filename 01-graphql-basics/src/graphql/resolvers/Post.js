const Post = {
    author: (parent, args, { db }, info) => db.authors.find(author => author.id === parent.author),
    comments: (parent, args, { db }, info) => db.comments.filter(comment => comment.post === parent.id)
}

export { Post }