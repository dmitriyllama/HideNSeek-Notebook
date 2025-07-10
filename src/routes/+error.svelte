<script lang="ts">
    import { page } from '$app/state';
	import ContentBox from '$lib/components/ContentBox.svelte';
</script>

<ContentBox>
    <h1>{page.status}: {page.error?.message}</h1>
</ContentBox>