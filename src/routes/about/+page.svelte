<script>
	import ContentBox from '$lib/components/ContentBox.svelte';
</script>

<svelte:head>
	<title>About — Hide+Seek Notebook</title>
	<meta name="description" content="About the app" />
</svelte:head>

<ContentBox>
	<h1>About</h1>
	<p>
		This is an app for Hide and Seek players that know, or want to learn, <b
			>how to play the game across a large city area</b
		>.
	</p>
	<p>
		We're inspired by the Jet Lag: The Game show, their games across Switzerland and Japan, and
		their card game presentation in New York City. City-wide Hide and Seek is <b>very fun</b>, but
		too much of organizing the game is up to the players. Here's a utility to write about the
		organization process, in your place!
	</p>
	<p>
		Add rules, set game periods, include challenges, help interested tourists - make the game easier
		for your friends!
	</p>
</ContentBox>

<style>
	h1 {
		margin-left: 4%;
		margin-bottom: 25px;
	}

	p {
		font-size: 1rem;
	}

	@media screen and (min-width: 601px) {
		h1 {
			font-size: 2.5rem;
		}

		p {
			font-size: 1.1rem;
		}
	}
</style>
