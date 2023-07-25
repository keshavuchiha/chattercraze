import { JWT_SECRET } from '$env/static/private';
import { pool } from '$lib/server/db.js';
import { error, json, redirect, type RequestHandler} from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const checkUserName=async (username:string)=>{
    if(username.length<1){
        throw error(401,'Username too short');
    }
    else if(username.length>50){
        throw error(401,'Username too long');
    }
    let result=await pool.query(
        `SELECT 1
        FROM public.users where username=$1 limit 1 ;`,[username]
    )
    if(result.rows.length>0){
        throw error(409,'Username already exists.Please Sign In');
    }
}
const checkEmail=async (email:string)=>{
    if(email.length<1){
        throw error(401,'Username too short');
    }
    else if(email.length>50){
        throw error(401,'Username too long');
    }
    const emailRegex=/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i
    if(!emailRegex.test(email)){
        throw error(401,'Invalid Email');
    }
    let result=await pool.query(
        `SELECT 1
           FROM public.users where email=$1 limit 1;`,[email]
    )
    if(result.rows.length>0){
        throw error(409,'Email already exists.Please Sign In');
    }
}

const checkPassword=async (password:string)=>{
    const passwordRegex=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!passwordRegex.test(password)){
        throw error(401,'Invalid Password');
    }
}
export const POST:RequestHandler = async ({request,cookies}) => {
    const {username,password,email}=await request.json();
    console.info(username,password,email);
    
    await checkPassword(password);
    await checkUserName(username);
    await checkEmail(email);
    const salt=await bcrypt.genSalt(12);
    const hash=await bcrypt.hash(password,salt);
    try{
        // console.log("here");
        let result=await pool.query(`INSERT INTO public.users
        ( username, email, "password")
        VALUES($1, $2, $3) returning username;
        `,[username,email,hash]);
        // console.info("hele");
        // console.info(result.rows[0]);

        const token=jwt.sign({"username":result.rows[0].username},JWT_SECRET,{expiresIn:'1d'});
        // console.info(token);
        // cookie.set('x-auth-token',token,{});
        cookies.set('x-auth-token',token,{
            path:'/',
        });
        // throw redirect(301,'/');
        return json({status:201});
    }
    catch(err){
        throw error(500,'Internal Server Error');
    }
    // console.info(result.rows[0]);
    
    // console.info(hash);
    // error(500,'Internal Server Error');
    // return json({username,email});
    
}