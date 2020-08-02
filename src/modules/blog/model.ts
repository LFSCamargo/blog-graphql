import * as mongoose from "mongoose";

export interface Blog extends mongoose.Document {
  _id: string;
  image: string;
  topic: string;
  title: string;
  description: string;
  link: string;
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
    link: {
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
