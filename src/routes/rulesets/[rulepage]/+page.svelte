<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import ContentBox from "$lib/components/ContentBox.svelte";
	import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const rules = data.ruleset.rules
    ? data.ruleset.rules
    : "There are no additional rules";

    let deleting = $state(false);
    let del = () => {
        if (deleting) return;
        deleting = true;

        
    }
</script>

<svelte:head>
    <title>{data.ruleset.name} — Hide+Seek Notebook</title>
    <meta name="description" content="[Ruleset] {data.ruleset.description}">
</svelte:head>

<ContentBox>
    <h1>{data.ruleset.name}</h1>
    <p>{data.ruleset.description}</p>
    <p>{data.ruleset.place}</p>
    <p>{data.ruleset.players}</p>
    <pre>{rules}</pre>
    <Button on:click={del} color=white background_color=#a11 shadow_color=#511>Delete this ruleset</Button>
</ContentBox>

<style>

</style>