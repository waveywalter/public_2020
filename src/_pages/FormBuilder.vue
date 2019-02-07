<style>
</style>
<template>
      <div>
        // form builder template
        <form-builder type="template" v-model="formData" ></form-builder>
        
        // form builder gui
        <form-builder type="gui" ></form-builder>

        {{formData}}
    </div>
</template>
<script>
import FormBuilder from 'v-form-builder';
export default {
    components: {FormBuilder},
        data(){
            return{
                yourConfigFormObject:{}
            }
        },

}
</script>