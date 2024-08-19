// Third-Party Module
import mongoose from "mongoose";

// Constant
import { DB_NAME } from "../constants.js";

export default async function connectToMongoDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `Database Connected Successfully, Host: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error("MongoDB Connection Failed!", err);
    process.exit(1);
  }
}
