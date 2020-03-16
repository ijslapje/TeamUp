<template>
  <section id="team_overview">
    <div class="container">
      <div class="row">
        <div class="col">
          <h4>Team overview</h4>
        </div>
      </div>
      <div class="row">
        <div class="mb-4 col-12 col-md-6" v-for="squad in squads" :key="squad.id">
          <div class="overview-card">
            <router-link tag="div" :style="{ cursor: 'pointer'}" :to="{ name: 'squadhome', params: { id: squad.id }}">
              <div class="card">
                <div class="row no-gutters">

                  <!-- <img :src="squad.img" class="card-img" alt /> -->
                  <div class="card-img" v-bind:style="{ 'background-image': 'url(' + squad.img + ')' }">
                  </div>


                  <div class="card-body">
                    <h4 class="card-title">{{squad.name}}</h4>
                    <p class="card-text description">{{squad.description}}</p>
                    <p class="card-text">
                     <i class="fas fa-map-marker-alt"></i><span class="dash"> | </span>{{squad.gym}}
                    </p>
                  </div>

                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="add_squad_section">
        <div class="row">
          <div class="col-12">
            <p>Staat je squad er niet tussen?</p>
            <router-link class="btn" :to="{name:'editsquad'}" tag="button">Add new squad</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAll } from "@/firebase/operations.js";

export default {
  data() {
    return {
      squads: []
    };
  },

  created() {
    this.getSquads();
  },

  methods: {
    async getSquads() {
      this.squads = await getAll("Squads");
    }
  }
};
</script>

<style lang="less" scoped>
</style>