<template>
<div>
<h1>Jello World</h1>
<topheader></topheader>
<sidebar></sidebar>
    <tinymce> </tinymce>
    </div>
</template>


<script>

import tinymce from '../components/layoutComponents/tinymce'
import TopHeader from '../components/layoutComponents/TopHeader'
import sidebar from '../components/layoutComponents/SideBar'
export default {
    name:"tinymceformbulder",
        data(){
            return {

            }
        },
        components:{
            tinymce,
            TopHeader,
            sidebar
        }
}

</script>