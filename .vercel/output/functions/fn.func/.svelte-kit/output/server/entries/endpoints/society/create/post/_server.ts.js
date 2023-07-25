import { C as CLOUD_NAME, A as API_KEY, a as API_SECRET } from "../../../../../chunks/private.js";
import { p as pool } from "../../../../../chunks/db.js";
import { v as verifyToken } from "../../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../../chunks/index.js";
import { v2 } from "cloudinary";
import "multer";
v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});
const POST = async ({ request, cookies }) => {
  const res = await request.formData();
  let { title, content, image, society_name } = Object.fromEntries(res);
  let imageUrl = "";
  let pro = null;
  if (image) {
    image = image.toString();
    try {
      pro = v2.uploader.upload(image);
    } catch (err) {
      console.log(err);
      throw error(500, "Error uploading image");
    }
  }
  const token = cookies.get("x-auth-token");
  const { username } = await verifyToken(token);
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    let result = await client.query(`select society_id from societies where name=$1 limit 1;`, [society_name]);
    if (result.rows.length === 0) {
      throw error(404, "Society does not exist");
    }
    let society_id = result.rows[0].society_id;
    result = await client.query(`select user_id from users where username=$1 limit 1;`, [username]);
    if (result.rows.length === 0) {
      throw error(404, "User does not exist");
    }
    const user_id = result.rows[0].user_id;
    result = await client.query(`select 1 from society_members where user_id=$1 and society_id=$2 limit 1;`, [user_id, society_id]);
    if (result.rows.length === 0) {
      throw error(403, "User is not a member of the society");
    }
    result = await client.query(`insert into posts (title,content,society_id,user_id) values ($1,$2,$3,$4) returning post_id;`, [title, content, society_id, user_id]);
    const post_id = result.rows[0].post_id;
    console.log("post_id", post_id);
    if (pro !== null) {
      await pro?.then((result2) => {
        console.log(result2);
        imageUrl = result2?.secure_url;
      });
    }
    console.log("imageusrl", imageUrl);
    if (imageUrl) {
      await client.query(`insert into post_images (post_id,image_url) values ($1,$2);`, [post_id, imageUrl]);
    }
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
  POST
};
