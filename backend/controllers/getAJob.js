import Job from "../models/job.js";
import mongoose from "mongoose";

export async function getAJob(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res
        .status(404)
        .json({ error: `Job with ID ${id} does not exist` });
    }
    res.json(job);
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    return res.status(500).json({ error: "Failed to fetch job" });
  }
}
