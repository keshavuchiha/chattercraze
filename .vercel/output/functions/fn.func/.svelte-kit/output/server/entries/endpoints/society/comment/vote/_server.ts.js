import { p as pool } from "../../../../../chunks/db.js";
import { v as verifyToken } from "../../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
const POST = async ({ request, cookies }) => {
  const token = cookies.get("x-auth-token");
  const { username } = await verifyToken(token);
  let { comment_id, vote } = await request.json();
  vote = parseInt(vote);
  if (vote !== 1 && vote !== -1) {
    throw error(400, "Invalid vote value");
  }
  const client = await pool.connect();
  try {
    await client.query("begin");
    let res = await client.query(`select user_id from users where username=$1 limit 1;`, [username]);
    const user_id = res.rows[0].user_id;
    res = await client.query(`select vote from comment_votes where user_id=$1 and comment_id=$2 limit 1;`, [user_id, comment_id]);
    if (res.rows.length === 0) {
      await client.query(`insert into comment_votes (user_id,comment_id,vote) values($1,$2,$3);`, [user_id, comment_id, vote]);
    } else {
      if (res.rows[0].vote == vote) {
        await client.query(`delete from comment_votes where user_id=$1 and comment_id=$2;`, [user_id, comment_id]);
      } else {
        await client.query(`update comment_votes set vote=$1 where user_id=$2 and comment_id=$3;`, [vote, user_id, comment_id]);
      }
    }
    await client.query(`refresh materialized view comment_votes_count;`);
    await client.query("commit");
  } catch (e) {
    await client.query("rollback");
    throw error(500, "Internal Server Error");
  } finally {
    client.release();
  }
  return json({ status: 200 });
};
export {
  POST
};
