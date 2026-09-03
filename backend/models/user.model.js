import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "UserName is required field."],
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required field."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required field."],
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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

const User = mongoose.model("User", UserSchema);
export default User;
