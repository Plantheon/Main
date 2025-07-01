import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = import.meta.env.VITE_MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MongoDB URI not found in environment variables");
    }
    
    await mongoose.connect(mongoUri, {
      dbName: "user"
    } as mongoose.ConnectOptions);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
} 