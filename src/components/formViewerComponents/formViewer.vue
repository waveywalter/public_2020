<template>
    <div>

<dynamic :fid="fid" ref="dynamic" v-bind:template="chtml[0]"></dynamic> 

    </div>
</template>
<script>
import Vue from 'vue'
import dynamic from './dynamic'
import printer from "vue-printer";
export default {
    name:"formViewer",
        props:["fid","phtml"],
        data(){
            return {
                html:"<div>Initializing</div>",
            };
        },
        mounted(){

        },
        components:{
                dynamic,printer
        },
          computed: {
              chtml:{
                  get:function(){
                      return this.phtml
                  },
                  set:function(value){
                      this.chtml = value

                  }
              }
  },
        methods: {
  
  }
}
</script>

<style scoped>

</style>