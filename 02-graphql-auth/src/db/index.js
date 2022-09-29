import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()

const { mongoUser, mongoPassword } = process.env;

const mongoURI = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.e9xsq.mongodb.net/optum-db?retryWrites=true&w=majority`
mongoose.connect(mongoURI)
    .then(() => {
        console.log("Mongo Connected")
    }).catch(console.log)