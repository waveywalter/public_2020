
<template>
  <div>
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
              <div class="wrapper">
                <div class="affiliateBox white-box">
                  <NewAffiliateform/>
                </div>
                <div class="leadBox white-box">
                  <Createlead/>
                </div>
                <div class="taskBox white-box">
                  <taskSideBar/>
                </div>
                <div class="registrationBox fill-content">
                  <AffiliateRegistration v-if="root==undefined"></AffiliateRegistration>
                  <crm ref="crm" v-if="root=='crm'"></crm>
                </div>
                <div class="crmBox white-box">
                  <div class>
                    <div class="col-in row">
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <i data-icon="E" class="linea-icon linea-basic"></i>
                        <h5 class="text-muted vb">MY NEW CLIENTS</h5>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <h3 class="counter text-right m-t-15 text-danger">{{count}}</h3>
                      </div>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="progress">
                          <div
                            class="progress-bar progress-bar-danger"
                            role="progressbar"
                            aria-valuenow="40"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 40%"
                          >
                            <span class="sr-only">40% Complete (success)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
import Createlead from "./createlead";
import AffiliateRegistration from "../salesComponents/AffiliateRegistration";
import UserInformation from "../layoutComponents/UserInformation";
import taskSideBar from "../layoutComponents/taskSideBar";
import crm from "../crmComponents/crmComponent";
import crmComponent from "../crmComponents/crmComponent";
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
    },
    ...mapState({
      leads: state => state.leads,
      notes: state => state.leads.notes,
      emails: state => state.leads.emails
    }),
    count: function() {
      return this.leads.leads.length;
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
    crmComponent,
    Createlead,
    NewLeadForm,
    taskSideBar
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
#page-wrapper {
  position: inherit;
  margin: 220 0px 0 220px;
}
#flexor,
.flexible {
  display: flex;
}
.col-md-6.col-lg-4.col-sm-12 {
  flex: 1 1 100%;
}
.dw {
  display: flex;
}
.fill-content {
  width: -webkit-fill-available;
}
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto auto auto;
  grid-auto-rows: auto 200px;
}

.box {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
}

.crmBox {
  grid-column: 1 / 3;
  grid-row: 2;
  grid-auto-rows: 10%;
}
.registrationBox {
  grid-column: 3;
  grid-row: 1 / 3;
}
.affiliateBox {
  grid-column: 1;
  grid-row: 1;
}
.leadBox {
  grid-column: 2;
  grid-row: 1;
}
.taskBox {
  grid-column: 4;
  grid-row: 1 / 3;
}
button.btn.btn-default {
  margin-left: 13px;
}
</style>