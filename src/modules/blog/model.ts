import * as mongoose from "mongoose";

export interface Blog extends mongoose.Document {
  _id: string;
  image: string;
  topic: string;
  title: string;
  description: string;
  body: string;
  user: string;
  active: boolean;
}

const Schema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "blog",
  }
);

export default mongoose.model<Blog>("Blog", Schema);
