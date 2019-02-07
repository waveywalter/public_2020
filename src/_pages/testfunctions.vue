<template>
    <div>
        <tinymce v-model="value"></tinymce>
    </div>
</template>

<script>
import tinymce from '../components/layoutComponents/tinymce' 

export default {
    name:"testfunctions",
    data(){
        return{
            value:''
        }
    },
    computed: {
        
    },
    created () {
       
    },
    methods: {
        
    },
    components:{
        tinymce
    }
};
</script>