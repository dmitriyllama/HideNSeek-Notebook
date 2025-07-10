<header>
	<nav>
		<a href="/"> Home </a>
		<a href="/about"> About </a>
		<a href="/rulesets"> Rulesets </a>
	</nav>
</header>

<style>
	header {
		background-color: #0c131b;
		width: 100%;
	}

	nav {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 auto;
		width: 83%;
	}

	a {
		box-sizing: border-box;
		color: #ddd;
		font-size: 0.9rem;
		font-weight: 500;
		background-color: #0c131b;
		text-decoration: none;
		padding: 1.5em 0;
		margin: 0 2px;
		text-align: center;
	}

	a:hover {
		background-color: #1a2a3a;
	}

	a:focus {
		background-color: #1a2a3a;
	}

	a:active {
		background-color: #0c131b;
	}

	@media screen and (min-width: 601px) {
		nav {
			width: 500px;
		}

		a {
			font-size: 1.1rem;
		}
	}
</style>
