import "../../../../chunks/db.js";
import { j as json } from "../../../../chunks/index.js";
import "bcrypt";
import "jsonwebtoken";
const POST = async ({ request, cookies }) => {
  cookies.delete("x-auth-token", {
    path: "/"
  });
  return json({ status: 201 });
};
export {
  POST
};
