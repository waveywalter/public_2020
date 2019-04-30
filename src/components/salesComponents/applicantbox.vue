<template>
  <div class="col-md-4">
    <div class="white-box">
      <h3 class="box-title">Current Applicants</h3>
      <div class>
        <div class="ml-5">
          <v-container id="scroll-target" style="max-height: 300px" class="scroll-y">
            <v-layout column style="height: 900px">
              <div id="app-wrapper">
                <div>
                  <div class>
                    <div class="row">
                      <div class="col-xl-12">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Filter Applications</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Email Address"
                          >
                        </div>
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

export default {
  name: "applicantbox",
  data() {
    return {};
  },
  methods: {
    getApps() {
      this.$store.commit("apps/getApps");
    },
    appsubmitted() {
      this.getApps();
    }
  },
  mounted: function() {
    //if(this.$store.state.apps.application.role=="admin"){
    if (true) {
      this.getApps();
    }
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