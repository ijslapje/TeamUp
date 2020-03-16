<template>
    
  <section id="viewsquad">
    <div class="container">
      <div class="row">
        <div class="mb-3 col-12 col-md-6 " id="squadkaart">
          
          <div class="card bg-secondary">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img :src="squad.img" class="card-img" alt />
              </div>
            </div>
            <div class="card-body">
              <h4 class="card-title">{{squad.name}}</h4>
              <p class="card-text description">Beschrijving: {{squad.description}}</p>
              <p class="card-text">
                <i class="fas fa-map-marker-alt"></i><span class="dash"> | </span>{{squad.gym}}
              </p>
              <button data-v-698c8498="" type="button" class="btn btn-outline-secondary"><i data-v-698c8498="" class="fas fa-plus"></i> Join Squad </button>
            </div>
            
          </div>
        </div>   
      </div>
    </div>
  </section>

    

</template>

<script>


import {
  getById,

} from "@/firebase/operations.js";



export default {
  props: ["id"],
  data: function() {
    return {
      squad: {
        name: "",
        description: "",
        img: "http://via.placeholder.com/640x360",
        gym: "",
        isPrivate: false,
        tags: []
      },

    };
  },

  created() {
    this.getSquad();
  },

  watch: {
    // call again the method if the route changes
    $route: "getSquad"
  },

  methods: {


    async getSquad() {
      this.squad = await getById("Squads", this.id);
    },



  }
};

</script>

<style lang="less" scoped>
    @import "../../assets/less/variabless.less";

.card-body {
  background-color: #212529;
}

.card-img {
   
}


</style>