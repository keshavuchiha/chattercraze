import { DB_PASSWORD, DB_USER_NAME, DBNAME } from '$env/static/private';
import {Pool} from 'pg';

export const pool=new Pool({
    host:'localhost',
    user:DB_USER_NAME,
    password:DB_PASSWORD,
    database:DBNAME,
    max:20,
    port:5432
});