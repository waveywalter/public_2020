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

import { router } from '../../_helpers';
import axios from 'axios'
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
        selectFile(){
            const file = this.$refs.file.files[0];
            let userData = JSON.parse(localStorage.getItem('user'));

            console.log(userData.user.id)

            const allowedTypes = ["image/jpeg","image/png", "image/gif"];
            const MAX_SIZE = 200000;
            const tooLarge = file.size > MAX_SIZE;
            if (allowedTypes.includes(file.type) && !tooLarge) {
            this.file = file;
            this.error = false;
            this.userData = userData.user.id;
            this.message = "";
            }else {
                this.error = true;
                this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb` : "Only images are allowed";
            }
        },
        async sendFile(){
            const formData = new FormData();
            formData.append('file',this.file,this.userData);   
        try{
          await axios.post('/upload', formData);
          this.message = "File has been uploaded";
          this.file = ""
          this.userData = ""
          this.error = false
          
        } catch(err){
            console.log(err);
            this.message = err.response.data.error;
            this.error = true;
            }
        router.go()
        }
    }
}
</script>