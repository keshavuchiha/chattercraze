import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load:PageLoad=async ({params,data,parent,fetch})=>{
    // const {description,created_at,count,image_url}=await parent();
    let is_author=false;
    let joined=false;
    let vote=0;
    let username:string|null=null;
    let votes_count=0;
    let comments_promise=null;
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
            console.log("username",data);
            votes_count=data.count;
        } else{
            throw error(res.status,res.statusText);
        }
        res=await fetch("/society/comments",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "x-auth-token":localStorage.getItem("x-auth-token")||""
            },
            body:JSON.stringify({
                post_id:params.post_id
            })
        });
        if(res.ok){
            console.log("comments ok");
            comments_promise=res.json();
            // console.log(data);
        }
        else{
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
        votes_count,
        post_image_url:data.post_image_url,
        post_id:params.post_id,
        comments_count:data.comments_count,
        comments_promise
    }
}   