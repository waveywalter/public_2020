<template>
  <div>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
      <p>Change my Avatar</p>
      <!-- <label
        class="btn btn-block btn-info btn-rounded upload-botton"
        for="user_image_uploader_button"
      >Choose File</label>
      <input
        type="file"
        ref="file"
        id="user_image_uploader_button"
        style="width: 100px"
        @change="selectFile"
      > -->
      <input type="file" ref="file" id="input-file-now" class="dropify" @change="selectFile" />
      <!-- <button class="dropify-clear upload-botton">Upload</button> -->
  </form>
  <div v-if="message" :class=" ['{{error}}' ? 'is-danger':'is-success']">
      <div class="message-body">{{message}}</div>
    </div>
  </div>
</template>

<script>
//import { router } from '../../_helpers';
import axios from "axios";
import { mapState, mapActions } from "vuex";

let user = JSON.parse(localStorage.getItem("user"));
export default {
  name: "ImageUpload",
  data() {
    return {
      file: "",
      message: "",
      error: false
    };
  },
  mounted() {
    $('.dropify').dropify();   
  },
  methods: {
    ...mapActions("account", ["update"]),
    selectFile() {
      const file = this.$refs.file.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const MAX_SIZE = 200000;
      const tooLarge = file.size > MAX_SIZE;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file;
        $(".dropify-wrapper").append('<button class="dropify-clear upload-button">Upload</button>');
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        this.message = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000}kb`
          : "Only images are allowed";
      }
    },
    async sendFile() {
      const formData = new FormData();
      var self = this;
      var fileName = user.user.username + "_avatar";
      formData.append("file", this.file, fileName);
      try {
        await axios.post("/upload", formData).then(function(response) {
          var userId = user.userId;
          var avatarName = response.data.file.filename;
          var updateInfo = {
            userId: userId,
            avatarName: avatarName
          };
          self.update(updateInfo);
        });
        this.message = "File has been uploaded";
        this.file = "";
        this.userData = "";
        this.error = false;
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
        this.error = true;
      }
    }
  }
};
</script>
<style>
.dropify-wrapper .upload-button {
    top: 50px;
    right: 11px;
}
.is-danger .message-body{
    color:#ff0000;
}
</style>
