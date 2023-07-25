import { p as pool } from "../../../../chunks/db.js";
import { v as verifyToken } from "../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../chunks/index.js";
const POST = async ({ request, cookies }) => {
  const { post_id } = await request.json();
  let username = null;
  try {
    const token = cookies.get("x-auth-token");
    const res = await verifyToken(token);
    username = res.username;
  } catch (err) {
    username = null;
  }
  if (username) {
    let res = await pool.query(`select user_id from users where username=$1 limit 1;`, [username]);
    if (res.rows.length === 0) {
      throw error(403, "User does not exist");
    }
    const user_id = res.rows[0].user_id;
    console.log("user_id", user_id);
    res = await pool.query(
      `select c.comment_id ,c.parent_id,
        c."content" ,
        c.created_at,u.username,image_url,
        coalesce (cvc.count,0) as votes_count,
        coalesce (cv.vote,0) as vote ,u.user_id=$2 as is_author 
        from "comments" c 
        join users u on c.user_id =u.user_id
        left join user_images ui on c.user_id =ui.user_id 
        left join comment_votes_count cvc on cvc.comment_id = c.comment_id 
        left join comment_votes cv on c.comment_id =cv.comment_id and cv.user_id=$2 where c.post_id =$1  order by c.created_at desc;`,
      [post_id, user_id]
    );
    return json(res.rows);
  } else {
    const res = await pool.query(`select c.comment_id,c.parent_id,
        "content" ,c.created_at,u.username,image_url,
        coalesce (cvc.count,0) as votes_count
        from "comments" c 
        join users u on c.user_id =u.user_id
            left join user_images ui on c.user_id =ui.user_id 
        left join comment_votes_count cvc on cvc.comment_id =c.comment_id 
        where c.post_id =$1 order by c.created_at desc;`, [post_id]);
    return json(res.rows);
  }
};
export {
  POST
};
