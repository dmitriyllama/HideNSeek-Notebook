<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ContentBox from '$lib/components/ContentBox.svelte';

    let submitting = $state(false);

    let nameInput: HTMLInputElement;

    let goBack = () => {
        goto("/rulesets");
    }

    let fields = $state({
        name: "",
        description: "",
        place: "",
        teams: 2,
        players: 1,
        rules: ""
    });

    function isNameLinkable() {
        return (nameInput.willValidate && (/^[a-zA-Z0-9 ,_-]*$/.test(fields.name)));
    }

    let handleNameChange = async () => {
        if (isNameLinkable() && fields.name.length >= 5 && fields.name.length <= 30) {
            nameInput.classList.remove("invalid");
            nameInput.setAttribute("aria-invalid", "false");
        } else {
            nameInput.classList.add("invalid");
            nameInput.setAttribute("aria-invalid", "true");
        }
    }

    let errors: { error: string }[] = $state([])

    let handleSubmit = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) => {
        event.preventDefault();
        if (submitting) return;
        submitting = true;

        let newErrors = [];
        if (fields.name.length == 0) newErrors.push({error: "Name is empty."});
        else if (fields.name.length < 5) newErrors.push({error: "Name is too short."});
        else if (fields.name.length > 30) newErrors.push({error: "Name is too long."});

        if (!isNameLinkable()) newErrors.push({error: "Name has unwanted symbols."});

        if (fields.description.length == 0) newErrors.push({error: "Description is empty."});
        else if (fields.description.length < 16) newErrors.push({error: "Description is too short."});
        else if (fields.description.length > 240) newErrors.push({error: "Description is too long."});
    
        if (fields.description.length == 0) newErrors.push({error: "Place name is empty."});
        else if (fields.place.length < 2) newErrors.push({error: "Place name is too short."});
        else if (fields.place.length > 26) newErrors.push({error: "Place name is too long."});

        if (fields.teams < 2) newErrors.push({error: "Recommended teams amount can't be less than 2"});
        else if (fields.teams > 6) newErrors.push({error: "Recommended teams amount is too big"});
    
        if (fields.players < 1) newErrors.push({error: "Recommended players per team can't be fewer than 1"});
        else if (fields.teams > 6) newErrors.push({error: "Recommended players per team shouldn't be more than 6"});

        if (fields.rules.length > 1000) newErrors.push({error: "Rules section is too long"});

        errors = newErrors;

        if (errors.length == 0) {
            const formData = new FormData(event.currentTarget);
            formData.append('name', fields.name);
            formData.append('description', fields.description);
            formData.append('place', fields.place);
            formData.append('teams', fields.teams.toString());
            formData.append('players', fields.players.toString());
            formData.append('rules', fields.rules);

            const response = await fetch(event.currentTarget.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-sveltekit-action': 'true'
                }
            });

            const result = await response.json();

            submitting = false;
            if (result.status === 400) {
                errors = [{ error: 'Invalid submission' }];
            } else if (!response.ok) {
                errors = [{ error: 'Server error: ' + response.status }];
            } else {
                goto("/rulesets");
            }
        }
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
        <p>You will need to reference a rulebook from the <a class="inline-link" href="https://store.nebula.tv/products/hideandseek" target="_blank">physical copy of Hide+Seek</a> or the <a class="inline-link" href="https://jetlag.collinj.dev/docs/quick_start_guide/" target="_blank">unofficial online version by Collin James</a>.</p>
    </div>
    <form class="input-box" onsubmit={handleSubmit}>
        <div class="input-field">
            <input class="name invalid" aria-label="Ruleset name" type="text" placeholder="New Ruleset" minlength="5" maxlength="30" required bind:value={fields.name} bind:this={nameInput} oninput={handleNameChange} />
        </div>
        <div class="input-field">
            <input class="description" aria-label="Ruleset description" type="text" placeholder="Description" minlength="16" maxlength="240" required bind:value={fields.description} />
        </div>
        <hr>
        <div class="input-field">
            <label class="hint" for="place">Town, city, or district:</label><input class="place" id="place" type="text" placeholder="e.g. New York City" minlength="2" maxlength="26" required bind:value={fields.place} />
        </div>
        <div class="input-field">
            <span class="hint">Recommended players:</span>
            <input class="players" aria-label="Recommended team count" id="teams" type="number" min=2 max=6 required bind:value={fields.teams} />
            <i>teams of</i>
            <input class="players" aria-label="Recommended players per team" id="players" type="number" min=1 max=6 required bind:value={fields.players} />
            <i class="desktop-hint">players</i>
        </div>
        <hr>
        <span class="hint" style="display: block; width: 200px">Describe any specific rules</span>
        <textarea id="rules" rows=12 cols=40 placeholder="- Use JetLag's Small-size game rules" maxlength="1000" bind:value={fields.rules}></textarea>
        {#each errors as error}
            <div class="validation-error">{error.error}</div>
        {/each}
        <div class="submit-area">
            <Button submit large color=white background_color=#1a1 shadow_color=#151>Submit</Button>
            <div class="submitting" hidden={!submitting}>Submitting...</div>
        </div>
    </form>
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

    input:invalid, .invalid {
        background-color: #e5e5e5 !important;
        color: #333 !important;
        border-top: 1px dotted #333 !important;
        border-right: 1px dotted #333 !important;
        border-left: 1px dotted #333 !important;
        border-bottom: 3px solid #333 !important;
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

    .submit-area {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }

    .submitting {
        margin-top: 10px;
    }

    .validation-error {
        font-weight: 500;
        color: #811;
        margin-top: 0.4em;
    }

    .validation-error::before {
        content: "\2022\20";
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