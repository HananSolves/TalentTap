// models
import User from "../models/user.models.js";

async function getUserInfo(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user info: ", error);
    res.status(500).json({ msg: "Error: Something Went Wrong" });
  }
}

export default getUserInfo;
