import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    numOfPages: {
        type: Schema.Types.Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const BookModel = model("Book", bookSchema)

export { BookModel }