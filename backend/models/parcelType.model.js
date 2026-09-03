import mongoose from "mongoose";

const ParcelTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "ParcelType title is required."],
      trim: true,
      minLength: 4,
      maxLength: 15,
    },
    description: {
      type: String,
      required: [true, "ParcelType description is required."],
      trim: true,
      minLength: 5,
      maxLength: 200,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "ParcelType price is required."],
      min: 0,
    },
  },
  {
    timeseries: true,
    toJSON: (doc, ret) => {
      delete ret.__v;
      return ret;
    },
  },
);

const ParcelType = mongoose.model("ParcelType", ParcelTypeSchema);
export default ParcelType;
