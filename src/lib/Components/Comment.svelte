<script lang="ts">
	import CommentDownvote from '$lib/assets/Comment_Downvote.svelte';
	import CommentReply from '$lib/assets/Comment_Reply.svelte';
	import CommentUpvote from '$lib/assets/Comment_Upvote.svelte';
	import { commentVote } from '$lib/utils/postVote';
	import type { CommentType } from '$lib/utils/types';
	import dayjs from 'dayjs';
	import { marked } from 'marked';
	import CommentBox from './CommentBox.svelte';
	import DeletePostIcon from '$lib/assets/Delete_Post_Icon.svelte';
	import { invalidateAll } from '$app/navigation';
    let reply=false;
	export let comment: CommentType;
</script>

<div class="">
	<span class="hover:underline">{comment.username}</span>{' '}
	<span class="text-zinc-400">{dayjs(comment.created_at).fromNow()}</span>
</div>
<div>
	{@html marked(comment.content)}
</div>
<div class="flex text-gray-400 space-x-2">
	<button
		on:click={() => commentVote(1, comment.comment_id)}
		class={(comment.vote && comment.vote === 1 && `text-emerald-600`) || ''}
	>
		<CommentUpvote className="h-6" />
	</button>
	<div class="text-black">
		{comment.votes_count}
	</div>
	<button
		class={(comment.vote && comment.vote === -1 && `text-red-600`) || ''}
		on:click={() => commentVote(-1, comment.comment_id)}
	>
		<CommentDownvote className="h-6" />
	</button>
	<button on:click={()=>{
        console.log(reply);
        reply=!reply;
    }}>
		<CommentReply className="inline h-6" />
		Reply</button
	>
	<button on:click={async()=>{
		const res=await fetch(`/society/comment`,{
			method:'DELETE',
			body:JSON.stringify({
				comment_id:comment.comment_id
			})
		})
		if(res.ok){
			invalidateAll();
		}
		else{
			console.log(await res.json());
			alert(res.statusText);
		}
	}}
	class="hover:text-red-500">
		<DeletePostIcon className="inline h-6"/>
		Delete
	</button>
</div>
{#if reply}
	<CommentBox parent_id={comment.comment_id} open={reply}/>
{/if}
