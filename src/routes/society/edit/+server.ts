import { API_KEY, API_SECRET, CLOUD_NAME } from "$env/static/private";
import { pool } from "$lib/server/db";
import { verifyToken } from "$lib/utils/verifyToken";
import { error, json } from "@sveltejs/kit";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET
})
export const POST=async ({request})=>{
    const {username}=await verifyToken(request);
    const res=await request.formData();
    let {society_name,image}=Object.fromEntries(res);
    const client=await pool.connect();
    let imageUrl="";
	let pro:Promise<UploadApiResponse>|null=null;
	if(image){
		image=image.toString();
		try{
			const result=await cloudinary.uploader.upload(image);
            imageUrl=result?.secure_url as string;
		}
		catch(err){
			console.log(err);
			throw error(500,"Error uploading image");
		}
	}
    console.log("society_name",society_name);
    try{
        await client.query(`BEGIN`);
        let result=await client.query(`select society_id from societies where name=$1 limit 1;`,[society_name]);
		if(result.rows.length===0){
			throw error(404,'Society does not exist');
		}
		let society_id=result.rows[0].society_id;
        result=await client.query(`select user_id from users where username=$1 limit 1;`,[username]);
		if(result.rows.length===0){
			throw error(404,'User does not exist');
		}
		const user_id=result.rows[0].user_id;
        result=await client.query(`select role from society_members where user_id=$1 and society_id=$2 limit 1;`,[user_id,society_id]);
        if(result.rows.length===0){
            throw error(403,'User is not a member of the society');
        }
        const role=result.rows[0].role;
        if(role!='creator'){
            throw error(403,'User is not the creator of the society');
        }
        if(imageUrl){
            const exist=await client.query(`select 1 from society_images where society_id=$1 limit 1;`,[society_id]);
            if(exist.rows.length===0){
                await client.query(`insert into society_images (society_id,image_url) values ($1,$2);`,[society_id,imageUrl]);
            }
            else{
                await client.query(`update society_images set image_url=$1 where society_id=$2;`,[imageUrl,society_id]);
            }
        }
        await client.query(`COMMIT`);
    }
    catch(err){
        await client.query(`ROLLBACK`);
        throw err;
    } finally{
        client.release();
    }
    return json({status:200});
}