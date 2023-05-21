import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Job Position is required"],
      maxlength: 100,
    },
    company: {
      type: String,
      requied: [true, "Companay name is require"],
    },
    workLocation: {
      type: String,
      required: [true, "Work location is required"],
    },
    salary: {
      type: String,
      requied: [true, "Salary is Required"],
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contaract"],
    },
    shift: {
      type: String,
      enum: ["Morning shift", "Monday to Friday", "Day shift", "Night Shift"],
    },
    description: {
      type: String,
      requied: [true, "Description is require"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
