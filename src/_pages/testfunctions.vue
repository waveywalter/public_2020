<template>
    <div>
        <tinymceEditor v-model="value"></tinymceEditor>
    </div>
</template>

<script>
import tinymceEditor from '../components/layoutComponents/tinymceEditor' 

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