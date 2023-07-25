import { invalidate, invalidateAll } from "$app/navigation";

export const postVote = async (vote: number, post_id: string) => {
    let t:string|null="";
    const res = await fetch(`/society/post/vote`, {
        method: 'POST',
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

export const commentVote = async (vote: number, comment_id: string) => {
    let t:string|null="";
    const res = await fetch(`/society/comment/vote`, {
        method: 'POST',
        body: JSON.stringify({
            comment_id,
            vote
        })
    });
    if (res.ok) {
        invalidate(url=>true);
        // invalidateAll();
    } else {
        // invalidateAll();
        alert(await res.text());
    }
}