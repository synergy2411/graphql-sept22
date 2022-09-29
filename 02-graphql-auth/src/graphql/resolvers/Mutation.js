import { GraphQLYogaError } from '@graphql-yoga/node';

const Mutation = {
    createUser: async (_, args, { UserModel }) => {
        try {
            const { username, email, password, age } = args.data;
            const newUser = new UserModel({ username, email, age, password })
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
    }
}

export { Mutation };
