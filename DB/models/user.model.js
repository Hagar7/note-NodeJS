import bcript from "bcryptjs";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [1, "too short user name"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email must be unique value"],
      required: [true, "email is required"],
      minLength: 1,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.password = bcript.hashSync(this.password, +process.env.SALT_ROUNDS);
});

const userModel = mongoose.model.User || model("User", userSchema);
export default userModel;
