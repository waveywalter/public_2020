<template>
<div>
<topheader></topheader>
<sidebar></sidebar>
    <formBuilder></formBuilder>
    <tinymce></tinymce>
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