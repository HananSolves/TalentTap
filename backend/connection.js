import mongoose from "mongoose";

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed!", err);
  }
}

export default connectToMongoDB;

// (err): This is a callback function that takes one parameter, err, which stands for "error". This parameter will contain the error object if the promise is rejected.
// console.log("MongoDB Connection Failed!", err) prints two things:
// "MongoDB Connection Failed!": A custom message indicating that the connection attempt was unsuccessful.
// err: The error object that provides details about why the connection failed. This typically includes information like error codes, error messages, and possibly a stack trace, which can be helpful for debugging.
