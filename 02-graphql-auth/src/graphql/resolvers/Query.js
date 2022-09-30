import { GraphQLYogaError } from '@graphql-yoga/node';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()
const { SECRET_KEY } = process.env;

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
    books: async (_, args, { UserModel, BookModel, token }) => {
        console.log("Token : ", token);
        if (!token) {
            throw new GraphQLYogaError("Login Required")
        }
        try {
            const decode = await verify(token, SECRET_KEY)
            const allBooks = await BookModel.find({ author: decode.id });
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