<script lang="ts">
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import type { LayoutData, PageData } from './$types';
	import Icon from '$lib/assets/Icon.png';
	import dayjs from 'dayjs';
	import { auth, token } from '$lib/Stores/auth';
	import { goto, invalidateAll } from '$app/navigation';
	import UpvoteIcon from './../../../lib/assets/Upvote_Icon.svelte';
	import DownVoteIcon from '$lib/assets/DownVote_Icon.svelte';
	export let data:PageData;
	let joined = 'Joined';
	import relatimeTime from 'dayjs/plugin/relativeTime';
	import CommentsIcon from '$lib/assets/Comments_Icon.svelte';
	import ShareIcon from '$lib/assets/Share_Icon.svelte';
	import SaveIcon from '$lib/assets/Save_Icon.svelte';
	import DeletePostIcon from '$lib/assets/Delete_Post_Icon.svelte';
	import CreatedIcon from '$lib/assets/Created_Icon.svelte';
	import { postVote } from '$lib/utils/postVote';
	let imageFileref: HTMLInputElement | null = null;
	let tempImageUrl: string | null = null;
	let isLoading = false;
	export const handleImageChange = async (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		// console.log(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const data = reader.result;
				// console.log(data);
				if (typeof data === 'string') {
					tempImageUrl = data;
				}
			};
			reader.readAsDataURL(file);
		}
	};
	
	const handleSocietyChange = async (event: Event) => {
		event.preventDefault();
		isLoading = true;
		const form = new FormData();
		form.append('society_name', data.name);
		if (tempImageUrl && tempImageUrl !== '') {
			form.append('image', tempImageUrl);
		}
		const res = await fetch('/society/edit', {
			method: 'POST',
			headers: {
				'x-auth-token': $token || ''
			},
			body: form
		});
		if (res.ok) {
			// console.log("Post created");
			// console.log($page.data.name);
			// goto("/society/"+$page.data.name);
			invalidateAll();
		} else {
			console.log(res.status, res.statusText);
			alert(await res.text());
		}
		isLoading = false;
	};
	dayjs.extend(relatimeTime);
</script>

<div class="h-20 bg-emerald-400" />

<div class="h-30 flex flex-row">
	<img
		src={data.image_url || Icon}
		alt="icon"
		class="relative rounded-[50%] bg-emerald-700 border-4 border-white -mt-5 ml-6 mr-4 h-14 w-14"
	/>
	<div class=" font-semibold text-2xl">
		{data.name}
		<div class="text-sm text-zinc-400 font-normal">
			society/{data.name}
		</div>
	</div>
	<div class="space-x-2 my-1 mx-6">
		{#if data.joined}
			<button
				on:click={async () => {
					const res = await fetch('/society/leave', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': $token || ''
						},
						body: JSON.stringify({
							name: data.name
						})
					});
					if (res.status >= 400 && res.status <= 600) {
						alert((await res.json())['message']);
						return;
					}
					if (res.ok) {
						invalidateAll();
					}
				}}
				class="px-8 border-2 w-28 rounded-3xl text-emerald-600 py-0.5 hover:text-red-500"
				on:mouseenter={() => (joined = 'Leave')}
				on:mouseleave={() => (joined = 'Joined')}
			>
				{joined}
			</button>
		{:else}
			<button
				on:click={async () => {
					if (!$token) {
						$auth.open = true;
						return;
					}
					const res = await fetch('/society/join', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': $token || ''
						},
						body: JSON.stringify({
							name: data.name
						})
					});
					if (res.status >= 400 && res.status <= 600) {
						alert((await res.json())['message']);
						return;
					}
					if (res.ok) {
						invalidateAll();
					}
				}}
				class="bg-emerald-600 w-28 text-white px-8 py-0.5 rounded-3xl hover:bg-emerald-500"
			>
				Join
			</button>
		{/if}
	</div>
</div>
<div class="grid grid-cols-12 mx-4">
	<div class=" col-span-9">
		{#if data.posts_promise}
			{#await data.posts_promise}
				Loading
			{:then result}
				<div class="space-y-3 mx-4">
					{#each result as row (row.title)}
						<a href={`/society/${data.name}/comments/${row.post_id}`} class="flex space-x-2">
							<!-- <button></button> -->
							<div
								class=" w-12 bg-gray-200 rounded-s-xl text-center text-zinc-500 justify-center align-middle"
							>
								<button on:click={()=>postVote(1,row.post_id)}><UpvoteIcon className={`h-7 mx-auto ${row.vote=='1' && "text-emerald-500"}`} /></button>
								<div>{row.count}</div>
								<button on:click={()=>postVote(-1,row.post_id)}>
									<DownVoteIcon className={`h-7 mx-auto ${row.vote=='-1' && "text-red-400"}`} />
								</button>
							</div>
							<div class=" ">
								<div class="text-zinc-400">
									Post by <span class="hover:underline">{row.username}</span>{' '}<span
										>{dayjs(row.post_created_at).fromNow()}</span
									>
								</div>
								<div class="font-semibold text-md">
									{row.title}
								</div>
								<div>
									{#if row.content}
										{@html DOMPurify.sanitize(marked(row.content))}
									{/if}
								</div>
								<div>
									{#if row.image_url}
										<img src={row.image_url} alt="" class=" h-64" />
									{/if}
								</div>
								<div class="flex space-x-3 text-zinc-400">
									<div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
										<CommentsIcon className="inline h-5 " />
										<span>10 Comments</span>
									</div>
									<div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
										<ShareIcon className="inline h-5 " />
										<span>Share</span>
									</div>
									<div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
										<SaveIcon className="inline h-5 " />
										<span>Save</span>
									</div>
									{#if row.is_author}
										<button
											on:click={async () => {
												const res = await fetch('/society/posts', {
													method: 'DELETE',
													headers: {
														'Content-Type': 'application/json',
														'x-auth-token': $token || ''
													},
													body: JSON.stringify({
														post_id: row.post_id
													})
												});
												if (res.status >= 400 && res.status <= 600) {
													alert((await res.json())['message']);
													return;
												}
												if (res.ok) {
													invalidateAll();
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
						</a>
					{/each}
				</div>
			{:catch err}
				error loading posts
			{/await}
		{/if}
	</div>
	<div class=" col-span-3">
		<div class="bg-emerald-500 px-2 py-2 text-white font-semibold">About Community</div>
		<div class="px-2 py-1">{data.description || ''}</div>
		<div class="px-2 text-sm text-gray-400">
			<CreatedIcon className="inline-block h-6" />
			Created {dayjs(data.created_at).fromNow()}
		</div>
		<div class="px-2 py-1 my-2 border-y-2 font-semibold">
			{data.count} members
		</div>
		<div class="w-full items-center text-center">
			<button
				on:click={() => {
					goto(`/society/${data.name}/post`);
				}}
				class="text-center mx-auto hover:bg-emerald-400 bg-emerald-500 text-white px-20 py-1 rounded-2xl font-semibold"
			>
				Create Post
			</button>
		</div>
		{#if data.role === 'creator'}
			<div class="flex">
				<div class="flex-grow">
					<div class=" font-semibold">Admin</div>
					<input
						type="file"
						bind:this={imageFileref}
						on:change={handleImageChange}
						hidden
						accept="image/*"
					/>
					<button
						on:click={async () => {
							if (imageFileref) {
								imageFileref.click();
							}
						}}
						class="text-emerald-400 hover:text-emerald-500"
					>
						Change Image
					</button>
				</div>
				<div>
					<img
						src={tempImageUrl || data.image_url || Icon}
						alt="icon"
						class="rounded-[50%] bg-emerald-700 border-4 border-white h-12 w-12"
					/>
				</div>
			</div>
			{#if isLoading}
				<div class="text-center text-emerald-500">
					<div role="status">
						<svg
							aria-hidden="true"
							class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			{:else}
				<button
					on:click={handleSocietyChange}
					class="border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-3xl my-1 text-emerald-600 px-2 py-1"
					>Submit</button
				>
			{/if}
		{/if}
	</div>
</div>

<style>
	/* upvote{
		color: #FF4500;
	}
	downvote{
		color: #7193FF;
	} */
</style>
