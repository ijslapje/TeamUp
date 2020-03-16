<template>
  <section class="edit_squad">
    <div class="container py-4">
      <form @submit.prevent="processForm">
        <div class="form-group row">
          <div class="col-12">
            <h4>Team overview</h4>
          </div>
          <label for="img" class="col-md-4 col-12 col-form-label">Squad Image</label>
          <div class="col-md-8 col-12">
            <input
              id="img"
              name="img"
              type="file"
              accept="image/*"
              class="form-control"
              style="display: none"
              ref="imageInput"
              @change="previewImage"
            />

            <div class="wrap-img" v-bind:style="{ 'background-image': 'url(' + squad.img + ')' }"></div>
            <md-button class="md-fab" @click="pickImage">
              <i class="fas fa-camera"></i>
            </md-button>
          </div>
        </div>

        <div class="form-group row">
          <label for="name" class="col-md-4 col-12 col-form-label">Squad Name</label>
          <div class="col-md-8 col-12">
            <input
              id="name"
              name="name"
              placeholder="Your squad's name"
              type="text"
              required="required"
              class="form-control"
              v-model="squad.name"
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="description" class="col-md-4 col-12 col-form-label">Squad Description</label>
          <div class="col-md-8 col-12">
            <textarea
              id="description"
              name="description"
              placeholder="Describe your squad in a few words"
              cols="40"
              rows="5"
              class="form-control"
              aria-describedby="descriptionHelpBlock"
              v-model="squad.description"
            ></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="tag" class="col-md-4 col-12 col-form-label">Add New Tag</label>
          <div class="col-md-8 col-12">
            <h5 class="tagg mx-1 mt-0 mb-2" v-for="(tag, index) in squad.tags" :key="index">
              <span class="badge badge-pill badge-secondary">
                {{ tag }}
                <i class="fas fa-times-circle" @click="removeTag(index)"></i>
              </span>
            </h5>
          </div>

          <div class="input-group col-md-8 offset-md-4 col-12">
            <input
              id="tag"
              name="tag"
              placeholder="Type something to describe your squad"
              type="text"
              class="form-control"
              v-model="tag"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addTag">
                <i class="fas fa-plus"></i> Add tag
              </button>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="gym" class="col-md-4 col-12 col-form-label">Gym</label>
          <div class="col-md-8 col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <input
                id="gym"
                name="gym"
                placeholder="Your gym"
                type="text"
                class="form-control"
                v-model="squad.gym"
              />
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-4 col-12 col-form-label">Squad visibility</label>
          <div class="col-md-8 col-12">
            <div class="custom-control custom-switch">
              <input
                name="isPrivate"
                id="isPrivate"
                type="checkbox"
                class="custom-control-input"
                value="true"
                v-model="squad.isPrivate"
              />
              <label for="isPrivate" class="custom-control-label">Make squad private</label>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12 text-center pt-5">
            <button @click="$router.go(-1)" class="btn" style="border:none">Cancel</button>
            <button name="submit" type="submit" class="btn btn-primary">{{ buttonText }}</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import {
  getById,
  updateById,
  addNew,
  uploadFile
} from "@/firebase/operations.js";
import Vue from "vue";
import { MdButton } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";

Vue.use(MdButton);

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
      imgFile: null,
      tag: "",
      buttonText: "create new squad"
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
    async processForm() {
      if (this.imgFile != null) {
        this.squad.img = await uploadFile(this.imgFile);
      }
      if (this.id != null) {
        updateById("Squads", this.id, this.squad);
      } else {
        addNew("Squads", this.squad);
      }
      this.$router.push({ name: "teamoverview" });
    },

    async getSquad() {
      this.squad = await getById("Squads", this.id);
      this.buttonText =
        this.squad.id !== null ? "edit squad" : "create new squad";
    },

    pickImage() {
      this.$refs.imageInput.click();
    },

    previewImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.squad.img = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.imgFile = file;
    },

    addTag() {
      if (this.tag != "") {
        this.squad.tags.push(this.tag);
        this.tag = "";
      }
    },

    removeTag(index) {
      this.squad.tags.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/variabless.less";

.container {
  img {
    width: 100%;
    height: auto;
  }
  .md-fab {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    background-color: @first-color;
    font-size: 1.5rem;
  }

  textarea {
    min-height: 200px;
  }

  .badge i {
    margin-left: 1rem;
  }
}
</style>
