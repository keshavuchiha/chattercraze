import { p as pool } from "../../../../chunks/db.js";
import { v as verifyToken } from "../../../../chunks/verifyToken.js";
import { j as json, e as error } from "../../../../chunks/index.js";
const POST = async ({ request, cookies }) => {
  const { post_id } = await request.json();
  let username = null;
  try {
    const token = cookies.get("x-auth-token");
    const res2 = await verifyToken(token);
    username = res2.username;
  } catch (err) {
    username = null;
  }
  const result = {
    is_author: false,
    vote: 0,
    username: null,
    count: 0
  };
  result.username = username;
  let res = await pool.query(`select count from post_votes_count where post_id=$1 limit 1;`, [post_id]);
  if (res.rows.length > 0) {
    result.count = res.rows[0].count;
  }
  if (username === null) {
    return json(result);
  } else {
    res = await pool.query(`select user_id from users where username=$1 limit 1;`, [username]);
    if (res.rows.length === 0) {
      throw error(403, "User down not exist");
    }
    const user_id = res.rows[0].user_id;
    console.log("post_id", post_id);
    res = await pool.query(`select 1 from posts where post_id=$1 and user_id=$2 limit 1;`, [post_id, user_id]);
    if (res.rows.length > 0) {
      result.is_author = true;
    }
    res = await pool.query(`select vote from post_votes where user_id=$1 and post_id=$2 limit 1;`, [user_id, post_id]);
    if (res.rows.length === 0) {
      return json(result);
    }
    const vote = res.rows[0].vote;
    result.vote = vote;
    return json(result);
  }
};
export {
  POST
};
