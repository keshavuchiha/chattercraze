import { D as DB_HOST, b as DB_USER_NAME, c as DB_PASSWORD, d as DBNAME } from "./private.js";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER_NAME,
  password: DB_PASSWORD,
  database: DBNAME,
  max: 20,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});
export {
  pool as p
};
