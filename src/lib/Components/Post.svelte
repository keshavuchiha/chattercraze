<script lang="ts">
	import Icon  from '$lib/assets/Icon.png';
	// import { relatimeTime } from 'dayjs/plugin/relativeTime';
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import CommentsIcon from "$lib/assets/Comments_Icon.svelte";
	import DeletePostIcon from "$lib/assets/Delete_Post_Icon.svelte";
	import DownVoteIcon from "$lib/assets/DownVote_Icon.svelte";
	import SaveIcon from "$lib/assets/Save_Icon.svelte";
	import ShareIcon from "$lib/assets/Share_Icon.svelte";
	import UpvoteIcon from "$lib/assets/Upvote_Icon.svelte";
	import { postVote } from "$lib/utils/postVote";
	import dayjs from "dayjs";
	import { marked } from "marked";
    export let post_id:string;
    export let count=0;
    export let vote:string;
    export let username:string;
    export let post_created_at:Date;
    export let title:string;
    export let content:string;
    export let post_image_url:string;
    export let society_image_url:string;
    export let comments_count:number;
    export let is_author:boolean;
    export let name:string;
    import relatimeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relatimeTime);
</script>

<a href={`/society/${name}/comments/${post_id}`} class="flex space-x-2 border-2 rounded-2xl shadow-lg">
    <!-- <button></button> -->
    
    <div
        class=" min-w-[48px] bg-gray-200 rounded-s-xl text-center text-zinc-500 justify-center align-middle"
    >
        <button on:click|preventDefault={()=>postVote(1,post_id)}><UpvoteIcon className={`h-7 mx-auto ${vote=='1' && "text-emerald-500"}`} /></button>
        <div>{count}</div>
        <button on:click|preventDefault={()=>postVote(-1,post_id)}>
            <DownVoteIcon className={`h-7 mx-auto ${vote=='-1' && "text-red-400"}`} />
        </button>
    </div>
    <div class="flex-grow    ">
        <div class="text-zinc-400">
            {#if $page.url.pathname==='/'}
                <a href={`/society/${name}`} class="hover:underline text-black font-semibold">
                <img src={society_image_url || Icon} alt={name} class="h-6 inline-flex rounded-[50%] bg-emerald-500"/>    {name}
                </a>
            {/if}
            Post by <span class="hover:underline">{username}</span>{' '}<span
                >{dayjs(post_created_at).fromNow()}</span
            >
        </div>
        <div class="font-semibold text-md">
            {title}
        </div>
        <div>
            {#if content}
                {@html marked(content)}
            {/if}
        </div>      
        <div>
            {#if post_image_url}
                <img src={post_image_url} alt="" class=" h-64" />
            {/if}
        </div>
        <div class="flex space-x-3 text-zinc-400">
            <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
                <CommentsIcon className="inline h-5 " />
                <span>{comments_count} Comments</span>
            </div>
            <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
                <ShareIcon className="inline h-5 " />
                <span>Share</span>
            </div>
            <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">
                <SaveIcon className="inline h-5 " />
                <span>Save</span>
            </div>
            {#if is_author}
                <button
                    on:click={async () => {
                        const res = await fetch('/society/posts', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                post_id: post_id
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
    <!-- <div class="w-[192px] min-w-[192px]">
        Right side
    </div> -->
</a>