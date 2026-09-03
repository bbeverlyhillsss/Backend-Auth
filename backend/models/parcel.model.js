import mongoose from "mongoose";

const ParcelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parcelTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "ParcelType",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Parcel title is required"],
      trim: true,
      minLength: 3,
      maxLength: 40,
    },
    description: {
      type: String,
      required: [true, "Parcel description is required"],
      trim: true,
      minLength: 5,
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["not delivered", "in transit", "delivered", "cancelled"],
      default: "not delivered",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Parcel = mongoose.model("Parcel", ParcelSchema);
export default Parcel;
