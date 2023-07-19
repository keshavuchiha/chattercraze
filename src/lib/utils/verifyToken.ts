import { JWT_SECRET } from "$env/static/private";
import { error } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

interface Decoded extends jwt.JwtPayload {
    username:string;
}

export const verifyToken=async (request:Request)=>{
    const token=request.headers.get('x-auth-token');
    if(!token){
        throw error(401,'Access Denied');
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        if(typeof decoded==='string'){
            throw error(401,'Invalid Token');
        }
        return decoded as Decoded;
    } catch(err){
        throw error(401,'Invalid Token');
    }
}