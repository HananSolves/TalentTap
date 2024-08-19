import Job from "../models/job.models.js";
import User from "../models/user.models.js";

export async function postJob(req, res) {
  // Check for JSON content type (optional if using body-parser or express.json())
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
    postedBy,
  } = req.body;

  console.log(`The Employer's id is ${postedBy}`);

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
    !applicationDeadline ||
    !postedBy
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Assign a default value to postedDate if not provided
  const newPostedDate = postedDate || new Date();

  // Create a new job object
  const newJob = {
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
    postedDate: newPostedDate,
    postedBy,
  };

  try {
    // Insert the new job into the database
    const createdJob = await Job.create(newJob);

    console.log(`The created job is: ${createdJob}`);
    // Update the user's jobPostings array with the new job ID
    await User.findByIdAndUpdate(
      postedBy,
      { $push: { jobPostings: createdJob._id } },
      { new: true } // Return the updated document
    );
    // Respond with the newly created job
    res.status(201).json(createdJob);
  } catch (err) {
    console.error("Error adding to jobs collection:", err);
    return res.status(500).json({ error: "Failed to save job" });
  }

  // Respond with the newly created job
  // res.status(201).json(newJob);
}
