// Third-Party Modules
import mongoose from "mongoose";
import validator from "validator";

// Defining User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (name) => validator.isLength(name, { min: 4, max: 12 }),
        message: "Name must be between 4 and 12 characters long.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      immutable: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password) =>
          validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
      },
    },
    role: {
      type: String,
      required: true,
      default: "employee",
      enum: ["employee", "employer"],
    },
    profileImage: {
      type: String,
      required: true,
    },
    jobPostings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
