<script>
	import { page } from '$app/stores';
	
</script>

<div class=" text-center align-middle h-1/2 items-center mt-32 space-y-4">
    <div class="text-6xl text-purple-500">
        {$page.status} 
    </div>
    <div class="text-4xl font-semibold text-red-500">{$page.error?.message}</div>
    <!-- <span>
        This is error page
    </span> -->
</div>
