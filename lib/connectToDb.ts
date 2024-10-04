import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectToDb = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);

    isConnected = db.connections[0].readyState === 1; // 1 indicates connected

    if (isConnected) {
      console.log("=> New database connection established");
    } else {
      console.log("=> Failed to connect to database");
    }
  } catch (error) {
    console.error("=> Error connecting to the database", error);
  }
};

export default connectToDb;
