<template>
    <div>

        <div class="row float-right">
<toggle-button v-if="role === 'sales'" :value="false" color="green" :sync="true" :width="120" :labels="{checked: 'Approved!', unchecked: 'Click to Approve'}" />

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
                                role:this.$store.state.account.user.user.role

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