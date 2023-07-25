import { p as pool } from "../../../../chunks/db.js";
import { e as error } from "../../../../chunks/index.js";
const load = async ({ params }) => {
  const name = params.name;
  let res = await pool.query("SELECT * FROM societies WHERE name=$1 limit 1;", [name]);
  if (res.rowCount === 0) {
    throw error(404, "Society not found");
  }
  const society_id = res.rows[0].society_id;
  const description = res.rows[0].description;
  const created_at = res.rows[0].created_at;
  res = await pool.query(
    `select count from society_members_count where society_id=$1 limit 1;`,
    [society_id]
  );
  let count = 0;
  if (res.rowCount > 0) {
    count = res.rows[0].count;
  }
  res = await pool.query(
    `select image_url from society_images where society_id=$1 limit 1;`,
    [society_id]
  );
  let image_url = null;
  if (res.rowCount > 0) {
    image_url = res.rows[0].image_url;
  }
  return { name, description, created_at, count, image_url };
};
export {
  load
};
