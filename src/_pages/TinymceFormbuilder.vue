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
              <input v-model="form.FormTitle " type="text" name value>
            </h1>
   <tinymce v-model="form.FormContent"></tinymce>
            <div class="col-lg-2 col-sm-4 col-xs-12">
              <input
                class="btn btn-success  upload-botton"
                type="submit"
                value="Submit"
              >
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from "../components/layoutComponents/tinymce";
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
            tinymce,
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
        // console.log(valid)
        if (true) {
          this.form = {
                FormContent:'',
                FormTitle:''
          };
        }
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