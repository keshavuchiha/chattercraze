import { p as pool } from "../../../../../chunks/db.js";
import { v as verifyToken } from "../../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
const POST = async ({ request, cookies }) => {
  const token = cookies.get("x-auth-token");
  const { username } = await verifyToken(token);
  let { post_id, vote } = await request.json();
  vote = parseInt(vote);
  if (vote !== 1 && vote !== -1) {
    throw error(400, "Invalid vote value");
  }
  const client = await pool.connect();
  try {
    await client.query("begin");
    let res = await client.query(`select user_id from users where username=$1 limit 1;`, [username]);
    if (res.rowCount === 0) {
      throw error(403, "User does not exist");
    }
    const user_id = res.rows[0].user_id;
    res = await client.query(` select society_id from posts where post_id=$1 limit 1;`, [post_id]);
    if (res.rowCount === 0) {
      throw error(404, "Post does not exist");
    }
    const society_id = res.rows[0].society_id;
    res = await client.query(`select role from society_members where user_id=$1 and society_id=$2 limit 1;`, [user_id, society_id]);
    if (res.rowCount === 0) {
      throw error(403, "User is not a member of the society");
    }
    res = await client.query(`select vote from post_votes where user_id=$1 and post_id=$2 limit 1;`, [user_id, post_id]);
    if (res.rows.length === 0) {
      await client.query(`insert into post_votes (user_id,post_id,vote) values($1,$2,$3);`, [user_id, post_id, vote]);
    } else {
      if (res.rows[0].vote == vote) {
        await client.query(`delete from post_votes where user_id=$1 and post_id=$2;`, [user_id, post_id]);
      } else {
        await client.query(`update post_votes set vote=$1 where user_id=$2 and post_id=$3;`, [vote, user_id, post_id]);
      }
    }
    await client.query(`refresh materialized view post_votes_count;`);
    await client.query("commit");
  } catch (e) {
    await client.query("rollback");
    throw e;
  } finally {
    client.release();
  }
  return json({ status: 200 });
};
export {
  POST
};
