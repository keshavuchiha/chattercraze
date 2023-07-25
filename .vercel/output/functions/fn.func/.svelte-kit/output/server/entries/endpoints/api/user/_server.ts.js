import { v as verifyToken } from "../../../../chunks/verifyToken.js";
import { j as json } from "../../../../chunks/index.js";
const GET = async ({ request, cookies }) => {
  const token = cookies.get("x-auth-token");
  const decoded = await verifyToken(token);
  console.log(decoded);
  const username = decoded.username;
  return json({ username }, { status: 200 });
};
export {
  GET
};
