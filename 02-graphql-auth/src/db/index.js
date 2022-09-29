import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://user123:vevVonnvHRiWkS87@cluster0.e9xsq.mongodb.net/optum-db?retryWrites=true&w=majority"
mongoose.connect(mongoURI)
    .then(() => {
        console.log("Mongo Connected")
    }).catch(console.log)