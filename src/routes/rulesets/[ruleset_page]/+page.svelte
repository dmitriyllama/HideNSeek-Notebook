<script lang="ts">
	import ContentBox from "$lib/components/ContentBox.svelte";
	import type { PageData } from "../$types";

    let { data }: { data: PageData } = $props()
</script>

<ContentBox>
    Hi!
</ContentBox>