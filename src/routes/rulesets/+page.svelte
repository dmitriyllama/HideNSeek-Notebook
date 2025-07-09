<script>
	import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
	import ContentBox from "$lib/components/ContentBox.svelte";

    let gotoNew = () => {
        goto("/rulesets/new");
    }

    let rulesets = [
        {
            id: 0,
            page: "0-kazan-trolleybuses",
            name: "Kazan Trolleybuses",
            place: "Kazan",
            description: "A ruleset for medium-sized games across Kazan using only trolleybus lines.",
            players: "4 players",
            tags: ["Medium games", "Trolleybus"],
            rules: `
            - Use JetLag's Medium-size game rules
            - Use only your feet, and Kazan Trolleybus lines: 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13
            - One-day game period: 14 hours
            - Two-day game period: 10 hours per day, with 14 hours for rest period
            `
        },
        {
            id: 1,
            page: "1-moscow-subway",
            name: "Moscow Subway",
            place: "Moscow",
            description: "A ruleset for large-sized games across Moscow's Subway System.",
            players: "6 players",
            tags: ["Large games", "Subway"],
            rules: `
            - Use JetLag's Large-size game rules
            - Use only your feet, and Moscow Subway lines
            - Two-day game period: 10 hours per day, with 14 hours for rest period
            `
        }
    ]
</script>

<ContentBox>
    <Button on:click={gotoNew} color="white" background_color="#1a1" shadow_color="#151">
        Add a ruleset
    </Button>
    {#each rulesets as ruleset}
        <a class="ruleset" href="/rulesets/{ruleset.page}">
            <div class="ruleset-header">
                <h2 class="ruleset-name">{ruleset.name}</h2>
                <div class="ruleset-tags">
                    <span class="ruleset-place">{ruleset.place}</span>
                    <span class="ruleset-players">{ruleset.players}</span>
                </div>
            </div>
            <div class="ruleset-body">
                <p class="ruleset-description">{ruleset.description}</p>
            </div>
        </a>
    {/each}
</ContentBox>

<style>
    .ruleset {
        display: block;
        text-decoration: none;
        color: #333;
        box-sizing: content-box;
        border: 1px solid #666;
        border-radius: 0.8em;
        box-shadow: 0 3px #666;
        margin-top: 1em;
    }
    
    .ruleset-name {
        font-size: 1.1rem;;
        color: #333;
    }

    .ruleset-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3em 1em 0.2em;
    }

    .ruleset-tags {
        display: flex;
        color: #444;
    }

    .ruleset-tags * {
        margin-left: 0.5rem;
        font-weight: 500;
    }

    .ruleset-tags *::before {
        content: "\2022\20";
    }

    .ruleset-players {
        display: none;
    }

    .ruleset-body {
        padding: 0.2em 1em 0.4em;
    }

    .ruleset-description {
        text-align: justify;
    }

    .ruleset:hover {
        border: 1px solid #a11;
        box-shadow: 0 5px #a11;
    }


    .ruleset:hover .ruleset-name {
        color: #a11;
    }


    @media screen and (min-width: 501px) {
        .ruleset-name {
            font-size: 1.4rem;
        }

        .ruleset-players {
            display: inline;
        }
    }
</style>