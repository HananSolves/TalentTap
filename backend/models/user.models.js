// Third-Party Modules
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Defining User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //automatically remove any leading and trailing whitespace from a string field
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
      index: true,
      trim: true,
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
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "employee",
      trim: true,
      enum: ["employee", "employer"],
    },
    profileImage: {
      type: String,
      required: true,
      trim: true,
    },
    jobPostings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this._email,
      role: this.role,
      profile: this.profileImage,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
