import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDatabase = async () => {
  try {
    const databaseConnection = await mongoose.connect(
      process.env.MONGODB_URL ?? "",
    );

    if (databaseConnection) {
      console.log("database connected successfully");
    } else {
      console.log("Error in database connection");
    }
  } catch (error) {
    console.log("Failed to connect with database", error);
  }
};

export default connectDatabase;
