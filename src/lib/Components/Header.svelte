<script lang="ts">
	import { society } from './../Stores/society';
  import { Button, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte'
	import AuthModal from './AuthModal.svelte';
	import logo from '$lib/assets/Logo.png';
	import UserSignIcon from '$lib/assets/User_sign_Icon.svelte';
	import UserRegister from '$lib/assets/User_register.svelte';
	import { auth, token, user } from '$lib/Stores/auth';
	import CreateSocietyModal from './CreateSocietyModal.svelte';
	import { invalidateAll } from '$app/navigation';

	let menuOpen = false;
</script>

{#if $auth.open}
	<AuthModal />
{/if}
{#if $society.open}
	<CreateSocietyModal />
{/if}
<header class=" flex items-center justify-between h-16 px-4 text-center align-middle gap-4">
	<div class="flex">
		<a href="/">
		
			<img src={logo} alt="logo" class="h-10" />
		</a>
	</div>
	<div class="flex space-x-2 flex-row">
        <button class="outline-none w-24 ring-0 bg-emerald-500 rounded px-2 py-1 text-white border-b-4 border-emerald-700">Home</button>
		<Dropdown >
            <DropdownItem on:click={()=>$society.open=true}>Create Community</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
		<input
			type="text"
			id="Search"
			placeholder="Search..."
			class="px-2 py-1 rounded border-2 outline-none focus:border-emerald-400 bg-zinc-200"
		/>
	</div>
	<div class="space-x-2 flex">
		{#if $auth.isLoggedIn}
			<button
				on:click={() => {
					localStorage.removeItem('x-auth-token');
					$auth.isLoggedIn = false;
					$token = null;
					$user = null;
					invalidateAll();
				}}
				class="bg-emerald-500 px-3 py-1 rounded border-b-4 border-emerald-700 text-white hover:bg-emerald-400"
				>Logout</button
			>
		{:else}
			<button
				on:click={(event) => {
					$auth.open = true;
					$auth.type = 'log in';
				}}
				class="bg-emerald-500 px-3 py-1 rounded border-b-4 border-emerald-700 text-white hover:bg-emerald-400"
			>
				<UserSignIcon />
				Sign In
			</button>
			<button
				on:click={() => {
					$auth.open = true;
					$auth.type = 'register';
				}}
				class="bg-orange-500 px-3 py-1 rounded border-b-4 border-orange-700 text-white hover:bg-orange-400"
			>
				<UserRegister />
				Register
			</button>
		{/if}
	</div>
</header>
