<template>
  <div class="col-md-4">
    <div class="white-box">
      <h3 class="box-title">Current Affiliates</h3>
      <div class>
        <div class="ml-5">
          <v-layout column justify-center align-center></v-layout>
          <v-container id="scroll-target" style="max-height: 300px" class="scroll-y">
            <v-layout column align-center justify-center style="height: 900px">
              <div id="app-wrapper" >
                <div>
                  <div class>
                    <div class="row">
                      <div class="col-xl-12">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Filter Affiliates</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Email Address"
                          >
                        </div>
                      </div>
                    </div>
                    <h4 class="card-title">Affiliates</h4>
                    <affiliatelist></affiliatelist>
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
import affiliatelist from "./affiliatelist";

export default {
  name: "Affiliatebox",
  data() {
    return {};
  },
  components: {
    affiliatelist, 
  }
};
</script>

<style scoped>
#app-wrapper {
  width: 100%;
}
</style>