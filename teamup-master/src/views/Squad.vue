<template>
    <h1>squad parent</h1>
</template>

<script>
export default {
    data: function() {
        return {
            squads: []
        };
    },
    methods: {
        newSquad(squad) {
            this.squads.push(squad);
        }
    },
}
</script>

<style lang="less" scoped>

</style>