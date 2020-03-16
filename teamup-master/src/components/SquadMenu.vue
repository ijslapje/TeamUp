<template>
    <section>
        <div class="squad-sub-menu">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <ul class="squad-menu-list">
                            <li><router-link v-bind:to="'/squad/home'">Squad</router-link></li>
                            <li><router-link v-bind:to="'/squad/agenda'">Agenda</router-link></li>
                            <li><router-link v-bind:to="'/squad/chat'">Chat</router-link></li>     
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="squad-menu">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h4 class="squad-menu-title">{{squadtitle.name}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { getById } from "@/firebase/operations.js";

    export default {
        name: "SquadMenu",
        data() {
            return {
                squadtitle: []
            };
        },

        created() {
            this.getSquadTitle();
        },
        methods: {

            async getSquadTitle() {
                this.squadtitle = await getById("Squads", this.$route.params.id);
            }
        }
    }
</script>

<style lang="less">
    
</style>