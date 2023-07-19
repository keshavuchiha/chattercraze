import { pool } from "$lib/server/db";
import { verifyToken } from "$lib/utils/verifyToken";
import { error,json } from "@sveltejs/kit";

export const POST=async ({request})=>{
    const {username}=await verifyToken(request);
    let {post_id,vote}=await request.json();
    vote=parseInt(vote) as number;
    if(vote!==1 && vote!==-1){
        throw error(400,"Invalid vote value");
    }
    const client=await pool.connect();
    try{
        await client.query("begin");
        let res=await client.query(`select user_id from users where username=$1 limit 1;`,[username]);
        const user_id=res.rows[0].user_id;
        res=await client.query(`select vote from post_votes where user_id=$1 and post_id=$2 limit 1;`,[user_id,post_id]);
        if(res.rows.length===0){
            await client.query(`insert into post_votes (user_id,post_id,vote) values($1,$2,$3);`,[user_id,post_id,vote]);
        }
        else{
            if(res.rows[0].vote==vote){
                await client.query(`delete from post_votes where user_id=$1 and post_id=$2;`,[user_id,post_id]);
            }
            else{
                await client.query(`update post_votes set vote=$1 where user_id=$2 and post_id=$3;`,[vote,user_id,post_id]);
            }
        }
        await client.query(`refresh materialized view post_votes_count;`);
        await client.query("commit");
    } catch(e){
        await client.query("rollback");
        throw error(500,"Internal Server Error");
    } finally{
        client.release();
    }
    return json({status:200});
}