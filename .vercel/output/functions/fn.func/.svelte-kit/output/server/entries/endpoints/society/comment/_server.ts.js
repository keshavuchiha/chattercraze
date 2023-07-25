import { p as pool } from "../../../../chunks/db.js";
import { v as verifyToken } from "../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../chunks/index.js";
let POST = async ({ request, cookies }) => {
  const token = cookies.get("x-auth-token");
  const { username } = await verifyToken(token);
  const { post_id, text, parent_id, society_name } = await request.json();
  const client = await pool.connect();
  console.log("society_name", society_name);
  try {
    await client.query(`BEGIN`);
    let res = await client.query(`select user_id from users where username=$1 limit 1;`, [username]);
    if (res.rows.length === 0) {
      throw error(403, "User does not exist");
    }
    const user_id = res.rows[0].user_id;
    res = await client.query(`select society_id from societies where name=$1 limit 1;`, [society_name]);
    if (res.rows.length === 0) {
      throw error(404, "Society does not exist");
    }
    const society_id = res.rows[0].society_id;
    res = await client.query(`select 1 from society_members where user_id=$1 and society_id=$2;`, [user_id, society_id]);
    if (res.rows.length === 0) {
      throw error(403, "User is not a member of the society");
    }
    res = await client.query(`select 1 from posts where post_id=$1 limit 1;`, [post_id]);
    if (res.rows.length === 0) {
      throw error(404, "Post does not exist");
    }
    if (parent_id) {
      res = await client.query(`select 1 from comments where comment_id=$1 limit 1;`, [parent_id]);
      if (res.rows.length === 0) {
        throw error(404, "Parent comment does not exist");
      }
      await client.query(`insert into comments (post_id,user_id,content,parent_id)
                values ($1,$2,$3,$4);`, [post_id, user_id, text, parent_id]);
    } else {
      await client.query(`insert into comments (post_id,user_id,content)
                values ($1,$2,$3);`, [post_id, user_id, text]);
    }
    await client.query(`refresh materialized view post_comments_count ;`);
    await client.query(`COMMIT`);
  } catch (err) {
    await client.query(`ROLLBACK`);
    throw err;
  } finally {
    client.release();
  }
  return json({ status: 201 });
};
let DELETE = async ({ request, cookies }) => {
  const token = cookies.get("x-auth-token");
  const { username } = await verifyToken(token);
  const { comment_id } = await request.json();
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    let res = await client.query(`select user_id from users where username=$1 limit 1;`, [username]);
    if (res.rows.length === 0) {
      throw error(403, "User does not exist");
    }
    const user_id = res.rows[0].user_id;
    res = await client.query(`select 1 from comments where comment_id=$1 limit 1;`, [comment_id]);
    if (res.rows.length === 0) {
      throw error(404, "Comment does not exist");
    }
    res = await client.query(`select 1 from comments where comment_id=$1 and user_id=$2 limit 1;`, [comment_id, user_id]);
    if (res.rows.length === 0) {
      throw error(403, "User is not the owner of the comment");
    }
    await client.query(`delete from comments where comment_id=$1;`, [comment_id]);
    await client.query(`refresh materialized view post_comments_count ;`);
    await client.query(`COMMIT`);
  } catch (err) {
    await client.query(`ROLLBACK`);
    throw err;
  } finally {
    client.release();
  }
  return json({ status: 200 });
};
export {
  DELETE,
  POST
};
