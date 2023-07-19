import { pool } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad =async ({params})=>{
    const name=params.name;
    let res=await pool.query("SELECT * FROM societies WHERE name=$1 limit 1;",[name]);
    if(res.rowCount===0){
        throw error(404,"Society not found");
    }
    const society_id=res.rows[0].society_id;
    const description:string=res.rows[0].description;
    const created_at:Date=res.rows[0].created_at;
    res=await pool.query(`select count from society_members_count where society_id=$1 limit 1;`,
    [society_id]);
    const count:number=res.rows[0].count;
    res=await pool.query(`select image_url from society_images where society_id=$1 limit 1;`,
    [society_id]);
    let image_url:null|string=null;
    if(res.rowCount>0){
        image_url=res.rows[0].image_url;
    }
    return {name,description,created_at,count,image_url};
}