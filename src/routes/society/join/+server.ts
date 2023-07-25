import { pool } from '$lib/server/db';
import { verifyToken } from '$lib/utils/verifyToken.js';
import { error ,json} from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const POST:RequestHandler=async ({request,cookies})=>{
    const {name}=await request.json();
    console.log("name",name);
    let result=await pool.query(`select society_id from societies where name=$1 limit 1;`,[name]);
    // console.log("res",result.rows[0]);
    if(result.rows.length===0){
        throw error(404,'Society does not exist');
    }
    let society_id=result.rows[0].society_id;
    try{
        const token=cookies.get('x-auth-token');
        const {username}=await verifyToken(token);
        // console.log(username);
        result=await pool.query(`select user_id from users where username=$1 limit 1;`,[username]);
        const user_id=result.rows[0].user_id;
        result=await pool.query(`select 1 from society_members where user_id=$1 and society_id=$2;`,[user_id,society_id]);
        if(result.rows.length>0){
            return json({status:200})
        }
        result=await pool.query(`insert into society_members 
        (user_id,society_id,role) values($1,$2,$3);`,
        [user_id,society_id,'member']);
        await pool.query(`refresh materialized view society_members_count;`);
        return json({status:201})
    } catch(err){
        throw err;
    }
    // const {username}=await request.json();
    
    
}
