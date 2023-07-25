import { J as JWT_SECRET } from "../../../../chunks/private.js";
import { p as pool } from "../../../../chunks/db.js";
import { e as error, j as json } from "../../../../chunks/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const POST = async ({ request, cookies }) => {
  const { username, password } = await request.json();
  let result = await pool.query(
    `SELECT username,password
        FROM public.users where username=$1 or email=$1 limit 1 ;`,
    [username]
  );
  if (result.rows.length < 1) {
    throw error(401, "Username does not exist");
  }
  const hash = result.rows[0].password;
  const match = await bcrypt.compare(password, hash);
  if (!match) {
    throw error(401, "Incorrect Password");
  }
  const token = jwt.sign({ "username": result.rows[0].username }, JWT_SECRET, { expiresIn: "1d" });
  cookies.set("x-auth-token", token, {
    path: "/"
  });
  return json({ status: 201 });
};
export {
  POST
};
