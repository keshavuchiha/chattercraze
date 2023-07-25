<script lang="ts">
	import DownVoteIcon from '$lib/assets/DownVote_Icon.svelte';
	import UpvoteIcon from '$lib/assets/Upvote_Icon.svelte';
	import { postVote } from '$lib/utils/postVote';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import CommentsIcon from '$lib/assets/Comments_Icon.svelte';
	import ShareIcon from '$lib/assets/Share_Icon.svelte';
	import { goto } from '$app/navigation';
	import DeletePostIcon from '$lib/assets/Delete_Post_Icon.svelte';
	import SaveIcon from '$lib/assets/Save_Icon.svelte';
	import relatimeTime from 'dayjs/plugin/relativeTime';
	import AboutCommunity from '$lib/Components/AboutCommunity.svelte';
	import CommentBox from '$lib/Components/CommentBox.svelte';
	import Comments from '$lib/Components/Comments.svelte';
	export let data: PageData;
	dayjs.extend(relatimeTime);
</script>

<div class="flex mx-4 my-2">
	<div class="flex flex-col flex-grow">
		<div class="flex space-x-2 flex-grow border-2 rounded-2xl shadow-lg">
			<div
				class=" w-[48px] bg-gray-100 rounded-s-xl text-center text-zinc-500 justify-center align-middle"
			>
				<button on:click={() => postVote(1, data.post_id || '')}
					><UpvoteIcon className={`h-7 mx-auto ${data.vote == 1 && 'text-emerald-500'}`} /></button
				>
				<div>{data.votes_count}</div>
				<button on:click={() => postVote(-1, data.post_id || '')}>
					<DownVoteIcon className={`h-7 mx-auto ${data.vote == -1 && 'text-red-400'}`} />
				</button>
			</div>
			<div class=" ">
				<div class="text-zinc-400">
					Post by <span class="hover:underline">{data.username}</span>{' '}<span
						>{dayjs(data.post_created_at).fromNow()}</span
					>
				</div>
					<div class="font-semibold text-md">
					{data.title}
				</div>
				<div>
					{#if data.content}
						<!-- {marked(data.content)} -->
						{@html marked(data.content)}
					{/if}
				</div>
				<div>
					{#if data.post_image_url}
						<img src={data.post_image_url} alt="" class=" h-64" />
					{/if}
				</div>
				<div class="flex space-x-3 text-zinc-400">
					<div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
						<CommentsIcon className="inline h-5 " />
						<span>{data.comments_count} Comments</span>
					</div>
					<div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
						<ShareIcon className="inline h-5 " />
						<span>Share</span>
					</div>
					<div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
						<SaveIcon className="inline h-5 " />
						<span>Save</span>
					</div>
					{#if data.is_author}
						<button
							on:click={async () => {
								const res = await fetch('/society/posts', {
									method: 'DELETE',
									body: JSON.stringify({
										post_id: data.post_id
									})
								});
								if (res.status >= 400 && res.status <= 600) {
									alert((await res.json())['message']);
									return;
								}
								if (res.ok) {
									// invalidateAll();
									goto('/society/' + data.name);
								}
							}}
							class="hover:bg-gray-300 rounded px-2 py-1 hover:text-red-500"
						>
							<DeletePostIcon className="inline h-5" />
							<span>Delete</span>
						</button>
					{/if}
				</div>
			</div>
		</div>
		<div class="">
			Comments
			<CommentBox />
			{#if data.comments_promise}
				{#await data.comments_promise}
					<p>Fetching Comments</p>
				{:then comments}
					<Comments {comments}/>
				{:catch error}
					<p>{error.message}</p>
				{/await}
			{/if}
		</div>
	</div>

	<AboutCommunity {...data}/>
</div>
<!-- {data.name} -->
<!-- <p>This page exist</p> -->
