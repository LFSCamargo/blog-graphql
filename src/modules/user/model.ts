import * as mongoose from "mongoose";
import { ROLES } from "~/constants";

export interface User extends mongoose.Document {
  _id: string;
  name: string;
  role: "USER" | "ADMIN";
  email: string;
  password: string;
  active: boolean;
}

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: ROLES.USER,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "user",
  }
);

export default mongoose.model<User>("User", Schema);
