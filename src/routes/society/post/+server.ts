import { pool } from "$lib/server/db";
import { verifyToken } from "$lib/utils/verifyToken";
import { error, json } from "@sveltejs/kit";
interface Result{
    is_author:boolean;
    vote:number;
    username:string|null;
}
export const POST = async ({ request }) => {
    const {post_id}=await request.json();
    let username:string|null=null;
    try{
        const res=await verifyToken(request);
        username=res.username;
    } catch(err){
        username=null;
    }
    const result:Result={
        is_author:false,
        vote:0,
        username:null   
    };
    result.username=username;
    if(username===null){
        return json(result);
    }
    else{
        let res=await pool.query(`select user_id from users where username=$1 limit 1;`,[username]);
        if(res.rows.length===0){
            throw error(403,"User down not exist");
        }
        const user_id=res.rows[0].user_id;
        res=await pool.query(`select 1 from posts where post_id=$1 and user_id=$2 limit 1;`,[post_id,user_id]);
        let is_author=false;
        if(res.rows.length>0){
            result.is_author=true;
        }
        res=await pool.query(`select vote from post_votes where user_id=$1 and post_id=$2 limit 1;`,[user_id,post_id]);
        if(res.rows.length===0){
            return json(result);    
        }
        const vote=res.rows[0].vote;
        result.vote=vote;
        return json(result);
    }
    // return json({is_author:false});
}