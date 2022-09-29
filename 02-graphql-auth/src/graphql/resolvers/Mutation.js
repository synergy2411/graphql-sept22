import { GraphQLYogaError } from '@graphql-yoga/node';
import { hash, compare } from 'bcrypt';

const Mutation = {
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
            return {
                token: "SUCCESS",
                username: foundUser._doc.username,
                age: foundUser._doc.age
            }
        } catch (err) {
            throw new GraphQLYogaError(err)
        }
    }
}

export { Mutation };
