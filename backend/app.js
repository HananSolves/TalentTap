"use strict";

// Third-Party Modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// Custom Middlewares
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

// Route Handlers
import userRouter from "./routes/user.js";
import databaseRouter from "./routes/jobs.js";

// Database Connector
import connectToMongoDB from "./connection.js";

const app = express();

// connecting to database "TalentTap"
connectToMongoDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Route Handlers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", databaseRouter);

// NotFoundPage
app.use(notFound);

// Error-handling middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
});
