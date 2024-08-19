// modules
import bcrypt from "bcrypt";
import uploadToCloudinary from "../services/cloudinary.js"; // assuming you have this function to upload images to Cloudinary

// models
import User from "../models/user.models.js";

// services
import { setUser } from "../services/auth.js";

const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dvxrop7qk/image/upload/v1723206096/avatar_gejqxo.jpg";

async function handleUserSignUp(req, res) {
  const { name, email, password, role } = req.body;
  if (!["employee", "employer"].includes(role)) {
    console.error("Invalid role:", role);
    return res.status(400).json({ msg: "Invalid Role" });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Email already exists:", email);
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.error("Password does not meet criteria");
      return res.status(400).json({
        msg: "Password must be at least 8 characters long, contain a digit, and a special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is number of salt rounds

    let profileImage = DEFAULT_AVATAR_URL;
    if (req.file) {
      // If a file is uploaded, handle the file upload
      profileImage = await uploadToCloudinary(req.file.path);
    }

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
    });

    const user = await User.findOne({ email: email });

    // Assume setUser is a function that generates a token or sets session
    const token = setUser(user._id, user.role, user.profileImage);

    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use true only in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    return res.status(201).json({ msg: "Successfully Created Your Account!" });
  } catch (error) {
    console.error("Error creating user:", error); // Improved logging

    if (error.name === "ValidationError") {
      // Extract error messages from the validation error
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ msg: errors.join(", ") });
    }

    // Handle other types of errors (e.g., database errors)
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export default handleUserSignUp;
