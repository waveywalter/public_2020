<template>
<div>
<topheader></topheader>
<sidebar></sidebar>
 <div id="page-wrapper">
      <div class="container-fluid">
        <div class="clearfix">
          <div class="container white-box">
            <h1>Form Title: <input type="text" name="FirstName" value=""></h1>
    <tinymce></tinymce>
    <input type="submit" value="Submit">

          </div>
        </div>
      </div>
    </div>
    </div>
</template>


<script>

import tinymce from '../components/layoutComponents/tinymce'
import topheader from '../components/layoutComponents/TopHeader'
import sidebar from '../components/layoutComponents/SideBar'
import formBuilder from '../formBuilder/formBuilder'
export default {
    name:"tinymceformbulder",
        data(){
            return {

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
#user_image_uploader_button{
  display:none;
}
.upload-botton{
    display: inline-table;
    cursor: pointer;
}
</style>