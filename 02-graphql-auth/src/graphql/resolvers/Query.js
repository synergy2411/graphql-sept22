import { GraphQLYogaError } from '@graphql-yoga/node';

const Query = {
    hello: () => "World",
    users: async (_, args, { UserModel }) => {
        try {
            const allUsers = await UserModel.find()
            return allUsers.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    age: user.age
                }
            })
        } catch (err) {
            throw new GraphQLYogaError(err)
        }
    },
    books: async (_, args, { UserModel, BookModel }) => {
        try {
            const allBooks = await BookModel.find();
            return allBooks.map(book => {
                return {
                    id: book._id,
                    title: book.title,
                    numOfPages: book.numOfPages
                }
            });
        } catch (err) {
            throw new GraphQLYogaError(err)
        }
    }
}

export { Query }