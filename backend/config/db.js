import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`mongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }

    // My code without async
    // mongoose
    //     .connect(process.env.MONGO_URI, {
    //         useUnifiedTopology: true,
    //         useNewUrlParser: true,
    //         useCreateIndex: true,
    //     })
    //     .then((res) => {
    //         console.log(`mongoDB connected: ${res.connection.host}`);
    //     })
    //     .catch((error) => {
    //         console.error(`Error: ${error.message}`);
    //         process.exit(1);
    //     });
};

export default connectDB;
