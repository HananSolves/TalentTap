// modules
import express from "express";

// controllers
import { postJob } from "../controllers/postJob.js";
import { getJobs } from "../controllers/getJobs.js";
import { getAJob } from "../controllers/getAJob.js";
import { deleteAJob } from "../controllers/deleteAJob.js";
import { updateAJob } from "../controllers/updateAJob.js";

// middleware
import { employersOnly, isOwner } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(employersOnly, postJob).get(getJobs);
router
  .route("/:id")
  .get(getAJob)
  .put(isOwner, updateAJob)
  .delete(isOwner, deleteAJob);
export default router;
