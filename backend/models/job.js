import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: [String], // Array of strings
      required: true,
    },
    requirements: {
      type: [String], // Array of strings
      required: true,
    },
    benefits: {
      type: [String], // Array of strings
      required: true,
    },
    company: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    postedDate: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Custom Document Method
jobSchema.methods.getFormattedDates = function () {
  return {
    applicationDeadline: format(this.applicationDeadline, "MMMM do, yyyy"),
    postedDate: format(this.postedDate, "MMMM do, yyyy"),
  };
};

const Job = mongoose.model("Job", jobSchema);
export default Job;
