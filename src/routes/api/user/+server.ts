
import { verifyToken } from "$lib/utils/verifyToken";
import {  json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";



export const GET:RequestHandler=async ({request,cookies})=>{
    const token=cookies.get('x-auth-token');
    const decoded=await verifyToken(token);
    console.log(decoded);
    const username=decoded.username;
    return json({username},{status:200});
}

