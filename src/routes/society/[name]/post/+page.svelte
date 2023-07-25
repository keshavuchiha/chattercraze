
<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import ImageIcon from '$lib/assets/Image-Icon.svelte';
	import LinkIcon from '$lib/assets/Link_Icon.svelte';
	import Post_Icon from '$lib/assets/Post_Icon.svelte';
	import { redirect } from '@sveltejs/kit';
	let selectedTab = 'post';
    let title="";
    let content="";
    let imageUrl="";
    let imageFileref:HTMLInputElement|null=null;
    $: if(title.length>200){
        title=title.slice(0,200);
    }
    $: if(content.length>1000){
        content=content.slice(0,1000);
        alert("Content is too long");
    }
    const handlePost=async (event:Event)=>{
        // if(!$page.data.joined){
        //     alert("You are not a member of this society");
        //     return;
        // }
        event.preventDefault();
        const form=new FormData();
        form.append("title",title);
        form.append("content",content);
        form.append("society_name",$page.data.name);
        if(imageUrl!==""){
            form.append("image",imageUrl);
        }
        const res=await fetch("/society/create/post",{
            method:"POST",
            body:form
        })
        if(res.ok){
            console.log("Post created");
            console.log($page.data.name);
            goto("/society/"+$page.data.name);
            // invalidateAll();
        }
        else{
            alert(res.status+" "+res.statusText);
        }
    }
    const handleImageChange=async (event:Event)=>{
        const file=(event.target as HTMLInputElement).files?.[0];
        // console.log(file);
        if(file){
            const reader=new FileReader();
            reader.onload=()=>{
                const data=reader.result;
                // console.log(data);
                if(typeof data==="string"){
                    imageUrl=data;
                }
            }
            reader.readAsDataURL(file);
        }
    }
</script>

<div class="mx-6 my-2 space-y-2">
	<div class="text-xl font-semibold">Create a post</div>
	<div class="grid grid-cols-12">
		<form class=" col-span-8  mr-2">
			<div class="grid grid-cols-4 text-lg font-semibold text-gray-400 text-center ">

                <button
                    class=" border-b-2"
                    class:selectedTab={selectedTab == 'post'}
                    on:click={() => (selectedTab = 'post')}
                >
                    <Post_Icon className="inline-block h-5 w-5" />
                    Post
                </button>
                <button
                    class=" border-b-2"
                    class:selectedTab={selectedTab == 'image'}
                    on:click={() => (selectedTab = 'image')}
                >
                    <ImageIcon className="inline-block h-5 w-5" />
                    Image
                </button>
                <button
                    class=" border-b-2"
                    class:selectedTab={selectedTab == 'link'}
                    on:click={() => (selectedTab = 'link')}
                >
                    <LinkIcon className="inline-block h-5 w-5" />
                    Link
                </button>
                <button
                    disabled
                    class=" border-b-2"
                    class:selectedTab={selectedTab == 'poll'}
                    on:click={() => (selectedTab = 'poll')}
                >
                    Poll
                </button>
            </div>
            <div class="col-span-full my-2">
                {#if selectedTab==='post'}
                    <div class="flex border-2 border-gray-400 items-center">
                        <textarea
                            class="w-full h-10 border-0 ring-0 outline-none resize-none focus:outline-none focus:ring-0 focus"
                            placeholder="Title"
                            bind:value={title}
                        ></textarea>
                        <div class="text-xs text-zinc-400 align-middle w-14 text-center">
                            {title.length}/200
                        </div>
                    </div>
                    <textarea bind:value={content} class="w-full h-32 border-2 resize-none border-gray-400 my-2"></textarea>
                {:else if selectedTab=="image"}
                    {#if imageUrl===""}
                    <div class="w-full h-48 text-center align-middle items-center flex justify-center border-2 border-dashed border-blue-400 text-blue-500 text-lg">
                        <input type="file" bind:this={imageFileref} on:change={handleImageChange}  hidden accept="image/*"/>
                        <button on:click={async ()=>{
                            if(imageFileref){
                                imageFileref.click();
                            }
                        }}>
                            Drag and drop image here or click to upload
                        </button>
                        
                    </div>
                    {:else}
                    <img src={imageUrl} alt="" class="w-full h-64 object-contain"/>
                    {/if}
                {/if}
            </div>
            <div class="col-span-full flex flex-row-reverse space-x-2">
                <button on:click={handlePost} class="bg-emerald-600 text-white px-2 py-1 rounded-3xl ml-2" disabled={title.length<7} class:disabled={title.length<7}>Post</button>
                <button type="reset" class="border-2 rounded-3xl px-2 py-1 text-red-500 border-red-500">Cancel</button>
            </div>
		</form>
		<div class="col-span-4">Right Content</div>
	</div>
</div>

<style>
	.selectedTab {
		@apply border-blue-600 text-blue-600 bg-blue-50;
	}
    .disabled {
        @apply bg-gray-400 cursor-not-allowed;
    }
</style>
