<script>
    export let show = false;
</script>

<div class="background" hidden={!show}>
    <div class="modal">
        <slot />
    </div>
</div>

<style>
    .background {
        position: fixed;
        background: rgba(150, 150, 150, 0.6);
        width: 100%;
        height: 100%;
    }

    .modal {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-color: white;
        font-size: 1.1rem;
        border-radius: 0.8em;
        max-width: 600px;
        min-height: 200px;
        padding: 30px 10px;
        margin: 100px 10px;
        box-shadow: 0 3px #aaa;
    }

    @media screen and (min-width: 600px) {
        .modal {
            margin: 100px auto;
        }
    }
</style>