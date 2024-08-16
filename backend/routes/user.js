// Third-Party Modules
import express from "express";
import multer from "multer";

// Controllers
import handleUserSignUp from "../controllers/handleUserSignUp.js";
import handleUserLogIn from "../controllers/handleUserLogIn.js";
import handleUserSignOut from "../controllers/handleUserSignOut.js";
import getUserInfo from "../controllers/getUserInfo.js";

// Custom Middlewares
import { loggedIn } from "../middlewares/auth.js";

const upload = multer({
  dest: "../public/temp",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const router = express.Router();

router.post("/signup", upload.single("profileImage"), handleUserSignUp);
router.post("/login", handleUserLogIn);
router.post("/signout", handleUserSignOut);
router.get("/", loggedIn, getUserInfo);

export default router;
