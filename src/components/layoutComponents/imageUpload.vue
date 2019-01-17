<template>
<form @submit.prevent="sendFile" enctype="multipart/form-data">
<div v-if="message" :class="`message $error ? 'is-danger':'is-success'}`">
    <div class="message-body">{{message}}</div>
</div>
<div class="col-sm-3">
    <label for="file" class="label" >Change Profile Image</label>
    <input type="file" ref="file" style="width: 100px" @change="selectFile"/>
            <button class="">Upload</button>


    </div>
</form>
</template>

<script>

//import { router } from '../../_helpers';
import axios from 'axios';
import { mapState, mapActions } from "vuex";

let user = JSON.parse(localStorage.getItem('user'));
export default {
    name:"ImageUpload",
    data(){
        return {
            file: "",
            message: "",
            error: false
                        }
    },
    methods: {
        ...mapActions("account", ["update"]),
        selectFile(){
            const file = this.$refs.file.files[0];
            const allowedTypes = ["image/jpeg","image/png", "image/gif"];
            const MAX_SIZE = 200000;
            const tooLarge = file.size > MAX_SIZE;
            if (allowedTypes.includes(file.type) && !tooLarge) {
            this.file = file;
            this.error = false;
            this.message = "";
            }else {
                this.error = true;
                this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb` : "Only images are allowed";
            }
        },
        async sendFile(){
            const formData = new FormData();
            var self = this;
            var fileName = user.user.username+'_avatar';
            formData.append('file',this.file,fileName);    
        try{
          await axios.post('/upload', formData).then(function (response) {
            var userId = user.userId;
            var avatarName = response.data.file.filename;
            var updateInfo={
                "userId": userId,
                "avatarName": avatarName
            };
            self.update(updateInfo);
          });
          this.message = "File has been uploaded";
          this.file = ""
          this.userData = ""
          this.error = false
          
        } catch(err){
            console.log(err);
            this.message = err.response.data.error;
            this.error = true;
            }
        }
    }
}
</script>