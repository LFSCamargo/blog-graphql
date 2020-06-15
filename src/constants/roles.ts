import { UserRoles } from "@types";

export default {
  USER: "USER",
  ADMIN: "ADMIN",
  WRITER: "WRITER",
} as {
  [x: string]: UserRoles;
};
