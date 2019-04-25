<template>
  <div class="col-md-4">
    <div class="white-box">
    <h3 class="box-title">Current Affiliates</h3>
       <div class="">
        <div class="ml-5 ">
          

    <v-layout column justify-center align-center>
    </v-layout>
    <v-container
      id="scroll-target"
      style="max-height: 300px"
      class="scroll-y"
    >
      <v-layout
        
        column
        align-center
        justify-center
        style="height: 900px"
      >

            <div id="app-wrapper" :key="listkey" >
              <div>
                <div class="">
                  <div class="row">
                    <div class="col-xl-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Filter Affiliates</label>
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
import axiosApi from "axios";
import $ from "jquery";
import applicationslist from "./applicationslist";
import affiliatelist from "./affiliatelist";
import imageupload from "../layoutComponents/imageUpload";
import affiliateApplication from "../affiliateComponents/affiliateApplication";


//import AffiliateRegView from '../salesComponents/jottComponents/v5/pages/AffiliateRegView.vue';

export default {
      name: "Affiliatebox",

  data() {
    return {
      //  signature:[["Accident Reporting Procedure",1,1],['Authorization-Background Screening',1,0],['CDCFactSheet VaccineInfoSign Sheet',1,0],
      //      ['Confidentiality Statement-Contractor',1,0],['Part-Time-PerDiemStaffOrientationPacket',1,0],
      //      ['Profl Code of Ethics & Standards of Conduct',1,0],['Sexual Harrassment Policy- Contractors',1,0],['TB Status Review',1,0],['Admission Agreement',1,0]],
      signature: [["Admission Agreement", 1, 0]],
      list: [],
      appfilter: "",
      //sections:["Profile Details","Signed Documents","Uploaded Documents","Emergency Contacts"],
      //sections:["Profile Details","Signed Documents","Uploaded Documents"],
      sections: ["Profile Details", "Signed Documents"],
      upload: [
        ["Resume", 0, 2],
        ["License", 0, 0],
        ["Liability", 0, 0],
        ["CES", 0, 0]
      ],
      listkey: 0
      //  test:'My Life'
    };
  },
  props: ["afid"],
  computed: {
   
  },

  methods: {

    filterApp(txt) {
      
      if (txt != "") {
        fetch("https://2020i.site/api/applications?filter[offset]=0&filter[limit]=10&filter[skip]=0&filter[where][approved]=1")
          .then(response => response.json())
          .then(json => {
            

            // this.$store.state.app.application.list =[];
            let list = json.filter(item => {
              
              if (item) {
                let em = item.email;
                if (em == txt) {
                 
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
            
          });
      } else {
        
        fetch("https://2020i.site/api/applications?filter[offset]=0&filter[limit]=10&filter[skip]=0&filter[where][approved]=1")
          .then(response => response.json())
          .then(json => {
        

            // this.$store.state.app.application.list =[];
            let list = json;
            this.cfilterlist = list;
          
          });
      }
    },
    getApps() {
      this.$store.commit("apps/getApps");
    },
   
  },
  mounted: function() {
 

    let id;

    id = this.$route.params.id;
    this.$store.state.id = this.$route.params.id;

    let vp = this;
  
    //if(this.$store.state.apps.application.role=="admin"){
    if (true) {
      this.getApps();
    }

    if (id != undefined) {
      fetch("https://2020i.site/api/applications/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
        .then(response => response.json())
        .then(json => {
          
          this.$store.state.apps.application = json;

          if (this.$store.state.apps.application.s1 == 0) {
            this.clock = setInterval(this.checkContractStatus, 7000);
          }
          //this.$state.store = json;
          // this.$store.replaceState(json)
        });
    }
  },

  components: {
    applicationslist,
    affiliatelist,
    affiliateApplication
  }
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.last = function() {
  return this[this.length - 1];
};
</script>
<style scoped>



.apps .list-group-item {
  display: flex;
  justify-content: space-between;
}
.apps i {
  cursor: pointer;
}
.list-group-item {
  border: 0px !important;
}
.list-group-item.router-link-active,
.list-group .list-group-item.router-link-active:hover {
  background: #fb9678;
  border-color: #fb9678;
}
.btn-link,
a {
  color: #ffffff;
  text-decoration: none;
}
.list-group-item:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.ti-check:before {
  content: "\e64c";
  color: #00c292;
  vertical-align: middle;
  margin-left: 5px;
  border: thin solid;
  border-radius: 10px;
}
#Signed .tab-content {
  background-color: white;
}
li {
  list-style: none;
}
.vtabs .tab-content {
  width: 100%;
}
#Signed .nav-tabs > li,
#Upload .nav-tabs > li {
  float: none;
  margin-bottom: -1px;
}
img {
  max-width: 100%;
}
.down {
  flex-direction: column;
}
.layout.wrap {
  justify-content: space-between;
}
.thumbs {
  padding: 10px;
}
iframe {
  border: none;
  min-width: 600px;
}
.contract_holder {
  padding: 20px;
  background-color: white;
  text-align: center;
}
.contract_holder h3 {
  color: #303030;
  margin-bottom: 11px;
}
.marginb50 {
  margin-bottom: 50px;
}
.margint30 {
  margin-top: 30px;
}
.nametag {
  width: 300px;
  flex: none;
  padding: 0;
}
.flexline {
  display: flex;
}
.indent .v-text-field input {
  padding: 0;
  padding-left: 15px;
}
[d-none] {
  display: none;
}
.layout.display-1.row.wrap.text-md-left > div {
  padding: 0 16px;
}
.basic .layout {
  padding: 31px 45px 0px;
}
.basic .layout > .flex.xs6 {
  padding: 0 70px;
}
.uploads .v-btn {
  margin: 0 8px;
}
.uploads .container {
  padding: 8px;
}
.uploads .flex {
  padding: 0px;
}
.uploads i.i.i--right.material-icons.theme--dark {
  margin-left: 16px;
}
.display-1 {
  font-size: 23px;
}
.meter > div * {
}
.meter > div {
  display: flex;
}
/*.meter > div > span {
    flex-basis: 100px;;
}
.max50{min-width:50vw;max-width:60vw;}
.max6{flex-basis:1000px} */
.profile-details {
  margin: 0px 15px;
}
.profile-details > div {
  padding: 10px 0;
  display: flex;
}
.white {
  color: white;
}
.profile-details > div > span {
  flex-basis: 200px;
}
.profile-details > div > span:first-child {
  flex-basis: 75px;
}
.flexor {
  display: flex;
  width: 45vw;
}
.flexor > div:first-child {
  margin-right: 20px;
}
.flexor > div:nth-child(2) {
  width: 30%;
  max-width: 250px;
}
.meter > div {
  margin-bottom: 15px;
}
.vtabs .tabs-vertical {
  width: 150px;
  border-bottom: 0px;
  border-right: 1px solid #4f5467;
  display: table-cell;
  vertical-align: top;
}
#app-wrapper {
  width: 100%;
}
</style>