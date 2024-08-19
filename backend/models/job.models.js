import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
    responsibilities: {
      type: [String], // Array of strings
      required: true,
      trim: true,
    },
    requirements: {
      type: [String], // Array of strings
      required: true,
      trim: true,
    },
    benefits: {
      type: [String], // Array of strings
      required: true,
      trim: true,
    },
    company: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      website: {
        type: String,
        required: true,
        trim: true,
      },
      contactEmail: {
        type: String,
        required: true,
        trim: true,
      },
      contactPhone: {
        type: String,
        required: true,
        trim: true,
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

jobSchema.plugin(mongooseAggregatePaginate);

// Custom Document Method
jobSchema.methods.getFormattedDates = function () {
  return {
    applicationDeadline: format(this.applicationDeadline, "MMMM do, yyyy"),
    postedDate: format(this.postedDate, "MMMM do, yyyy"),
  };
};

const Job = mongoose.model("Job", jobSchema);
export default Job;
