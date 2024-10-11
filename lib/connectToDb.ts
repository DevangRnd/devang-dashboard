import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectToDb = async () => {
  if (isConnected) {
    // console.log("=> Using existing database connection");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error(
      "NEXT_PUBLIC_MONGO_URI is not defined in the environment variables"
    );
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);

    isConnected = db.connections[0].readyState === 1; // 1 indicates connected

    if (isConnected) {
      console.log("=> New database connection established");
    } else {
      throw new Error("Failed to establish database connection");
    }
  } catch (error) {
    console.error("=> Error connecting to the database:", error);
    isConnected = false; // Ensure isConnected is false if connection fails
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default connectToDb;
