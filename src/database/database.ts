import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDatabase = async () => {
  try {

    console.log("Connecting to:", process.env.DATABASE_URL);

    const databaseConnection = await mongoose.connect(
      process.env.DATABASE_URL ?? "",
    );

    console.log("Connected DB:", mongoose.connection.db.databaseName);


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
