import { J as JWT_SECRET } from "./private.js";
import { e as error } from "./index.js";
import jwt from "jsonwebtoken";
const verifyToken = async (token) => {
  if (!token) {
    throw error(401, "Access Denied");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      throw error(401, "Invalid Token");
    }
    return decoded;
  } catch (err) {
    throw error(401, "Invalid Token");
  }
};
export {
  verifyToken as v
};
