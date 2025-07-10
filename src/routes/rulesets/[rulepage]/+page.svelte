<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ContentBox from '$lib/components/ContentBox.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let rules = $state(data.ruleset.rules ? data.ruleset.rules : 'There are no additional rules');

	let deleteModal = $state(false);
	let deleting = $state(false);
	let deleteFirst = () => {
		deleteModal = true;
	};
	let deleteAbort = () => {
		deleteModal = false;
	};
	let deleteFinal = async (
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) => {
		event.preventDefault();
		if (deleting) return;
		deleting = true;

		const response = await fetch('?/del', {
			method: 'POST',
			body: new FormData(),
			headers: {
				'x-sveltekit-action': 'true'
			}
		});

		goto('/rulesets');
	};

	let editing = $state(false);
	let saving = $state(false);
	let rulesEdit = $state(rules);
	let error: string[] = $state([]);
	let editFirst = () => {
		editing = true;
	};
	let editFinal = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
		event.preventDefault();

		if (rules === rulesEdit) {
			editing = false;
			return;
		}

		if (saving) return;
		saving = true;
		error = [];

		let formData = new FormData();
		formData.append('rules', rulesEdit);

		const response = await fetch('?/upd', {
			method: 'POST',
			body: formData,
			headers: {
				'x-sveltekit-action': 'true'
			}
		});

		const result = await response.json();

		saving = false;
		if (result.status === 400) {
			error = ['Invalid submission'];
		} else if (!response.ok) {
			error = ['Server error'];
		} else {
			rules = rulesEdit;
			editing = false;
		}
	};
</script>

<svelte:head>
	<title>{data.ruleset.name} — Hide+Seek Notebook</title>
	<meta name="description" content="[Ruleset] {data.ruleset.description}" />
</svelte:head>

<Modal show={deleteModal}>
	<p>
		Are you sure you want to <strong class="delete-strong">delete this ruleset</strong> from the notebook?
	</p>
	<form class="delete-buttons" onsubmit={deleteFinal}>
		<Button on:click={deleteAbort} color="#333" background_color="#ddd" shadow_color="#aaa"
			>No, go back</Button
		>
		<Button submit color="white" background_color="#a11" shadow_color="#511">Yes, delete</Button>
	</form>
</Modal>
<ContentBox>
	<div class="card-box">
		<h1>{data.ruleset.name}</h1>
		<p>{data.ruleset.description}</p>
		<div class="line">
			<p>Location:</p>
			<span>{data.ruleset.place}</span>
		</div>
		<div class="line">
			<p>Players:</p>
			<span>{data.ruleset.players}</span>
		</div>
		<h2>Additional rules:</h2>
		<pre hidden={editing}>{rules}</pre>
		<textarea
			rows="12"
			cols="30"
			placeholder="- Use JetLag's Small-size game rules"
			maxlength="1000"
			bind:value={rulesEdit}
			disabled={saving}
			hidden={!editing}>{rules}</textarea
		>
		{#each error as e}
			<div class="error">{e}</div>
		{/each}
		<form class="control-buttons" onsubmit={editFinal}>
			<Button
				on:click={editFirst}
				color="#333"
				background_color="#ddd"
				shadow_color="#aaa"
				hidden={editing}>Edit rules</Button
			>
			<Button submit color="white" background_color="#6b6" shadow_color="#262" hidden={!editing}
				>Save changes</Button
			>
			<Button
				on:click={deleteFirst}
				color="white"
				background_color="#a11"
				shadow_color="#511"
				hidden={editing}>Delete this ruleset</Button
			>
		</form>
	</div>
</ContentBox>

<style>
	p,
	span,
	pre {
		font-size: 1rem;
	}

	.line {
		display: flex;
		align-items: center;
		margin: 20px 0;
	}

	.line > p {
		margin: 0 10px 0 0;
	}

	.line > span {
		font-weight: 500;
	}

	h2 {
		font-size: 1.1rem;
		font-weight: 500;
		margin-right: 10px;
	}

	pre {
		padding: 5px 10px;
		margin-bottom: 30px;
	}

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

	.card-box {
		box-sizing: border-box;
		border: 1px solid #333;
		border-radius: 0.8em;
		padding: 10px 30px 30px;
		margin-top: 20px;
		width: 100%;
	}

	.control-buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 250px;
		margin-top: 15px;
	}

	textarea {
		width: 100%;
		max-width: 96%;
		max-height: 30em;
		margin-top: 10px;
		padding: 0.8em;
	}

	.error {
		font-weight: 500;
		color: #811;
		margin-top: 0.4em;
	}

	@media screen and (max-width: 650px) {
		pre {
			border-left: 1px solid #333;
			border-right: 1px solid #333;
		}
	}

	@media screen and (min-width: 450px) {
		p,
		span,
		pre {
			font-size: 1.1rem;
		}
	}
</style>
