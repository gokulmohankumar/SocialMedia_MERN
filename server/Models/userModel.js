import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 18,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    default: "",
  },
  from: {
    type: String,
    default: "not Added yet",
  },
  city: {
    type: String,
    default: "not added yet",
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
    default: 1,
  },
  followers:
  {
    type:Array,
    default:[]
  },
  followings:
  {
     type:Array,
     default:[]
  }
});

export default mongoose.model("User", userSchema);
