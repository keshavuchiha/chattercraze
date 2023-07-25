    <script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
    
    export let parent_id:string|null=null;
    export let open=true;
    // export let post_id:string|null;
    let text="";
    let loading=false;
    const postComment=async ()=>{
        loading=true;
        const res=await fetch(`/society/comment`,{
            method:"POST",
            body:JSON.stringify({
                text,
                parent_id,
                post_id:$page.params.post_id,
                society_name:$page.params.name
            })
        })
        if(res.ok){
            console.log("Comment posted");
            text="";
            invalidateAll();
            if(parent_id){
                open=false;
            }
            // if($page.params.post_id)
        }
        else{
            // invalidateAll();
            alert(res.status+" "+res.statusText);
        }
        loading=false;
    }
</script>


{#if open}
<div>
        <textarea bind:value={text} class="w-full h-24 border-2 resize-none border-gray-400 my-2" placeholder="What are you Comments..."/>
    <div class="flex">
        <div class="flex-grow"></div>
        <button on:click={()=>postComment()} class="bg-emerald-500 px-2 py-1 text-white rounded-xl">
        {#if loading}
            Loading...
        {:else}
            Comment
        {/if}
        </button>
    </div>
</div>
{/if}