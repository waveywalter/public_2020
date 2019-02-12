<template>
  <div>
    <topheader></topheader>
    <sidebar></sidebar>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div data-v-7ad1cecc class="">
          <div data-v-7ad1cecc class="row bg-title">
            <h4 data-v-7ad1cecc class="page-title">Form Builder</h4>
          </div>
        </div>
        <div class="row">
          <div class="container  col-sm-12">
            <form class="form-horizontal" @submit.prevent="MceSubmit">
            <h1>
              Form Title:
              <input v-model="form.FormTitle " type="text" v-on:click="clearAlert">
            </h1>
   <tinymceEditor id= "tiny-mce-form" ref="FormContent" v-model="form.FormContent"></tinymceEditor>

            <div class="col-lg-2 col-sm-4 col-xs-12">
              <input
                class="btn btn-success  upload-botton"
                type="submit"
                value="Save Form"
              >
            </div>
            </form>
            <p v-show="message">{{message}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinymceEditor from "../components/layoutComponents/tinymceEditor";
import topheader from "../components/layoutComponents/TopHeader";
import sidebar from "../components/layoutComponents/SideBar";
import formBuilder from "../formBuilder/formBuilder";
import { mapState, mapActions } from "vuex";

export default {
    name:"tinymceformbulder",
        data(){
            return {
              form: {
                FormContent:"",
                FormTitle:"",
              },
            submitted: false
            };
        },
        components:{
            tinymceEditor,
            topheader,
            sidebar,
            formBuilder
        },
          computed: {
    ...mapState("alert", ["message", "type"])
  },
        methods: {
    ...mapActions("form", ["saveform"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    MceSubmit(e) {
      this.saveform(this.form);
      console.log(e)
      this.submitted = true;
      this.form = {
        FormTitle:""
      };
      tinymce.get('tiny-mce-form').setContent("");  
    }
  }
}
</script>

<style scoped>
#user_image_uploader_button {
  display: none;
}
.upload-botton {
  display: inline-table;
  cursor: pointer;
}
</style>