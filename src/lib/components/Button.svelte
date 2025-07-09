<script lang="ts">
    export let color = "black";
    export let background_color = "white";
    export let shadow_color = "#666";
    export let large = false;

    export let submit = false;

    if (submit) {

    }
</script>

{#if submit}
<button type="submit" class:large on:click style="color: {color}; background-color: {background_color}; box-shadow: 0 3px {shadow_color}">
    <slot />
</button>
{:else}
<button type="button" class:large on:click style="color: {color}; background-color: {background_color}; box-shadow: 0 3px {shadow_color}">
    <slot />
</button>
{/if}

<style>
    button {
        display: inline-block;
        text-decoration: none;
        font-weight: 500;
        border: none;
        border-radius: 0.8em;
        padding: 0.8em 0.5em;
        cursor: pointer;
    }

    button:hover {
        filter: brightness(110%);
    }

    .large {
        font-size: 1.1rem;
        padding-left: 1.4em;
        padding-right: 1.4em;
    }
</style>