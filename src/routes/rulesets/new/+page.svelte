<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ContentBox from '$lib/components/ContentBox.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let goBack = () => {
        goto("/rulesets");
    }
</script>

<svelte:head>
    <title>New Ruleset — Hide+Seek Notebook</title>
    <meta name="description" content="Add a rule set for playing Hide and Seek in your location here!">
</svelte:head>

<ContentBox>
    <Button on:click={goBack} color="white" background_color="#a11" shadow_color="#511">Return</Button>
    <div class="info">
        <p>Your ruleset should include the following details, which are missing from the rulebook:</p>
        <ul>
            <li>Game size for your city;</li>
            <li>Teams and team size;</li>
            <li>Transit methods and other map boundaries;</li>
            <li>Time for play and rest periods;</li>
        </ul>
        <p>You will need to reference a rulebook from the <a class="inline-link" href="https://store.nebula.tv/products/hideandseek">physical copy of Hide+Seek</a> or the <a class="inline-link" href="https://jetlag.collinj.dev/docs/quick_start_guide/">unofficial online version by Collin James</a>.</p>
    </div>
    <div class="input-box">
        <div class="input-field">
            <input class="name" aria-label="Ruleset name" type="text" placeholder="New Ruleset" minlength="5" maxlength="30" required />
        </div>
        <div class="input-field">
            <input class="description" aria-label="Ruleset description" type="text" placeholder="Description" minlength="16" maxlength="240" required />
        </div>
        <hr>
        <div class="input-field">
            <label class="hint" for="place">Town, city, or district:</label><input class="place" id="place" type="text" minlength="2" maxlength="24" required />
        </div>
        <div class="input-field">
            <span class="hint">Recommended players:</span><input class="players" aria-label="Recommended team count" id="teams" type="number" min=2 max=6 required /><i>teams of</i><input class="players" aria-label="Recommended players per team" id="players" type="number" min=1 max=6 required /><i class="desktop-hint">players</i>
        </div>
        <hr>
        <span class="hint" style="display: block; width: 200px">Describe any specific rules</span>
        <textarea id="rules" rows=12 cols=40 placeholder="- Use JetLag's Small-size game rules"></textarea>
    </div>
</ContentBox>

<style>
    .info {
        margin: 30px 10px;
    }

    p {
        font-size: 0.9rem;
        margin-top: 15px;
        text-align: justify;
    }

    li {
        font-size: 0.9rem;
        line-height: 1.4em;
    }

    .inline-link {
        font-weight: 500;
    }
    
    .input-box {
        box-sizing: border-box;
        border: 1px solid #333;
        border-radius: 0.8em;
        padding: 10px 30px 30px;
        margin-top: 20px;
        width: 100%;
    }

    hr {
        margin: 2em 0;
        background-color: #333;
    }

    .hint {
        font-size: 0.9rem;
        font-weight: 500;
        width: 150px;
    }

    .desktop-hint {
        display: none;
    }

    .input-field {
        display: flex;
        justify-content: left;
        align-items: center;
        margin-top: 20px;
    }

    input {
        display: inline-block;
        box-sizing: border-box;
        background-color: #e5e5e5;
        color: #333;
        border-top: 1px dotted #333;
        border-right: 1px dotted #333;
        border-left: 1px dotted #333;
        border-bottom: 3px solid #333;
        border-radius: 4px;
        padding: 0.2em 4px;
    }

    input:valid {
        background-color: white;
        border-top: none;
        border-right: none;
        border-left: none;
        border-top: 1px dotted #666;
        border-right: 1px dotted #666;
        border-left: 1px dotted #666;
        border-bottom: 2px solid #181;
    }

    .name {
        font-size: 2rem;
        font-weight: 500;
        width: 100%;
    }

    .description {
        font-size: 1.1rem;
        font-weight: 500;
        height: 2.2em;
        width: 100%;
    }

    .place {
        font-size: 1.1rem;
        font-weight: 500;
        height: 2em;
        width: 100%;
        max-width: 250px;
        margin-left: 0.5em;
    }

    .players {
        appearance: none;
        font-size: 1.1rem;
        font-weight: 500;
        height: 2em;
        width: 2.5em;
        margin-left: 0.5em;
        margin-right: 0.5em;
    }

    textarea {
        width: 100%;
        max-width: 96%;
        max-height: 30em;
        margin-top: 10px;
        padding: 0.8em;
    }

    @media screen and (min-width: 450px) {
        .desktop-hint {
            display: inline;
        }

        p, li, .hint {
            font-size: 1rem;
        }
    }
</style>