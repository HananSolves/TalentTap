// models
import User from "../models/user.models.js";

// modules
import bcrypt from "bcrypt";

// services
import { setUser } from "../services/auth.js";

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid Email or Password" });
    }

    // Assume setUser is a function that generates a token or sets session
    const token = setUser(user._id, user.role, user.profileImage);
    res.cookie("uid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use true only in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    return res.status(200).json({ msg: "Successfully Logged In" });
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ msg: "Error: Something went wrong" });
  }
}

export default handleUserLogIn;
