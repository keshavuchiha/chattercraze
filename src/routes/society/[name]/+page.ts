import type { PageLoad } from './$types';
import { token } from '$lib/Stores/auth';
import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, parent, fetch }) => {
	const {description,created_at,count,image_url}=await parent();
	let joined = false;
	let posts_promise = null;
	let role:null|string=null;
	if (browser) {
		let res = await fetch('/society/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': localStorage.getItem('x-auth-token') || ''
			},
			body: JSON.stringify({
				name: params.name
			})
		});
		console.log(res.status);
		if (res.ok) {
			posts_promise = res.json();
		}
		res = await fetch('/society/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': localStorage.getItem('x-auth-token') || ''
			},
			body: JSON.stringify({
				name: params.name
			})
		});
		console.log(res.status);
		if (res.ok) {
			const data = await res.json();
			joined = data.joined;
			if(joined){
				role=data.role;
			}
		} else {
			throw error(res.status, res.statusText);
		}
	}
	
	return {
		name: params.name,
		joined,
		posts_promise,
		description,
		created_at,
        count,
		image_url,
		role
	};
};
