import { p as pool } from "../../../../../../chunks/db.js";
import { e as error } from "../../../../../../chunks/index.js";
const load = async ({ params }) => {
  const { post_id } = params;
  console.info("post_id", post_id);
  let post_image_url = null;
  let comments_count = 0;
  try {
    let res = await pool.query("SELECT * FROM posts WHERE post_id=($1)::uuid limit 1;", [post_id]);
    if (res.rowCount === 0) {
      console.log("post not found");
      throw error(404, "Post not found");
    }
    const title = res.rows[0].title;
    const content = res.rows[0].content;
    const created_at = res.rows[0].created_at;
    res = await pool.query(`select image_url from post_images where post_id=$1 limit 1;`, [post_id]);
    if (res.rowCount > 0) {
      post_image_url = res.rows[0].image_url;
    }
    res = await pool.query(`select count from post_comments_count where post_id=$1 limit 1;`, [post_id]);
    if (res.rowCount > 0) {
      comments_count = res.rows[0].count;
    }
    return { title, content, created_at, post_image_url, comments_count };
  } catch (err) {
    throw error(404, "Post not found");
  }
  throw error(404, "Post not found");
};
export {
  load
};
