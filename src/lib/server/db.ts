import { DB_HOST, DB_PASSWORD, DB_USER_NAME, DBNAME } from '$env/static/private';
import pg from 'pg';
const {Pool}=pg;
export const pool=new Pool({
    host:DB_HOST,
    user:DB_USER_NAME,
    password:DB_PASSWORD,
    database:DBNAME,
    max:20,
    port:5432,
    ssl:{
        rejectUnauthorized:false,
    }
});