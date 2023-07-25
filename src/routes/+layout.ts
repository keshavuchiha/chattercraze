import { browser } from "$app/environment";
import type {  LayoutLoad} from "./$types";

export const load:LayoutLoad=async ({fetch})=>{
    // browser
    if(browser){

        const res=await fetch(`/society`,{
            method:'POST',
        })
        console.log(res.status);
        if(res.ok){
            console.log("req success");
            const data=await res.json();
            if(data.logged_in){
                console.log(data);
                return {
                    logged_in:true,
                    creator_list:data.creator_list,
                    member_list:data.member_list,
                    other_list:data.other_list,
                }
            }
            else{
                return {
                    logged_in:false,
                    society_list:data.society_list
                }
            }
        }
        else{
            console.log(res);
            throw new Error('Error Fetching Data');
        }
    }
}