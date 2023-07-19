import { API_KEY, API_SECRET, CLOUD_NAME } from '$env/static/private';
import { pool } from '$lib/server/db.js';
import { verifyToken } from '$lib/utils/verifyToken';
import { error, json } from '@sveltejs/kit';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET
})
export const POST = async ({ request }) => {
	// const {username}=verifyToken(request);
	// console.log(await request.json());
	const res=await request.formData();
	let {title,content,image,society_name}=Object.fromEntries(res);
	let imageUrl="";
	let pro:Promise<UploadApiResponse>|null=null;
	if(image){
		image=image.toString();
		try{
			pro=cloudinary.uploader.upload(image);
		}
		catch(err){
			console.log(err);
			throw error(500,"Error uploading image");
		}
	}
	const {username}=await verifyToken(request);
	const client=await pool.connect();
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
		result=await client.query(`select 1 from society_members where user_id=$1 and society_id=$2 limit 1;`,[user_id,society_id]);
		if(result.rows.length===0){
			throw error(403,'User is not a member of the society');
		}
		result=await client.query(`insert into posts (title,content,society_id,user_id) values ($1,$2,$3,$4) returning post_id;`,[title,content,society_id,user_id]);	
		const post_id=result.rows[0].post_id;
		console.log("post_id",post_id);
		if(pro!==null){

			await pro?.then(result=>{
				console.log(result);
				imageUrl=result?.secure_url as string;
			});
		}
		console.log("imageusrl",imageUrl);
		if(imageUrl){
			await client.query(`insert into images (post_id,image_url) values ($1,$2);`,[post_id,imageUrl]);
		}
		await client.query(`COMMIT`);
	} catch(err){
		await client.query(`ROLLBACK`);
		throw error(500,"Error creating post");
	}	
	finally{
		client.release();
	}
	
	// console.log("title",title,content);
	return json({status:200	});
};
