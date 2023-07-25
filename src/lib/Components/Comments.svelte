<script lang="ts">
	import { comment } from 'postcss';
	import type { CommentTreeType, CommentType } from "$lib/utils/types";
	import { setContext } from "svelte";
	import Comment from "./Comment.svelte";
	import CommentTree from "./CommentTree.svelte";

    
    export let comments: CommentType[];
    let comment_parents:Map<string,CommentType[]>=new Map();
    // let comment_ids:Map<string,CommentType>=new Map();
    $:{
        comment_parents=new Map();
        comments.forEach(comment=>{
            const p=comment.parent_id||"";
            if(comment_parents.has(p)){
                comment_parents.get(p)?.push(comment);
                // comment_parents=comment_parents;
            }
            else{
                comment_parents.set(p,[comment]);
            }
            // comment_ids.set(comment.comment_id,comment);
        })
        console.log("cp",comment_parents);
    }
</script>
<div>
    <CommentTree parent_id="" {comment_parents}/>
    <!-- {#each comments as comment (comment.comment_id)}
        <Comment {comment}/>
    {/each} -->
</div>