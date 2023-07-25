import { C as CLOUD_NAME, A as API_KEY, a as API_SECRET } from "../../../../chunks/private.js";
import { p as pool } from "../../../../chunks/db.js";
import { v as verifyToken } from "../../../../chunks/verifyToken.js";
import { e as error, j as json } from "../../../../chunks/index.js";
import { v2 } from "cloudinary";
v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});
const POST = async ({ request, cookies }) => {
  const token = cookies.get("x-auth-token");
  const { username } = await verifyToken(token);
  const res = await request.formData();
  let { society_name, image } = Object.fromEntries(res);
  const client = await pool.connect();
  let imageUrl = "";
  if (image) {
    image = image.toString();
    try {
      const result = await v2.uploader.upload(image);
      imageUrl = result?.secure_url;
    } catch (err) {
      console.log(err);
      throw error(500, "Error uploading image");
    }
  }
  console.log("society_name", society_name);
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
    result = await client.query(`select role from society_members where user_id=$1 and society_id=$2 limit 1;`, [user_id, society_id]);
    if (result.rows.length === 0) {
      throw error(403, "User is not a member of the society");
    }
    const role = result.rows[0].role;
    if (role != "creator") {
      throw error(403, "User is not the creator of the society");
    }
    if (imageUrl) {
      const exist = await client.query(`select 1 from society_images where society_id=$1 limit 1;`, [society_id]);
      if (exist.rows.length === 0) {
        await client.query(`insert into society_images (society_id,image_url) values ($1,$2);`, [society_id, imageUrl]);
      } else {
        await client.query(`update society_images set image_url=$1 where society_id=$2;`, [imageUrl, society_id]);
      }
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
