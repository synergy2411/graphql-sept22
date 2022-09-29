import { GraphQLYogaError } from '@graphql-yoga/node';
import * as dotenv from 'dotenv';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();
const { SECRET_KEY } = process.env;

const Mutation = {
    createBook: async (_, args, { BookModel, UserModel }) => {
        try {
            const { authorId, data } = args;
            const { title, numOfPages } = data;
            const foundUser = await UserModel.findById(authorId)
            if (!foundUser) {
                throw new GraphQLYogaError("User not found")
            }
            const newBook = new BookModel({ title, numOfPages, author: mongoose.Types.ObjectId(authorId) })
            const createdBook = await newBook.save()
            return {
                id: createdBook._doc._id,
                title: createdBook._doc.title,
                numOfPages: createdBook._doc.numOfPages
            }
        } catch (err) {
            throw new GraphQLYogaError(err)
        }
    },
    createUser: async (_, args, { UserModel }) => {
        try {
            const { username, email, password, age } = args.data;
            const hashedPassword = await hash(password, 10)
            const newUser = new UserModel({ username, email, age, password: hashedPassword })
            const createdUser = await newUser.save()
            return {
                id: createdUser._doc._id,
                username: createdUser._doc.username,
                email: createdUser._doc.email,
                age: createdUser._doc.age
            }
        } catch (err) {
            console.log(err);
            throw new GraphQLYogaError(err)
        }
    },
    userLogin: async (_, args, { UserModel }) => {
        try {
            const { email, password } = args.data;
            const foundUser = await UserModel.findOne({ email })
            if (!foundUser) {
                throw new GraphQLYogaError("Unable to locate user for " + email)
            }
            const isMatch = await compare(password, foundUser._doc.password)
            if (!isMatch) {
                throw new GraphQLYogaError("Bad Credentials")
            }
            const token = sign({ id: foundUser._doc._id, email: foundUser._doc.email }, SECRET_KEY)
            return {
                token: token,
                username: foundUser._doc.username,
                age: foundUser._doc.age
            }
        } catch (err) {
            throw new GraphQLYogaError(err)
        }
    }
}

export { Mutation };
