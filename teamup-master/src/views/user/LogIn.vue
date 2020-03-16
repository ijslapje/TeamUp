<template>
  <div>
    <div id="profile" class="row">
        <form class="container s12" @submit.prevent="processForm">
          <div class="row">
            <div class="input-field col-md-12">
              <input
              id="email"
              type="email"
              class="validate form-control"
              v-model="user.email"
              placeholder="E-Mail"
              autocomplete="off"
              required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col-md-12">
              <input
              id="password"
              type="password"
              class="validate form-control"
              v-model="user.password"
              placeholder="Password"
              autocomplete="off"
              required>
            </div>
          </div>
          <div class="col-md-12 text-center">
            <button class="btn waves-effect waves-light " type="submit" name="action">
              Log in
            </button>
            <button @click="()=>$router.push('edit')" class="btn waves-effect waves-light ml-5" type="" name="">
              Create an account
            </button>
          </div>
        </form>

      </div>
    </div>
</template>

<script>
import{

} from "@/firebase/operations.js";


export default{
  props: ["id"],
  data: function () {
    return{
      user: {
      email: '',
      password: ''
    }
    };
  },
  created() {

  },

  watch: {

  },

  methods: {
      async processForm(){


    },

  }
}

</script>

<style>

</style>
