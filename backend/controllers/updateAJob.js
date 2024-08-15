import Job from "../models/job.js";

export async function updateAJob(req, res) {
  const job = req.job;
  try {
    // Validate Content-Type
    const contentType = req.headers["content-type"];
    if (contentType !== "application/json") {
      return res.status(400).send("Submit Data in JSON Format");
    }

    // Destructure properties from req.body
    const {
      title,
      type,
      location,
      description,
      salary,
      responsibilities,
      requirements,
      benefits,
      company,
      applicationDeadline,
      postedDate,
    } = req.body;

    // Check for missing required fields
    if (
      !title ||
      !type ||
      !location ||
      !description ||
      !salary ||
      !Array.isArray(responsibilities) ||
      !Array.isArray(requirements) ||
      !Array.isArray(benefits) ||
      !company ||
      !applicationDeadline
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate company structure
    if (
      !company.name ||
      !company.description ||
      !company.contactEmail ||
      !company.website
    ) {
      return res.status(400).json({ error: "Missing required company fields" });
    }

    // Prepare updated job object
    const updatedJob = {
      title,
      type,
      location,
      description,
      salary,
      responsibilities,
      requirements,
      benefits,
      company,
      applicationDeadline,
      postedDate,
    };

    // Update the job in the database
    const result = await Job.findByIdAndUpdate(
      job._id,
      { $set: updatedJob },
      { new: true }
    );

    // Respond with the updated job
    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating jobs collection:", err);
    return res.status(500).json({ error: "Failed to update job" });
  }
}
