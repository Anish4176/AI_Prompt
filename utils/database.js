import mongoose from "mongoose";
let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Mongodb is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log('Mongodb is connected Successfully');
    } catch (e) {
        console.log('there is an error in mongodb'+ e);
    }

}
