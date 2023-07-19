
import { verifyToken } from "$lib/utils/verifyToken";
import {  json } from "@sveltejs/kit";



export const GET=async ({request})=>{
    const decoded=await verifyToken(request);
    console.log(decoded);
    const username=decoded.username;
    return json({username},{status:200});
}

