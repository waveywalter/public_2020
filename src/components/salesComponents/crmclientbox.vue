<template>
  <div class="col-md-4">
    <div class="white-box">
      <h3 class="box-title">Client List</h3>
      <div class="row">
        <div class="col-md-4">
          <div class="icons pt-4">
            <i class="icon-people text-info"></i>
            <h1 class="text-warning pt-5">{{count}}</h1>
          </div>
        </div>

        <div class="col-md-8">



          
    <v-layout column justify-center align-center>
    </v-layout>
    <v-container
      id="scroll-target"
      style="max-height: 300px"
      class="scroll-y"
    >
      <v-layout
        v-scroll:#scroll-target="onScroll"
        column
      >


            <div v-for="lead in regexLead(leads)" :key="lead.id">
              <router-link
                class="list-group-item"
                :key="lead.id"
                tag="li"
                :to="'/sales/crm/'+lead.id"
                @click.native
              >
                <div class="btn btn-default btn-outline showbottom mt-2 card-body .mr15">
                  <a class="card-title">{{lead.first_name}} {{lead.last_name}}</a>
                </div>
              </router-link>
            </div>



      </v-layout>
    </v-container>



        </div>
      </div>
    </div>
  </div>
</template>

<style scroped>


div::-webkit-scrollbar {
    width: 0.6em;
}
 
div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.075);
}
 
div::-webkit-scrollbar-thumb {
  background-color: red;
  border-radius: 10%;
}


.mr15 {
  margin-right: 15px;
  text-align: left;
  width: 100%;
}
.icon-people {
  font-size: 100px;
}
.text-warning {
  font-size: 72px;
}
.ps {
  position: relative;
  height: 300px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "crmclientbox",
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
      },
      search: "",
      view: "ListView",
      vlead: {},
      title: ""
    };
  },
  mounted() {
    this.opentab();
    let filter = {};
    filter.name = null;
    console.log(filter);
    this.getLeads(filter);
  },

  methods: {
    ...mapActions("leads", ["getLeads"]),
    init() {
      window.onload = function() {
        var startPos;
        var geoSuccess = function(position) {
          startPos = position;
        };
        var geoError = function(error) {
          console.log("Error occurred. Error code: " + error.code);
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
    },
    regexLead(leads) {
      console.log(leads.leads);
      let r = leads.leads.filter(lead => {
        console.log(lead);
        if (lead.first_name) return lead.first_name.includes(this.search);

        if (lead.firstname) return lead.firstname.includes(this.search);
      });
      if (r.length > 0) {
        return r;
      } else {
        r = leads.leads.filter(lead => {
          console.log(lead);
          if (lead.last_name) return lead.last_name.includes(this.search);

          if (lead.lastname) return lead.lastname.includes(this.search);
        });
      }
      return r;
    }
  }
};
</script>

