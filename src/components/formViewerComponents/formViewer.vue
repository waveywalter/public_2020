<template>
    <div>

<dynamic ref="dynamic" v-bind:template="html"></dynamic>

    </div>
</template>
<script>
import Vue from 'vue'
import dynamic from './dynamic'
export default {
    name:"formViewer",
        data(){
            return {
                html:"<div>School</div>",
            };
        },
        mounted(){
            this.getFormHtml(this.$route.params.id)
        },
        components:{
                dynamic
        },
          computed: {
              chtml:{
                  get:function(){
                      return this.html
                  },
                  set:function(value){
                      this.html = value

                  }
              }
  },
        methods: {
                getFormHtml(id){
                    fetch('https://2020i.site/api/Forms?filter[where][id]='+id).then(res=>res.json()).then(json=>{this.chtml = json ; return "FOO"})
                }
  }
}
</script>

<style scoped>

</style>