<script lang="ts">
	import Post from "$lib/Components/Post.svelte";
	import type { PageServerData } from "./$types";

    export let data:PageServerData
</script>
<div class="flex">

    <div class="space-y-3 mx-4">
        {#each data.rows as row}
            <Post {...row} />
        {/each}
        
    </div>
    <div class="min-w-[192px]">
        <!-- Right Side  -->
    </div>
</div>
