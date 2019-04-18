<template>
    <div>

        <div class="row float-right">
<div class="checkbox checkbox-primary checkbox-circle">
    <input id="checkbox-9" type="checkbox">
    <label for="checkbox-9"> Approved </label>
</div>
</div>
<dynamic :user="user" :fid="fid" ref="dynamic" v-bind:template="chtml[0]"></dynamic> 
    </div>
</template>
<script>
import Vue from 'vue'
import dynamic from './dynamic'
import printer from "vue-printer";
export default {
    name:"formViewer",
        props:["fid","phtml","user"],
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
                          cuser : function(){
                return this.user
            },
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