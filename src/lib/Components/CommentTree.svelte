<script lang="ts">
	import type { CommentTreeType, CommentType } from "$lib/utils/types";
	import { getContext } from "svelte";
	import Comment from "./Comment.svelte";
    export let comment_parents:Map<string,CommentType[]>;
    // const commnet_tree:Map<string, CommentType>=getContext("comment_ids");
    export let parent_id:string="";
</script>
{#if comment_parents.has(parent_id)}
    {#each comment_parents.get(parent_id) as comment (comment.comment_id)}
        <div class="m-4 ">
            <Comment comment={comment}/>
            {#if comment_parents.has(comment.comment_id)}
                <svelte:self {comment_parents} parent_id={comment.comment_id}/>
            {/if}
        </div>
    {/each}
{/if}
<!-- {#each comment_tree as comment (comment.parent)}
<div class="m-4">

    {#if commnet_ids.has(comment.parent)}
        <Comment comment={commnet_ids.get(comment.parent)}/>
    {/if}
    {#if comment.children.length>0}
        <svelte:self comment_tree={comment.children}/>
    {/if}
</div> -->
    <!-- <Comment comment={commnet_ids.get(comment.parent)}/> -->
<!-- {/each} -->




