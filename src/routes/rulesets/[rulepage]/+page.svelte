<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
	import ContentBox from "$lib/components/ContentBox.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const rules = data.ruleset.rules
    ? data.ruleset.rules
    : "There are no additional rules";

    let deleteModal = $state(false);
    let deleting = $state(false);
    let deleteFirst = () => {
        deleteModal = true;
    }
    let deleteAbort = () => {
        deleteModal = false;
    }
    let deleteFinal = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) => {
        event.preventDefault();
        if (deleting) return;
        deleting = true;

        const response = await fetch(event.currentTarget.action, {
			method: 'POST',
            body: new FormData(),
            headers: {
                'x-sveltekit-action': 'true'
            }
		});

        goto("/rulesets");
    }
</script>

<svelte:head>
    <title>{data.ruleset.name} — Hide+Seek Notebook</title>
    <meta name="description" content="[Ruleset] {data.ruleset.description}">
</svelte:head>

<Modal show={deleteModal}>
    <p>Are you sure you want to <strong class="delete-strong">delete this ruleset</strong> from the notebook?</p>
    <form class="delete-buttons" onsubmit={deleteFinal}>
        <Button on:click={deleteAbort} color=#333 background_color=#ddd shadow_color=#aaa>No, go back</Button>
        <Button submit color=white background_color=#a11 shadow_color=#511>Yes, delete</Button>
    </form>
</Modal>
<ContentBox>
    <h1>{data.ruleset.name}</h1>
    <p>{data.ruleset.description}</p>
    <p>{data.ruleset.place}</p>
    <p>{data.ruleset.players}</p>
    <pre>{rules}</pre>
    <Button on:click={deleteFirst} color=white background_color=#a11 shadow_color=#511>Delete this ruleset</Button>
</ContentBox>

<style>
    .delete-strong {
        color: #a11;
        font-weight: 500;
    }

    .delete-buttons {
        display: flex;
        justify-content: space-between;
        width: 250px;
        margin-top: 20px;
    }
</style>