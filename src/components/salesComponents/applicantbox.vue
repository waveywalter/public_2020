<template
>
  <div class="col-md-4">
    <div class="white-box">
      <h3 class="box-title">Current Applicants</h3>
      <div class>
        <div class="ml-5">
          <v-container id="scroll-target" style="max-height: 300px" class="scroll-y">
            <v-layout column style="height: 900px">
              <div id="app-wrapper">
                <div>
                  <div class>
                    <div class="row">
                      <div class="col-xl-12">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Filter Applications</label>
                          <input
                            type="text"
                            v-model="appfilter"
                            v-on:blur="filterApp(appfilter)"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Email Address"
                          >
                        </div>
                        <h4 class="card-title">Applications</h4>
                        <applicationslist></applicationslist>
                      </div>
                    </div>
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
import applicationslist from "./applicationslist";
import { mapState, mapActions } from "vuex";

export default {
  name: "applicantbox",

  data() {
    return {
      appfilter: ""
    };
  },

  computed: {
    list: function() {
      return this.$store.state.apps.list;
    }
  },

  methods: {
    ...mapActions("apps", ["getApps"]),
    filterApp(txt) {
      let list = this.list.filter(item => {
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
      if (list.length == 0) {
        this.$store.state.apps.list = this.$store.state.apps.wholelist;
      } else {
        this.$store.state.apps.list = list;
      }
    }
  },
  components: {
    applicationslist
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
  /* margin-bottom: 15px; */
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