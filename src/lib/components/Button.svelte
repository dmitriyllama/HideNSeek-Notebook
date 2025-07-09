<script lang="ts">
    export let color = "black";
    export let background_color = "white";
    export let shadow_color = "#666";
</script>

<button on:click style="color: {color}; background-color: {background_color}; box-shadow: 0 3px {shadow_color}">
    <slot />
</button>

<style>
    button {
        display: inline-block;
        text-decoration: none;
        border: none;
        border-radius: 0.8em;
        padding: 0.8em 0.5em;
        cursor: pointer;
    }

    button:hover {
        filter: brightness(110%);
    }
</style>