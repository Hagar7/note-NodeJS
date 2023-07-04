import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minLength: [1, "too short title"],
    },
    desc: {
      type: String,
      required: [true, "description is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = mongoose.model.Note || model("Note", noteSchema);
export default noteModel;
