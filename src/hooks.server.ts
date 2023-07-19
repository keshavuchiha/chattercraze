import { error } from "@sveltejs/kit";
import type { Handle } from '@sveltejs/kit';
import jwt from "jsonwebtoken";
import type { HandleFetch } from '@sveltejs/kit';
import { JWT_SECRET } from "$env/static/private";

// export const handleFetch = (async ({ event, request,fetch}) => {
//     if(event.url.pathname.startsWith("/api/user")){
//         const token=event.request.headers.get('x-auth-token');
//         console.log(token);
//         if(!token){
//             console.log("here 1");
//             throw error(401,'Access Denied');
//         }
//         try{
//             const decoded=jwt.verify(token,JWT_SECRET);
//             const body=request.body;
//             return resolve(event);
//         }
//         catch(err){
//             console.log("here 2");
//             throw error(401,'Invalid Token');
//         }
//     }
//     return resolve(event);
//     // return fetch(request);
// }) satisfies HandleFetch;

// export const GET=async ({request})=>{
//     const token=request.headers.get('x-auth-token');
//     if(!token){
//         throw error(401,'Access Denied');
//     }
//     try{
//         const decoded=jwt.verify(token,JWT_SECRET);
//         return json(decoded);
//     }
//     catch(err){
//         throw error(401,'Invalid Token');
//     }
// }