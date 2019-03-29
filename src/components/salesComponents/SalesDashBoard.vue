
<template>
  <div>
    <div id="page-wrapper">
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

        <div v-if="root==undefined">

          <div class="row">
            <NewAffiliateform/>
            <!-- <Createlead/> -->
             <taskSideBar></taskSideBar> 
          </div>

          <div class="row">
            <applicantbox/>
            <!-- <affiliateBoxcomponent/>
            <crmclientbox></crmclientbox> -->
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
    <script src="/public/assets/js/jquery.slimscroll.js"></script>

<script>
import NewAffiliateform from "../salesComponents/NewAffiliateform";
import NewLeadForm from "../crmComponents/NewLeadForm";
import Createlead from "./createlead";
import AffiliateRegistration from "../salesComponents/AffiliateRegistration";
import UserInformation from "../layoutComponents/UserInformation";
import taskSideBar from "../layoutComponents/taskSideBar";
import applicantbox from "../salesComponents/applicantbox";
import affiliateBoxcomponent from "../salesComponents/affiliateboxcomponent";

import crm from "../crmComponents/crmComponent";
import crmComponent from "../crmComponents/crmComponent";
import crmclientbox from '../salesComponents/crmclientbox'
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "SalesDashBoard",
  data: {
    return() {
      options: {
        height: "490px";
      }
    }
  },
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
    console.log(this.$refs.testcrm);

    // this.$refs.slimtest1.style.color = '#6c95d2';
    // this.$refs.slimtest1.style.size = '10px';
    // this.$refs.slimtest1.style.height = '#490px';
    // this.$refs.slimtest1.style.alwaysVisible = true;
  },
  components: {
    NewAffiliateform,
    AffiliateRegistration,
    UserInformation,
    crm,
    crmComponent,
    Createlead,
    NewLeadForm,
    taskSideBar,
    crmclientbox,
    applicantbox,
    affiliateBoxcomponent
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      console.log(this);
      this.$refs.crm.view = "ListView";
    },
    showMyDiv() {},
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