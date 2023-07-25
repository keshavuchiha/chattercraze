import { JWT_SECRET } from '$env/static/private';
import { pool } from '$lib/server/db.js';
import { error, json, redirect, type RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const POST:RequestHandler=async ({request,cookies})=>{
    const {username,password}=await request.json();
    let result=await pool.query(
        `SELECT username,password
        FROM public.users where username=$1 or email=$1 limit 1 ;`,[username]
    )
    if(result.rows.length<1){
        throw error(401,'Username does not exist');
    }
    const hash=result.rows[0].password;
    const match=await bcrypt.compare(password,hash);
    if(!match){
        throw error(401,'Incorrect Password');
    }
    const token=jwt.sign({"username":result.rows[0].username},JWT_SECRET,{expiresIn:'1d'});
        // console.info(token);
    // set(request.headers.cookies, 'myCookie', 'hello');
    cookies.set('x-auth-token',token,{
        path:'/',
    })
    // throw redirect(301,'/');
    return json({status:201});
}

