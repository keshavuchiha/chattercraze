<script lang="ts">
	import DownVoteIcon from '$lib/assets/DownVote_Icon.svelte';
	import UpvoteIcon from '$lib/assets/Upvote_Icon.svelte';
	import { postVote } from '$lib/utils/postVote';
	import dayjs from 'dayjs';
    import type { PageData } from './$types';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import CommentsIcon from '$lib/assets/Comments_Icon.svelte';
	import ShareIcon from '$lib/assets/Share_Icon.svelte';
	import { token } from '$lib/Stores/auth';
	import { invalidateAll } from '$app/navigation';
	import DeletePostIcon from '$lib/assets/Delete_Post_Icon.svelte';
	import SaveIcon from '$lib/assets/Save_Icon.svelte';
    import relatimeTime from 'dayjs/plugin/relativeTime';
    export let data:PageData;
    dayjs.extend(relatimeTime);
</script>


<div class="flex space-x-2">
    <div
        class=" w-12 bg-gray-100 rounded-s-xl text-center text-zinc-500 justify-center align-middle">
        <button on:click={()=>postVote(1,data.post_id||"")}><UpvoteIcon className={`h-7 mx-auto ${data.vote==1 && "text-emerald-500"}`} /></button>
        <div>{data.count}</div>
        <button on:click={()=>postVote(-1,data.post_id||"")}>
            <DownVoteIcon className={`h-7 mx-auto ${data.vote==-1 && "text-red-400"}`} />
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
                {@html DOMPurify.sanitize(marked(data.content))}
            {/if}
        </div>
        <div>
            {#if data.image_url}
                <img src={data.image_url} alt="" class=" h-64" />
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
            {#if data.is_author}
                <button
                    on:click={async () => {
                        const res = await fetch('/society/posts', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': $token || ''
                            },
                            body: JSON.stringify({
                                post_id: data.post_id
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
</div>
<!-- {data.name} -->
<!-- <p>This page exist</p> -->