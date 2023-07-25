<script lang="ts">
	import type { PageData } from './$types';
	import Icon from '$lib/assets/Icon.png';
	import dayjs from 'dayjs';
	import { invalidateAll } from '$app/navigation';
	export let data:PageData;
	let joined = 'Joined';
	import relatimeTime from 'dayjs/plugin/relativeTime';
	import AboutCommunity from '$lib/Components/AboutCommunity.svelte';
	import Post from '$lib/Components/Post.svelte';
	
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
					const res = await fetch('/society/join', {
						method: 'POST',
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
						<Post {...row} />
					{/each}
				</div>
			{:catch err}
				error loading posts
			{/await}
		{/if}
	</div>
	<AboutCommunity {...data}/>
</div>

<style>
	/* upvote{
		color: #FF4500;
	}
	downvote{
		color: #7193FF;
	} */
</style>
