import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Log a success message to the console if the connection is successful
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log an error message and exit the process if the connection fails
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with a non-zero status code to indicate an error
    }
};

export default connectDB;
