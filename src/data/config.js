import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://coderAdmin:ilINYT12yA5I19uT@coderhouse.tlstqnm.mongodb.net/?retryWrites=true&w=majority&appName=CoderHouse/ecommercecoderhouse');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
};
