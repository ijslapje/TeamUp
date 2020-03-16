<template>
    <div>
        <squad-home-menu></squad-home-menu>
        <router-view/>
    </div>
</template>

<script>
    import SquadHomeMenu from "@/components/SquadMenu";

    export default {
        name: "SquadApp",
        components: {SquadHomeMenu}
    }
</script>

<style scoped>

</style>