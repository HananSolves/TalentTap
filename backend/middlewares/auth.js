// models
import Job from "../models/job.js";

// modules
import mongoose from "mongoose";

// services
import { getUser } from "../services/auth.js";

export async function loggedIn(req, res, next) {
  const token = req.cookies?.uid;

  if (!token) {
    return res.json({ msg: "Unauthorized, no token provided" });
  }

  const user = getUser(token); // Verify the token and get user info

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized, invalid token" });
  }

  req.user = user; // Attach the user information to the request object
  next(); // Proceed to the next middleware or route handler
}

export function employersOnly(req, res, next) {
  const token = req.cookies?.uid;

  if (!token) {
    return res.json({ msg: "Unauthorized, only employers can post the job" });
  }

  const user = getUser(token); // Verify the token and get user info

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized, invalid token" });
  }

  if (user.role !== "employer") {
    return res.status(403).json({ msg: "Forbidden, employers only" });
  }
  next();
}

export async function isOwner(req, res, next) {
  // Validate _id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  // Check if job exists
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ error: `Job with ID ${id} does not exist` });
  }

  const token = req.cookies?.uid;
  if (!token) {
    return res.json({
      msg: "Unauthorized, only the employer who posted the job can delete it",
    });
  }
  const user = getUser(token);
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized, invalid token" });
  }
  if (user.id !== job.postedBy.toString()) {
    return res
      .status(403)
      .json({ msg: "Forbidden, only the person who posted it can delete it." });
  }

  // Attach the job to the request object
  req.job = job;

  next();
}
