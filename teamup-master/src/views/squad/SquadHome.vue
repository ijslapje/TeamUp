<template>
    <div class="squadhome" id="squadprofile">
        <div class="squadhome-img-wrapper" v-bind:style="{ 'background-image': 'url(' + squad.img + ')' }">
            <router-link tag="div" :style="{ cursor: 'pointer'}" :to="{ name: 'editsquad', params: { id: $route.params.id }}">
                <div class="cogwheel">
                    <div class="md-button-content"><i class="fas fa-cog"></i></div>
                </div>
            </router-link>
        </div>
        <div class="upcoming">
            <div class="upcoming-text">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <p class="upcoming-text">Aankomende trainingsessies</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upcoming-training" v-for="date in dates" :key="date.date">
                <div class="container">
                    <div class="row">
                        <div class="col-7">
                            <p>{{date.date}}</p>
                            <p>{{date.time}}</p>
                        </div>
                        <div class="col">
                            <div class="upcoming-height-fix">
                                <i class="fas fa-check"></i>
                            </div>
                        </div>
                        <div class="col">
                            <div class="upcoming-height-fix">
                                <i class="fas fa-question"></i>
                            </div>
                        </div>
                        <div class="col">
                            <div class="upcoming-height-fix">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="members row">
                    <div class="col">
                        <p>Leden</p>
                        <div class="users">
                            <div class="user" v-for="member in squad.Members" :key="member.id"><img
                                    src="https://capenetworks.com/static/images/testimonials/user-icon.svg" alt="">
                            </div>
                        </div>
                        <button name="submit" type="submit" class="btn btn-primary" v-on:click=addMember()>Word lid</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getById, pushMember} from "@/firebase/operations.js";

    export default {
        name: "SquadHomeMenu",
        data() {
            return {
                squad: [],
                dates: []
            };
        },

        created() {
            this.getSquad();
            console.log(localStorage.getItem("id"));
        },
        methods: {

            async getSquad() {
                this.squad = await getById("Squads", this.$route.params.id);

                //loop trough the agenda
                this.squad.Agenda.forEach((value) => {
                    let myDate = new Date(value.seconds * 1000) // date object
                    const weekDay = new Array(7);
                    weekDay[0] = "zondag";
                    weekDay[1] = "maandag";
                    weekDay[2] = "dinsdag";
                    weekDay[3] = "woendsdag";
                    weekDay[4] = "donderdag";
                    weekDay[5] = "vrijdag";
                    weekDay[6] = "zaterdag";

                    const month = new Array(12);
                    month[0] = "januari";
                    month[1] = "februari";
                    month[2] = "maart";
                    month[3] = "april";
                    month[4] = "Mei";
                    month[5] = "juni";
                    month[6] = "juli";
                    month[7] = "augustus";
                    month[8] = "september";
                    month[9] = "oktober";
                    month[10] = "november";
                    month[11] = "december";

                    let fullDay = weekDay[myDate.getDay()]; //get the written day
                    let day = myDate.getDate(); //get the day
                    let fullMonth = month[myDate.getMonth()]; //get the written month
                    let time = myDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) //get the time without seconds

                    let array = {};
                    array["date"] = fullDay + ' ' + day + ' ' + fullMonth;
                    array["time"] = time
                    this.dates.push(array);
                });
            }
            ,
            addMember(){
                pushMember(this.$route.params.id)
            }
        }
    }
</script>
<style scoped lang="less">

</style>
