<template>
  <div>
    <image-upload ref="imageUploadComponent" @updateImage="updateImage" :viewPort="viewPort"></image-upload>

    <div id="profile">
        <form class="container s12" @submit.prevent="processForm">
        <div class="container">
          <div class="row">
            <div class="profile-image-field col-md-12">
                <img class="image-circle" v-bind:src="croppedImageUrl">
                <div class="edit-profile-image-container">
                  <div class="edit-profile-image" @click="openImageUpload">
                    <i class="fas fa-camera"></i>
                  </div>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="input-field col-md-12">
              <input
              id="first_name"
              type="text"
              class="validate form-control"
              v-model="user.first_name"
              placeholder="First name"
              autocomplete="off"
              required>
            </div>
            <div class="input-field col-md-12">
              <input
              id="last_name"
              type="text"
              class="validate form-control"
              v-model="user.last_name"
              placeholder="Last name"
              autocomplete="off"
              required>
            </div>
          </div>
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
          <div class="row">
            <div class="col-md-12">
              <!-- <h6 for="birth_date">Birthdate</h6> -->
              <input
              type="date"
              class="validate form-control"
              v-model="user.birth_date"
              placeholder="Birthdate"
              style="color: #9e9e9e"
              autocomplete="off"
              required>
            </div>
          </div>
          <div class="row">
            <label class="col-md-6 text-center">
              <input
              name="group1"
              type="radio"
              value="Male"
              v-model="user.gender"
              class="form-check-input"
              required
              />
              <span class="form-check-label">Male</span>
            </label>
            <label class="col-md-6 text-center">
              <input
              name="group1"
              type="radio"
              value="Female"
              class="form-check-input"
              v-model="user.gender"
               />
              <span class="form-check-label">Female</span>
            </label>
          </div>
          <div class="col-md-12 text-center">
            <button class="btn waves-effect waves-light " type="submit" name="action">{{ buttonText }}

            </button>
          </div>
        </div>
        </form>

        <section id="modal_section" v-if="id">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <button class="btn" href="#" data-toggle="modal" data-target="#exampleModal">
                            Delete account
                        </button>
                    </div>
                </div>
            </div>


            <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete your account?
                        </div>
                        <div class="modal-footer">
                            <a class="btn btn-submit" @click="deleteUser()" href="#" data-dismiss="modal">Yes</a>
                            <a class="btn btn-submit"  href="#" data-dismiss="modal">No</a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
      </div>
    </div>
</template>

<script>
import{
  getById,
  updateById,
  addNew,
  deleteById,
  uploadFile
} from "@/firebase/operations.js";

import{dataURLtoFile} from "@/functions.js";

import ImageUpload from '@/components/ImageUpload'

export default{

  components: {ImageUpload},
  props: ["id"],

  data: function () {
    return{
      user: {
      idUser: '',
      first_name: '',
      last_name: '',
      img: '',
      email: '',
      password: '',
      birth_date: '',
      gender: '',
      },

      // Settings for croppie
      // the size of the viewport will become the actual file size
      // the type can be 'circle' (for an oval) or 'square' (for a rectangle)
      viewPort: {
        height: 300,
        width: 300,
        boundaryWidth: 320,
        boundaryHeigth: 320,
        type: "circle"
      },

      //imgFile will save the filename and file object once cropped
      imgFile: {
        file: null,
        name: null
      },

      croppedImageUrl: "/img/profile_image_fallback.png",

      buttonText: "Make new account"
    }
  },

  created() {
    this.getUser();
  },

  watch: {
    $route: "getUser"
  },

  methods: {
    //this method will set the image in the form into the cropped image
    updateImage: function(croppedImage){
      this.croppedImageUrl = croppedImage.dataurl;
      this.imgFile.name = croppedImage.name;
      this.imgFile.file = dataURLtoFile(croppedImage.dataurl, this.imgFile.name);
    },

    //opens uploader and starts cropper
    openImageUpload: function(){
      this.$refs.imageUploadComponent.$refs.uploadImageInputRef.click();
    },

    async processForm(){
      // First if-statement pushes the image to firebase and returns a downloadlink that is put into the img in the db for user
      if (this.imgFile.file != null) {
        this.user.img = await uploadFile(this.imgFile.file);
      }
      if (this.id != null) {
        updateById("Users", this.id, this.user);
      } else {
        this.id = await addNew("Users", this.user);
        localStorage.setItem("id", this.id);
      }
      this.$router.push({ name: "teamoverview" });
    },

    async getUser() {
      this.user = await getById("Users", this.id);
      this.buttonText =
        this.user.id !== null ? "edit account" : "Make new account";
        this.croppedImageUrl = this.user.img
    },
    async deleteUser(){
      this.user = await getById("Users", this.id);
      if (this.id != null) {
      deleteById("Users", this.id, this.user);
      this.$router.push({ name: "teamoverview" });
      }
    }
  }
}

</script>

<style lang="less">
 .profile-image-field{
   text-align: center;
   padding: 20px 0 20px 0;
   .image-circle{
     border-radius: 50%;
     height: 164px;
     width: 164px;
     border: 2px solid #ffef40;
     background: #343a40;
   }
   .edit-profile-image-container{
     text-align: center;
     margin-top: -40px;
     margin-left: 90px;
     .edit-profile-image{
       background-color: #ffef40;
       height: 50px;
       width: 50px;
       border-radius: 50%;
       text-align: center;
       position: relative;
       bottom: 0;
       display: inline-block;
       cursor: pointer;
       i {
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         position: absolute;
         color: #1a1a1a;
         font-size: 24px;
       }
     }
   }
 }
</style>
