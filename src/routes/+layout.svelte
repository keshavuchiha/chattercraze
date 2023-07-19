<script lang="ts">
    import "../app.css";
	import Header from "$lib/Components/Header.svelte";
</script>
<div class="flex flex-col min-h-screen">

    <Header/>
    <!-- <hr class="border-solid"/> -->
    <div class="grow">

        <slot/>
    </div>
    
    <footer>
        This is footer
    </footer>
</div>