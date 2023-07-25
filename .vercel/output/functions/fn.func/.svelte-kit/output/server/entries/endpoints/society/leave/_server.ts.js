import { p as pool } from "../../../../chunks/db.js";
import { v as verifyToken } from "../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../chunks/index.js";
const POST = async ({ request, cookies }) => {
  const { name } = await request.json();
  console.log("name", name);
  let result = await pool.query(`select society_id from societies where name=$1 limit 1;`, [name]);
  if (result.rows.length === 0) {
    throw error(404, "Society does not exist");
  }
  let society_id = result.rows[0].society_id;
  try {
    const token = cookies.get("x-auth-token");
    const { username } = await verifyToken(token);
    result = await pool.query(`select user_id from users where username=$1 limit 1;`, [username]);
    const user_id = result.rows[0].user_id;
    result = await pool.query(`delete from society_members where user_id=$1 and society_id=$2;`, [user_id, society_id]);
    await pool.query(`refresh materialized view society_members_count;`);
  } catch (err) {
    throw err;
  }
  return json({ status: 200 });
};
export {
  POST
};
