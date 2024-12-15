require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('MongoDB connection test starting...');

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB!');
        
        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        process.exit();
    }
}

connectToMongoDB();
console.log('Hello World');