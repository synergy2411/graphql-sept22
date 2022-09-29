import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    age: {
        type: Schema.Types.Number,
        required: true
    }
})

const UserModel = model("User", userSchema)

export { UserModel }


// User -> users
// Post -> posts