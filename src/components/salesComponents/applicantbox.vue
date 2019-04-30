<template>
  <div class="col-md-4">
    <div class="white-box">
      <h3 class="box-title">Current Applicants</h3>
      <div class="">
          <div class="ml-5">



    <v-container
      id="scroll-target"
      style="max-height: 300px"
      class="scroll-y"
    >
      <v-layout
        column    
        style="height: 900px"
      >
            <div id="app-wrapper" :key="listkey" >
              <div>
                <div class="">
                  <div class="row">
                    <div class="col-xl-12">
                      <div class="form-group">
                       
                        <label for="exampleInputEmail1">Filter Applications - 1</label>
                        <input
                          type="text"
                          v-model="appfilter"
                          v-on:blur="filterApp(appfilter)"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter Email Address"
                        >
                      </div>
                    </div>
                    <h4 class="card-title">Applications</h4>
                    <applicationslist></applicationslist>
                  </div>
                </div>
              </div>
            </v-layout>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import $ from "jquery";
import applicationslist from "./applicationslist";
import affiliatelist from "./affiliatelist";
import imageupload from "../layoutComponents/imageUpload";
import affiliateApplication from "../affiliateComponents/affiliateApplication";
import { mapState, mapActions } from "vuex";
//import AffiliateRegView from '../salesComponents/jottComponents/v5/pages/AffiliateRegView.vue';

export default {
  name: "applicantbox",
  data() {
    return {

    };
  },
  computed: {
    list:function(){
      return this.$store.state.apps.list
    }
  },
  methods: {

  ...mapActions("apps", ["getApps"]),
    filterApp(txt) {
     
 
      let list = this.list.filter(item => {
              
              if (item) {
                let em = item.email;
                console.log(em,txt)
                if (em == txt) {
                 console.log("EQUALITY")
                  return {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    email: item.email,
                    id: item.id
                  };
                }
              }
            });
            this.$store.state.apps.list = list;
    }
  },
  mounted: function() {
 
      this.getApps();
    

  },
  components: {
    applicationslist
  }
};
</script>

<style scoped>
#app-wrapper {
  width: 100%;
}
</style>