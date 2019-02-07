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
            <form class="form-horizontal" @submit.prevent="handleSubmit">
            <h1>
              Form Title:
              <input type="text" name value>
            </h1>
   <tinymce v-model="value"></tinymce>
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
export default {
    name:"tinymceformbulder",
        data(){
            return {
                value:''
            }
        },
        components:{
            tinymce,
            topheader,
            sidebar,
            formBuilder
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