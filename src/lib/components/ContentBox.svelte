<main>
	<slot />
</main>

<style>
	main {
		margin-top: 15px;
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
	}

	@media screen and (min-width: 801px) {
		main {
			margin-right: auto;
			margin-left: auto;
			width: 800px;
		}
	}
</style>
