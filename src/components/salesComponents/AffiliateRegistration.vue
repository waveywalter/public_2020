<template>
  <div class="white-box ml-5 max50 flexor">
    <div v-if="this.$root._route.params.root=='applicant'">
      <div class="thumbs">
        <h3>
          Application
          <span v-if="capproved==1">
            Approved
            <i class="ti-thumb-up"></i>
          </span>
          <span v-if="capproved==0">
            Not Approved
            <i class="ti-thumb-down"></i>
          </span>
          <button
            class="btn waves-effect waves-light btn-success"
            v-on:click="approveApp('1')"
            v-if="check()==1"
          >Approve Application</button>
          <button
            class="btn waves-effect waves-light btn-danger"
            v-on:click="approveApp('0')"
            v-if="capproved==1"
          >Dissapprove Application</button>
        </h3>
      </div>

      <div>
        <ul class="nav nav-pills m-t-30 m-b-30" role="tablist">
          <li class="nav-item" v-for="(title,m) in sections">
            <a
              :href="'#'+title.split(' ')[0].substring(0,6)"
              v-bind:class="{active:isActive(m)}"
              class="nav-link"
              data-toggle="tab"
              aria-expanded="true"
            >{{title}}</a>
          </li>
        </ul>

        <div class="tab-content br-n pn">
          <div id="Profil" class="tab-pane active">
            <div class="row">
              <div class="col-md-12">
                <div class>
                  <div class="profile-details">
                    <div>
                      <span class>Name</span>
                      <span>{{cname}}</span>
                    </div>
                    <div>
                      <span class>Email</span>
                      <span>{{cemail}}</span>
                    </div>
                    <div>
                      <span class>Phone</span>
                      <span>{{cphone}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="Signed" class="tab-pane">
            <div class="vtabs">
              <ul class="nav nav-tabs tabs-vertical" role="tablist">
                
              </ul>

              <div class="tab-content">
                <div
                  class="tab-pane"
                  v-bind:class="{active:isActive(n)}"
                  :id="''+docs[0].split(' ')[0]"
                  role="tabpanel"
                  v-for="(docs,n) in signature"
                >
                  <div class="p-20">
                    <div v-if="false">Waiting for document to be signed. Add resend email button.</div>
                    <iframe
                      v-if="iframeShow(n)"
                      name="esignatures-io-iframe"
                      width="100%"
                      height="600"
                      :src="sign(n+1)"
                    />
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
import axiosApi from "axios";
import $ from "jquery";
import applicationslist from "./applicationslist";
import affiliatelist from "./affiliatelist";
import imageupload from "../layoutComponents/imageUpload";
import affiliateApplication from "../affiliateComponents/affiliateApplication";
import { mapState, mapActions } from "vuex";
//import AffiliateRegView from '../salesComponents/jottComponents/v5/pages/AffiliateRegView.vue';

export default {
  data() {
    return {
    signature: [["Admission Agreement", 1, 0]],
      list: [],
      appfilter: "",

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
    capproved: {
      get: function(e) {

        if (!this.$store.state.apps.application.approved) {
          this.capproved = "0";
        } else if (
          this.$store.state.apps.application.approved == 1 ||
          this.$store.state.apps.application.approved == "1"
        ) {
          this.capproved = "1";
        } else {
          this.capproved = "0";
        }
        return this.$store.state.apps.application.approved;
      },
      set: function(e) {
    
        if (!e) {
          e = "0";
        } else if (e == 1 || e == "1") {
          e = "1";
        } else {
          e = "0";
        }
        
        this.$store.state.apps.application.approved = e;
        return "Set Resume";
      }
    },
    cphone: {
      get: function(e) {

        return this.$store.state.apps.application.phone;
      },
      set: function(e) {

        this.$store.state.apps.application.phone = e;
        return "Set Email";
      }
    },
    cname: {
      get: function(e) {
        return (
          this.$store.state.apps.application.firstname +
          " " +
          this.$store.state.apps.application.lastname
        );
      },
      set: function(e) {
        this.$store.state.apps.application.name = e;
        return "Set Email";
      }
    },
    cemail: {
      get: function() {
   
        return this.$store.state.apps.application.email;
      },
      set: function(e) {

        this.$store.state.apps.application.email = e;
        return "Set Email";
      }
    },
  
  },

  methods: {
    check() {
      // if all things satisfied return true else tretun false
      if (this.capproved == 0) {
        return true;
      }
      return false;
    },
    iframeShow(n) {
      let l = n + 1;
      let r = "s" + l;

      return true;
    },
    isActive(boo) {
      if (boo < 1) {
        return true;
      }
      return false;
    },
    sign(n) {
      let link = "csign" + n;
      return this[link];
    },
    approveApp(boo) {
      console.log("HIT API and APPROVE APPLICATION");
      let st = this.$store.state.apps.application;
      st.approved = boo;

      let d = Object.entries(st);
      let e = d.map(datar => {
        //console.log(datar)
        if (datar[1] == null) {
          if (datar[0] == "links" || datar[0] == "contacts") {
            this.$store.state.apps.application[datar[0]] = [];
            return [];
          } else {
            this.$store.state.apps.application[datar[0]] = "";
            return "";
          }
        }
        return datar[1];
      });
      console.log(this.cs1, st.approved);
      if (st.approved == true) {
        let req = {};
        req.approved = "1";
        req.email = this.cemail;
        req.firstname = this.cname.split(" ")[0];
        req.lastname = this.cname.split(" ")[1];
        req.password = "2020affiliate";
        req.username = "affiliate" + req.firstname;
        req.role = "affiliate";
        console.log("SIGNEDDDDDDDDDDDDDDD");
        fetch(
          "/api/applications/approve/" + this.$store.state.apps.application.id,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(st)
          }
        );
      } else {
        fetch(
          "/api/applications/disapprove/" +
            this.$store.state.apps.application.id,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(st)
          }
        );
      }
    },
    checkContractStatus() {

      let i = this.$store.state.apps.application.id;
      fetch("/api/applications/" + i).then(response => {
        console.log(response);
        response.text().then(text => {
          let a = JSON.parse(text);

          let s = "s1";
          let t = a[s];
          console.log(this.$store.state.apps.application[s]);
          console.log(a[s]);
          this.$store.state.apps.application;

          if (a[s] != this.$store.state.apps.application[s]) {
            clearInterval(this.clock);
            //if they are not equal then document has been signed .

            this.$store.state.apps.application = a;
          }
        });
      });
    },
  },
  mounted: function() {
  
    let id;
    id = this.$route.params.id;
    let vp = this;
 

    if (id != undefined) {
      fetch("https://2020i.site/api/applications/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.$store.state.apps.application = json;

          if (this.$store.state.apps.application.s1 == 0) {
            this.clock = setInterval(this.checkContractStatus, 7000);
          }
          //this.$state.store = json;
          // this.$store.replaceState(json)
        });
    }
  },

  name: "AffiliateRegistration",
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