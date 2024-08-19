import Job from "../models/job.models.js";

export async function getJobs(req, res) {
  try {
    const jobs = await Job.find();
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
