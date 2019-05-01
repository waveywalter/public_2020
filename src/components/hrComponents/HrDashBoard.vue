<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">Human Resources DashBoard</h4>
          </div>

<NewHrBox></NewHrBox>
<HrNewPosition></HrNewPosition>
<NewEmployee></NewEmployee>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewHrBox from "./newhrbox"
import Vue from "vue";
import HrNewPosition from "./HrNewPosition";
import NewEmployee from "./NewEmployee"

export default {
  name: "HrDashBoard",
  data() {
    return {
      currentTab: {
        tabname: ""
      }
    };
  },
  mounted() {
    this.opentab();
  },
  methods: {
    opentab() {
      var url = window.location.href.split("#");
      var ctab = url[1] ? url[1] : "hrcreateform";
      Vue.set(this.currentTab, "tabname", ctab);
    }
  },
  components: {
    NewHrBox,
    HrNewPosition,
    NewEmployee
  }
};
</script>
<style scoped>
</style>