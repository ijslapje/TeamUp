<template>
    <div class="image-upload-container" v-bind:class="{displayblock: croppieActive}" >
      <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
      <div class="image-cropper-container">
      <vue-croppie
          ref="croppieRef"
          :enableOrientation="true"
          :viewport="{ width: viewPort.width, height: viewPort.height, type: viewPort.type }"
          :boundary="{ width: viewPort.boundaryWidth, height: viewPort.boundaryHeigth }"
          :showZoomer="false"
          :enableResize="false"
          @result="result"
          @update="update">
      </vue-croppie>

      <!-- the result -->
      <!-- <img v-bind:src="cropped"> -->
    <div class="btncontainer">
      <input id="uploadImageInput" ref="uploadImageInputRef" type="file" style="display: none;" accept="image/*" v-on:change="setUpImageUploader">
      <button class="btn croppiebtn" @click="stopCroppie()"><i class="far fa-times-circle"></i></button>
      <!-- Rotate angle is Number -->
      <button class="btn croppiebtn" @click="rotate(90)"><i class="fas fa-redo fa-flip-horizontal"></i></button>
      <button class="btn croppiebtn" @click="rotate(-90)"><i class="fas fa-redo"></i></button>
      <button class="btn croppiebtn" @click="crop()"><i class="far fa-check-circle"></i></button>
      <!-- <button @click="cropViaEvent()">Crop Via Event</button> -->
    </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'ImageUpload',
  props:{
    viewPort: Object
  },
    mounted() {
        // Upon mounting of the component, we accessed the .bind({...})
        // function to put an initial image on the canvas.
        //this.$refs.croppieRef.bind({
        //    url: 'https://i.imgur.com/Im5TgGP.jpg',
        //    url: null
        //})

    },
    data() {
        return {
            cropped: null,
            imgFile:{
              name: null,
              dataurl: null
            },
            croppieActive: false
        }
    },
    methods: {
        stopCroppie() {
            // The user can reupload another picture
            this.$refs.uploadImageInputRef.value = ""
            this.croppieActive = false

        },
        // CALBACK USAGE
        crop() {
            // Here we are getting the result via callback function
            // and set the result to this.cropped which is being
            // used to display the result above.
            let options = {
                format: 'jpeg',
                circle: false
            }
            this.$refs.croppieRef.result(options, (output) => {
                this.cropped = output
                this.imgFile.dataurl = this.cropped
                this.$emit('updateImage', this.imgFile)
                this.croppieActive = false
            });
        },

        setUpImageUploader(e) {
          let files = e.target.files || e.datatransfer.files
          if (!files.length){
            return
          }
          this.createImage(files[0])
          this.croppieActive = true
        },

        createImage (file) {
          this.imgFile.name = file.name
          var reader = new FileReader()
          var vm = this

          reader.onload = (e) => {
            vm.image = e.target.result
            this.$refs.croppieRef.bind({
                url: vm.image,
            });
          }

          reader.readAsDataURL(file)
        },

        // // EVENT USAGE
        // cropViaEvent() {
        //     this.$refs.croppieRef.result(options);
        // },
        result(output) {
            this.cropped = output;
        },
        update(val) {
          //update zooming position
            console.log(val);
        },
        rotate(rotationAngle) {
            // Rotates the image
            this.$refs.croppieRef.rotate(rotationAngle);
        }
    }
}
</script>

<style>
.image-upload-container{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #1a1a1a;
  z-index: 50;
  display: none;
}

.displayblock{
  display: block !important;
}

.btncontainer{
  position: relative;
  text-align: center;
}

.croppiebtn{
  margin: 10px !important;
  padding: 10px 16px !important;
  font-size: 1.5rem !important;
}
</style>
