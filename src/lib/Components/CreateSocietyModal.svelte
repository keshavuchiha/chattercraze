<script lang="ts">
	import { society } from '$lib/Stores/society';
	import Close from '$lib/assets/Close.svelte';
	import PrivateIcon from '$lib/assets/Private_Icon.svelte';
	import PublicIcon from '$lib/assets/Public_icon.svelte';
	import RestrictedIcon from '$lib/assets/Restricted_Icon.svelte';
	// import { clickOutside } from '$lib/utils/clickOutside';
	let name = '';
	const totallength = 25;
	$: if (name.length >= totallength) {
		name = name.slice(0, totallength);
		// console.log(name.length);
	}
	let privacy: 'public' | 'private' | 'restricted' = 'public';
	// function Captalize(str:string){
	// 	return str.charAt(0).toUpperCase()+str.slice(1);
	// }
</script>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />

	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<form
				on:submit|preventDefault={async () => {
					const res = await fetch('/society/create', {
						method: 'POST',
						body: JSON.stringify({
							name,
							privacy
						})
					});
					if (res.status >= 400 && res.status <= 600) {
						alert((await res.json())['message']);
						return;
					}
					$society.open = false;
					// const data=await res.json();
					// if(res.ok){
					// 	$society.open=false;
					// }
				}}
				class="relative transform overflow-hidden rounded-lg bg-white
				text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
			>
				<div class="w-full px-4 py-4 space-y-1">
					<div class="text-xl font-semibold">
						Create Society
						<button class="float-right text-red-500" on:click={() => ($society.open = false)}
							><Close className="h-5" /></button
						>
					</div>
					<div>
						<div class="text-xs my-1 mx-1 text-zinc-400">
							<span class=" text-red-500">*</span>Note: Society name can't be changed later
						</div>
						<div class="relative">
							<input
								required
								type="text"
								id="name"
								class="floating peer"
								placeholder=" "
								bind:value={name}
							/>
							<label for="name" class="floating">Name</label>
						</div>
						<div class="text-sm text-zinc-500">
							{totallength - name.length} remaining characters
						</div>
					</div>
					<div class="text-lg font-semibold">Society Type</div>

					<div class="space-y-1">
						<div class="flex space-x-2 items-center align-middle">
							<input
								type="radio"
								id="public"
								name="society_type"
								value={'public'}
								bind:group={privacy}
							/>
							<label for="public">
								<PublicIcon
									className="h-4 inline-block text-zinc-400 align-middle text-center mb-1"
								/>
								<span>Public</span>{' '}<span class="text-sm text-slate-400"
									>Anyone can view, post, and comment to this society</span
								>
							</label>
						</div>
						<div class="flex space-x-2 items-center align-middle">
							<input
								type="radio"
								id="restricted"
								name="society_type"
								value={'restricted'}
								bind:group={privacy}
							/>
							<label for="restricted">
								<RestrictedIcon
									className="h-4 inline-block text-zinc-400 align-middle text-center mb-1"
								/>
								<span>Restricted</span>{' '}<span class="text-sm text-slate-400"
									>Anyone can view, but only approved users can post</span
								>
							</label>
						</div>
						<div class="flex space-x-2 items-center align-middle">
							<input
								type="radio"
								id="private"
								name="society_type"
								value={'private'}
								bind:group={privacy}
							/>
							<label for="private">
								<PrivateIcon
									className="h-4 inline-block text-zinc-400 align-middle text-center mb-1"
								/>
								<span>Private</span>{' '}<span class="text-sm text-slate-400"
									>Only approved users can view and submit to this society</span
								>
							</label>
						</div>
					</div>
				</div>
				<div class="bg-zinc-300 flex flex-row-reverse py-1 space-x-2">
					<div>
						<button type="submit" class="rounded-lg bg-emerald-400 text-white px-2 py-1 mr-2"
							>Create Society</button
						>
					</div>
					<div>
						<button type="reset" class="rounded-lg bg-red-500 text-white px-2 py-1 mx-2"
							>Cancel</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	label.floating {
		@apply absolute text-sm text-gray-500 bg-white duration-300 
      transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 left-1 peer-focus:px-2 peer-focus:text-emerald-600 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                peer-placeholder-shown:top-1/2 peer-focus:top-2 
                peer-focus:scale-75 peer-focus:-translate-y-4;
	}
	input.floating {
		@apply block px-2.5 pb-2.5 pt-4 w-full text-sm 
    text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 
    appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600;
	}
	input[type='radio'] {
		@apply ring-0;
	}
</style>
