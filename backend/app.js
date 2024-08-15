"use strict"; // to write “secure” JavaScript, It catches common coding errors

// modules
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// routes
import userRouter from "./routes/user.js";
import databaseRouter from "./routes/jobs.js";

import connectToMongoDB from "./connection.js";

// middlewares
// import { employersOnly } from "./middlewares/auth.js";

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined
const __dirpath = path.resolve();
const notFoundPage = path.join(__dirpath, "backend", "NotFound.html");

// connecting to database "TalentTap"
connectToMongoDB();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000", // or your front-end domain
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.use("/user", userRouter);
app.use("/jobs", databaseRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(notFoundPage);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
});
