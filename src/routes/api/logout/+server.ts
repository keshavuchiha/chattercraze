import { JWT_SECRET } from '$env/static/private';
import { pool } from '$lib/server/db.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const POST:RequestHandler=async ({request,cookies})=>{
    cookies.delete('x-auth-token',{
        path:'/',
    });
    return json({status:201});
}

