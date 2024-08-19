// modules
import express from "express";

// controllers
import { postJob } from "../controllers/postJob.js";
import { getJobs } from "../controllers/getJobs.js";
import { getAJob } from "../controllers/getAJob.js";
import { deleteAJob } from "../controllers/deleteAJob.js";
import { updateAJob } from "../controllers/updateAJob.js";

// middleware
import { employersOnly, isOwner } from "../middlewares/auth.middleware.js";

const router = express.Router();

// try {
//     if (!mongoose.connection.readyState) {
//       await mongoose.connect(process.env.MONGO_URL);
//     }
//     next();
//   } catch (err) {
//     console.error("MongoDB Connection Failed!", err);
//     res.status(500).send("Database connection error");
//   }

router.route("/").post(employersOnly, postJob).get(getJobs);
router
  .route("/:id")
  .get(getAJob)
  .put(isOwner, updateAJob)
  .delete(isOwner, deleteAJob);
export default router;
