import mongoose from 'mongoose'

async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected successfully to MongoDB server');
}

export default connectToDatabase
