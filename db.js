import mongoose from 'mongoose';

export default () => {
    mongoose.connect("mongodb+srv://bhavesharya07:ctLHyXD4Ff1O91Hu@cluster0.qrqbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("MongoDB connection established");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB", err);
        });
};
