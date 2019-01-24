<template>
  <div>
  <form @submit.prevent="sendFile" enctype="multipart/form-data" class="update-avatar">
      <label style="margin: 15px 0">My current avatar</label>
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
      <input type="file" ref="file" title=" " id="input-file-now" class="dropify" v-bind:data-default-file="imagepath" @change="selectFile" />
      <!-- <button class="dropify-clear upload-botton">Upload</button> -->
  </form>
  <div v-if="message" :class=" [ error ? 'is-danger':'is-success']">
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
      imagepath: "/public/uploads/" + user.user.username +'/'+user.user.avatarName,
      error: false
    };
  },
  mounted() {
    $('.dropify').dropify({
    tpl: {
        message:         '',
        preview:         '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">Drag and drop <br>or click to <br>change avatar</p></div></div></div>',
        filename:        '',
        clearButton:     '',
        errorLine:       '',
        errorsContainer: ''
    }
});
    var drEvent = $('.dropify').dropify();
    drEvent.on('dropify.beforeClear', function(event, element){
        $(".upload-button").remove();
    });   
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
        $(".upload-button").remove();
        $(".update-avatar").append('<button style= "margin: 15px 0" class="upload-button btn btn-success">Update Avatar</button>');
        this.error = false;
        this.message = "";
      } else {
        this.error = true;
        $(".upload-button").remove();
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
        this.error = false;
        this.message = "Updating...";
        this.file = "";
        this.userData = "";
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
.dropify-wrapper {
    width: 170px;
    height: 170px;
}
.is-danger .message-body{
    color:#ff0000;
}
.is-success .message-body{
    color:#38C395;
}
.dropify-wrapper{
    border: 0;
}
.dropify-wrapper, .dropify-wrapper .dropify-preview .dropify-render img, .dropify-wrapper .dropify-preview, .dropify-wrapper:hover, .dropify-wrapper .dropify-preview .dropify-infos, .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner p.dropify-infos-message::before{
    background: transparent;
}
.dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner p.dropify-infos-message{
    opacity: 1;
    font-size: 14px;
    padding: 0;
    margin: 0;
}
.dropify-wrapper .dropify-preview .dropify-render img{
    border-radius: 50%;
    height: 200px
}
.dropify-wrapper .dropify-preview{
    border-radius: 50%;
    padding: 0
}
input[type='file'] {
  color: transparent;   
}
.dropify-wrapper:hover .dropify-render img{
    opacity: 0.4;
}
</style>
