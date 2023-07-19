import { invalidateAll } from "$app/navigation";
import { token } from "$lib/Stores/auth";

export const postVote = async (vote: number, post_id: string) => {
    let t:string|null="";
    token.subscribe((val)=>{
        t=val;
    })
    const res = await fetch(`/society/posts/vote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': t || ''
        },
        body: JSON.stringify({
            post_id,
            vote
        })
    });
    if (res.ok) {
        invalidateAll();
    } else {
        alert(await res.text());
    }
};