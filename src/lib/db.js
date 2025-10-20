import mongoose from 'mongoose';

let isConnected = false; // Track the connection

export async function connectDB() {
  if (isConnected) {
    // Already connected
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
