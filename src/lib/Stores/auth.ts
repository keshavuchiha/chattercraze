import { writable } from "svelte/store";
import { browser } from "$app/environment"
export interface Auth {
    isLoggedIn: boolean;
    type: "log in" | "register";
    open: boolean;
}
interface User {
    username: string;
    email: string;
}
const auth = writable<Auth>({
    isLoggedIn: false,
    type:"log in",
    open:false,
});
// const token = writable<string|null>(null);
const user = writable<User|null>(null);
if (browser && localStorage.getItem("x-auth-token")) {
    const temp=localStorage.getItem("x-auth-token");
    if(temp){
        const res=await fetch("/api/user",{
            headers:{
                "x-auth-token":temp
            }
        });
        if(res.ok){
            const data=await res.json();
            // console.log(data); 
            // token.set(temp);
            user.set(data);
            auth.update((val)=>{
                return {...val,isLoggedIn:true};
            })
        }
    }
    // token.set(localStorage.getItem("x-auth-token"));
}

export {auth,user};


