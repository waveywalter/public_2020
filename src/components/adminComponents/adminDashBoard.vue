<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">Admin DashBoard</h4>
          </div>
        </div>
        <b-container class="bv-example-row">
          <b-row>
            <b-col class="col-lg-3">
              <div>
                <div class="white-box">
                  <CreateAdmin/>
                </div>
              </div>
            </b-col>
            <b-col class="col-lg-3">
              <div>
                <div class="white-box">
                  <tinymceditor/>
                </div>
              </div>
            </b-col>
            <b-col class="col-lg-3">
              <div>
                <div class="white-box">
                  <adminforms/>
                </div>
              </div>
            </b-col>
            <b-col class="col-lg-3">
              <div>
                <div class="white-box">
                  <assignform/>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import UserInformation from "../layoutComponents/UserInformation";
import CreateAdmin from "../adminComponents/createAdmin";
import tinymceditor from "../layoutComponents/tinymceEditor";
import adminforms from '../adminComponents/adminForms'
import assignform from '../adminComponents/assigncomponent'
import Vue from "vue";

export default {
  name: "adminDashBoard",
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
      var ctab = url[1] ? url[1] : "CreateAdmin";
      Vue.set(this.currentTab, "tabname", ctab);
    }
  },
  components: {
    CreateAdmin,
    UserInformation,
    CreateAdmin,
    tinymceditor,
    adminforms,
    assignform
  }
};
</script>