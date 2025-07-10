<svelte:head>
	<title>Hide+Seek Notebook</title>
	<meta name="description" content="A guide for playing Hide and Seek in a few cities" />
</svelte:head>

<div class="legend">
	<h1>Hide+Seek Notebook</h1>
	<p>A guide for playing Hide and Seek in a few cities</p>
	<a href="/rulesets">Look</a>
</div>

<style>
	.legend {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin: 40px 0 20px;
		padding: 0 10px;
	}

	h1 {
		font-size: max(4.4vw, 2rem);
		text-shadow: 1px 3px 1px #ddd;
	}

	p {
		font-size: 1.1rem;
	}

	a {
		font-size: 1.2rem;
		font-weight: 700;
		color: white;
		background-color: #a11;
		border-radius: 8px;
		display: block;
		padding: 20px 30px;
		margin-top: 20px;
		margin-bottom: 6vw;
		box-shadow: 2px 4px 1px #611;
	}

	a:hover {
		filter: brightness(110%);
	}

	a:active {
		filter: brightness(85%);
	}
</style>
