<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">Human Resources DashBoard</h4>
          </div>

<NewHrBox></NewHrBox>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "../layoutComponents/TopHeader";
import HrSideBar from "./HrSideBar";
import NewHrBox from "./newhrbox"
import Vue from "vue";

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
    TopHeader,
    HrSideBar,
    NewHrBox
  }
};
</script>
<style scoped>
</style>