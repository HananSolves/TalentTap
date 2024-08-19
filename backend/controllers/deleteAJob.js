// models
import Job from "../models/job.models.js";
import User from "../models/user.models.js";

export async function deleteAJob(req, res) {
  try {
    const job = req.job;
    await Job.findByIdAndDelete(job._id);

    // Remove the job ID from the user's jobPostings array
    await User.findByIdAndUpdate(job.postedBy, {
      $pull: { jobPostings: job._id },
    });

    return res.status(200).json({ msg: "Successfully deleted the job" });
  } catch (error) {
    console.error("Failed to delete the job:", error);
    return res.status(500).json({ error: "Failed to delete the job" });
  }
}
