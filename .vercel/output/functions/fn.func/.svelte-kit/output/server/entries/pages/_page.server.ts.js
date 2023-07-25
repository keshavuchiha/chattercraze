import { p as pool } from "../../chunks/db.js";
import { v as verifyToken } from "../../chunks/verifyToken.js";
const load = async ({ cookies }) => {
  let username = "";
  try {
    const token = cookies.get("x-auth-token");
    const res2 = await verifyToken(token);
    username = res2.username;
  } catch (e) {
    username = "";
  }
  let res = await pool.query(`select user_id from users where username=$1 limit 1;`, [username]);
  let user_id = null;
  if (res.rows.length > 0) {
    user_id = res.rows[0].user_id;
    console.log(user_id);
    res = await pool.query(
      `select p.post_id,p.title ,p."content",coalesce(pvc.count , 0) as count
            ,coalesce(pv.vote,0) as vote,
            coalesce(pcc.count,0) as comments_count,
            p.created_at as post_created_at ,
            s."name" ,s.description , u.username,u.user_id=$1 as is_author,
            si.image_url as society_image_url,
            i.image_url as post_image_url
            from posts p 
            join societies s on p.society_id  = s.society_id 
            join users u on p.user_id = u.user_id 
            left join society_images si on si.society_id  =s.society_id     
            left join post_images i on i.post_id=p.post_id
            left join post_votes_count pvc on p.post_id=pvc.post_id 
            left join post_votes pv on p.post_id =pv.post_id and pv.user_id=$1
            left join post_comments_count pcc on p.post_id=pcc.post_id order by p.created_at desc;
        `,
      [user_id]
    );
  } else {
    res = await pool.query(
      `select p.post_id,p.title ,p."content",
			coalesce(pvc.count , 0) as count,
			coalesce(pcc.count,0) as comments_count,
			u.username,	
    p.created_at as post_created_at ,s."name" ,s.description ,
    si.image_url as society_image_url,
    i.image_url as post_image_url
    from posts p 
	join users u on p.user_id = u.user_id
    join societies s on p.society_id  = s.society_id 
    left join society_images si on si.society_id  =s.society_id  
    left join post_images i on i.post_id=p.post_id
    left join post_votes_count pvc on p.post_id=pvc.post_id 
	left join post_comments_count pcc on p.post_id=pcc.post_id order by p.created_at desc;`,
      []
    );
  }
  console.log(res.rows);
  return { rows: res.rows };
};
export {
  load
};
