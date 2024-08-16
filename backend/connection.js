// Third-Party Module
import mongoose from "mongoose";

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed!", err);
  }
}
