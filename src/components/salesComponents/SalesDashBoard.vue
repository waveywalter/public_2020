<style scoped>
.col-md-6.col-lg-4.col-sm-12 {
  flex: 1 1 100%;
}
#flexor,
.flexible {
  display: flex;
}
button.btn.btn-default {
  margin-left: 13px;
}
.fill-content {
  width: -webkit-fill-available;
}
</style>
<template>
  <div>
    <!-- <div id="page-wrapper">
            <div id="flexor">
            <NewAffiliateform></NewAffiliateform>
            <AffiliateRegistration></AffiliateRegistration>
            </div>
    </div>-->
    <div id="page-wrapper">
      <div>
        <div class="container-fluid">
          <div class="col-lg">
            <div class="row bg-title">
              <div class="flexible">
                <h4 class="page-title">Sales DashBoard</h4>
                <button v-if="needed" class="btn btn-default" v-on:click="goBack()">
                  <i class="ti-arrow-left">Back</i>
                </button>
              </div>
            </div>
          </div>
          <div class="flexible">
            <div class="dw" v-if="root==undefined">
              <div class="mx-3 white-box">
                  <NewAffiliateform/>
              </div>
              <div class="white-box">
                  <Createlead/>
              </div>
              <div class="fill-content">
                <AffiliateRegistration v-if="root==undefined"></AffiliateRegistration>
                <crm ref="crm" v-if="root=='crm'"></crm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewAffiliateform from "../salesComponents/NewAffiliateform";
import NewLeadForm from "../crmComponents/NewLeadForm";
import Createlead from './createlead'
import AffiliateRegistration from "../salesComponents/AffiliateRegistration";
import UserInformation from "../layoutComponents/UserInformation";
import crm from "../crmComponents/crmComponent";
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "SalesDashBoard",
  created() {
    this.init();
  },
  computed: {
    needed: function() {
      if (this.id) {
        return true;
      }
      return false;
    },
    id: function() {
      return this.$root._route.params.id;
    }
  },
  data() {
    return {
      root: this.$root._route.params.root,

      components: ["NewAffiliateform", "NewLeadForm"],
      currentTab: {
        tabname: "NewLeadForm"
      }
    };
  },
  mounted() {
    this.opentab();
    let filter = {};
    filter.name = null;
    console.log(filter);
    this.getLeads(filter);
  },
  components: {
    NewAffiliateform,
    AffiliateRegistration,
    UserInformation,
    crm,
    Createlead,
    NewLeadForm
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      console.log(this);
      this.$refs.crm.view = "ListView";
    },
    ...mapActions("leads", ["getLeads"]),
    init() {
      window.onload = function() {
        var startPos;
        var geoSuccess = function(position) {
          startPos = position;
          //  document.getElementById('startLat').innerHTML = startPos.coords.latitude;
          //  document.getElementById('startLon').innerHTML = startPos.coords.longitude;
        };
        var geoError = function(error) {
          console.log("Error occurred. Error code: " + error.code);
          // error.code can be:
          //   0: unknown error
          //   1: permission denied
          //   2: position unavailable (error response from location provider)
          //   3: timed out
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
      };
    },
    filterApp() {
      console.log("filterApp");
    },
    opentab() {
      var url = window.location.href.split("#");
      var ctab = url[1] ? url[1] : "NewAffiliateform";
      Vue.set(this.currentTab, "tabname", ctab);
    }
  }
};
</script>
<style scoped>
.flexor {
  display: flex;
}
.dw{
    display:flex;
}
</style>