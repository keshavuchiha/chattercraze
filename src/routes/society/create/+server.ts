import { pool } from "$lib/server/db.js";
import { verifyToken } from "$lib/utils/verifyToken";
import { error, json } from "@sveltejs/kit";


export const POST=async ({request})=>{
    const {name,privacy}=await request.json();
    if(!name || !privacy){
        throw error(401,'Invalid Request');
    }
    const decoded=await verifyToken(request);
    const {username}=decoded;
    const nameRegex=/[a-zA-Z0-9]+/
    if(!nameRegex.test(name) || name.length>25){
        throw error(401,'Invalid Name');
    }
    // console.log(privacy);
    if(privacy==='public' || privacy==='private' || privacy==='restricted'){
        
    }
    else{
        throw error(401,'Invalid Privacy');
    }
    const client=await pool.connect();
    try{
        await client.query('BEGIN');
        let result=await client.query(`SELECT society_id
        FROM public.societies where name=$1;
        `,[name]);
    
        if(result.rows.length>0){
            console.log("Society already exists");
            throw error(409,'Society already exists');
        }
        result=await client.query(`SELECT user_id
        FROM public.users where username=$1;
        `,[username]);
        const user_id=result.rows[0].user_id;
        
        result=await client.query(`INSERT INTO public.societies
        ("name", privacy)
        VALUES($1, $2) returning society_id;
        `,[name,privacy]);
        
        const society_id=result.rows[0].society_id;
        result=await client.query(`INSERT INTO public.society_members
        (user_id, society_id, "role")
        VALUES($1, $2,'creator');
        `,[user_id,society_id,]);
        await client.query('COMMIT');
        return json({status:201}); 
    }
    catch(err){
        await client.query('ROLLBACK');
        // console.log(err);
        throw err;
        // throw new Error(err);
        // throw error(500,'Internal Server Error 1');
    }
    finally{
        client.release();
    }
}

