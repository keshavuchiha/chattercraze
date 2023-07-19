import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { user } from "$lib/Stores/auth";

export const load:PageLoad=async ({params,data,parent})=>{
    // const {description,created_at,count,image_url}=await parent();
    let is_author=false;
    let joined=false;
    let vote=0;
    let username:string|null=null;
    if(browser){

        let res=await fetch("/society/post",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "x-auth-token":localStorage.getItem("x-auth-token")||""
            },
            body:JSON.stringify({
                post_id:params.post_id
            })
        })
        if(res.ok){
            const data=await res.json();
            is_author=data.is_author;
            vote=data.vote;
            joined=data.joined;
            username=data.username;
        } else{
            throw error(res.status,res.statusText);
        }
    }   

    return {
        title:data.title,
        content:data.content,
        post_created_at:data.created_at,
        is_author,
        joined,
        vote,
        username,
        post_id:params.post_id
    }
}   