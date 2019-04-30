<style>
.card {
  background-color: transparent;
  border: none;
}
.tab-content {
  width: 80%;
}
.list {
  display: grid;
}
.formlist {
  width: 25%;
}
.lfloat {
  display: flex;
}
.highlight {
  background: #03a9f3 !important;
}
.tab-content,
.video {
  display: inline-block;
  vertical-align: top;
}
.nav-item {
  width: 25%;
}
.wizard-steps {
  display: flex;
}
</style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <div v-if="superComplete && role=='affiliate'">
        <v-btn>Awaiting Final Approval</v-btn>
      </div>
      <div v-if="superComplete && role=='sales'">
        <v-btn>Approve & Send to HR</v-btn>
      </div>
      <div class="container-fluid">
        <div id="exampleBasic" class="wizard">
          <ul class="wizard-steps" role="tablist">
            <li
              class="nav-item col-sm-2"
              v-if="$store.state.apps.currentStep>0"
              @click="selected = 1"
              :class="{highlight:selected >= 1}"
            >
              <a class="nav-link" data-toggle="tab" href="#home4" role="tab" aria-selected="true">
                <h4>
                  <span>1</span>Complete Basic Information
                </h4>
              </a>
            </li>
            <li
              class="nav-item col-sm-2"
              v-if="$store.state.apps.currentStep>1"
              ref="second"
              @click="selected = 2"
              :class="{highlight:selected >= 2}"
            >
              <a
                class="nav-link"
                data-toggle="tab"
                href="#practice4"
                role="tab"
                aria-selected="false"
              >
                <h4>
                  <span>2</span>Practice Location
                </h4>
              </a>
            </li>
            <li
              class="nav-item col-sm-2"
              v-if="$store.state.apps.currentStep>2"
              @click="selected = 3"
              :class="{highlight:selected >= 3}"
            >
              <a
                class="nav-link"
                data-toggle="tab"
                href="#profile4"
                role="tab"
                aria-selected="false"
              >
                <span class="hidden-sm-up">
                  <i class="ti-user"></i>
                </span>
                <h4>
                  <span>3</span>Sign Forms
                </h4>
              </a>
            </li>
            <li
              class="nav-item col-sm-2"
              v-if="$store.state.apps.currentStep>3"
              @click="selected = 4"
              :class="{highlight:selected >= 4}"
            >
              <a
                class="nav-link"
                data-toggle="tab"
                href="#messages4"
                role="tab"
                aria-selected="false"
              >
                <span class="hidden-sm-up">
                  <i class="ti-email"></i>
                </span>
                <h4>
                  <span>4</span>Upload Documents
                </h4>
              </a>
            </li>
            <li
              class="nav-item col-sm-2"
              v-if="$store.state.apps.currentStep>4"
              @click="selected = 5"
              :class="{highlight:selected >= 5}"
            >
              <a
                class="nav-link"
                data-toggle="tab"
                href="#messages5"
                role="tab"
                aria-selected="false"
              >
                <span class="hidden-sm-up">
                  <i class="ti-email"></i>
                </span>
                <h4>
                  <span>5</span>Approval Stage
                </h4>
              </a>
            </li>
          </ul>
        </div>

        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane" v-bind:class="{'active': selected==1 }" id="home4" role="tabpanel">
            <affiliateformfields :user="user" :afid="afid" ref="af"></affiliateformfields>
          </div>
          <div
            class="tab-pane"
            id="practice4"
            role="tabpanel"
            v-bind:class="{'active': selected==2 }"
          >
            <practicefields ref="address"></practicefields>
          </div>

          <div
            class="tab-pane p-20"
            v-bind:class="{'active': selected==3 }"
            id="profile4"
            role="tabpanel"
          >
            {{complete}}
            <div class="lfloat">
              <div v-if="role=='sales' || role=='humanResource'" class="formlist list-group">
                <div v-for="(form,index) in forms_list">
                  <router-link
                    :to="'/sales/affiliate/'+afid+'/forms/'+form.id"
                    :key="'fskl'+index"
                    v-if="form.status!='signed' "
                  >
                    <a
                      class="list-group-item"
                      style="margin-right:10px"
                      v-on:click="formloader(form.id)"
                      :value="form.id"
                    >{{form.FormTitle}}</a>
                  </router-link>
                </div>
              </div>

              <div v-if="role=='affiliate'" class="formlist">
                <div v-for="(form,index) in forms_list">
                  <router-link :to="'/affiliate/forms/'+form.id" :key="index">
                    <a
                      class="list-group-item"
                      style="margin-right:10px"
                      v-on:click="formloader(form.id)"
                      :value="form.id"
                    >{{form.FormTitle}}</a>
                  </router-link>
                </div>
              </div>
              <div>
                <h3>Form Description/Details/Usage</h3>

                <viewer :user="user" :fid="fid" :phtml="thtml"></viewer>
              </div>
            </div>
          </div>
          <div
            class="white-box tab-pane p-20"
            id="messages4"
            role="tabpanel"
            v-bind:class="{'active': selected==4 }"
          >
            <uploader :afid="afid"></uploader>
          </div>
          <div
            class="white-box tab-pane p-20"
            id="messages5"
            role="tabpanel"
            v-bind:class="{'active': selected==5 }"
          >
            <v-list subheader two-line dark>
              <v-subheader>Approval Process</v-subheader>
              <v-list-tile @click>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications" value="stage_1" disabled checked></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click>
                  <v-list-tile-title>License Reviewed</v-list-tile-title>
                  <v-list-tile-sub-title>License reviewed and verfied.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications" value="stage_2"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click>
                  <v-list-tile-title>Signed Forms Approved</v-list-tile-title>
                  <v-list-tile-sub-title>All digitally signed forms have been reviewed and approved.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications" value="stage_3"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click>
                  <v-list-tile-title>Background Check</v-list-tile-title>
                  <v-list-tile-sub-title>AHCA approved background check run and passed.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications" value="stage_4"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click>
                  <v-list-tile-title>Final Phone Meeting</v-list-tile-title>
                  <v-list-tile-sub-title>After approval process a phone call is scheduled with facility coordinator.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
        </div>

        <div class="video">
          <iframe
            width="280"
            height="158"
            :src="vsource"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import viewer from '../formViewerComponents/formViewer'
import affiliateformfields from '../affiliateComponents/affiliateformfields';
import practicefields from '../affiliateComponents/practicefields';
import forms from '../affiliateComponents/forms';
import uploader from '../affiliateComponents/uploads';
import { authHeader } from '../../_helpers';
import { mapState, mapActions } from "vuex";
export default{
    name:"HraffiliateApplication",
    props:["affiliateId"],
 mounted() {
    this.getforms({ filter: "affiliate" });
    this.getFormsHtml();
    if (this.$store.state.account.user.user.role == "sales") {
      this.getUserForms(this.afid);
    }
    let urlstring = this.$route.path;
    if (urlstring.indexOf("forms") >= 0) this.formtab = true;
  },
  created() {
    if (this.$store.state.account.user.user.role == "sales") {
      this.getAllUsers({ role: "affiliate" });
    }
  },
  watch: {
    html(newValue, oldValue) {
      if (this.$root._route.params.fid) {
        this.formloader(this.$root._route.params.fid);
      }
    }
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    }),
    ...mapActions("form", [
      "getformbyid",
      "updateform",
      "getforms",
      "deleteform",
      "attachUserToForm",
      "getUserForms"
    ]),
    formloader(e) {
      this.$store.state.account.formid = e;
      this.$store.state.users.current = this.user;

      this.$store.state.form.current_signed_form = e;
      let g = this.$store.state.form.userForms.filter(form => form.formId == e);

      if (g.length > 0) {
        this.$store.state.form.signed_form = this.$store.state.form.userForms.filter(
          form => form.formId == e
        )[0].id;
      }
      let rootform = this.$store.state.apps.currentAffiliate.forms; //.filter(form=>{return form.formId==e})
      this.$store.state.form.current_signed_form = rootform[0].id;
      this.getFormHtml(e);
    },
    getFormHtml(id) {
      let currentf = this.forms_list.filter(form => {
        return form.id == id;
      });
      this.formDisplay = true;
      this.thtml = currentf;
      //                    return currentf
      return "<div>Help</div>";
    },
    async getFormsHtml() {
      //forms users already signed
      let sfs = this.$store.state.account.user.user.signedforms;
      // forms user is supposed to sign
      let ssfs = this.$store.state.account.user.user.forms;
      this.$store.state.form.sfs = this.$store.state.form.userForms;
      if (this.$store.state.account.user.user.role == "sales") {
        ssfs = this.$store.state.form.userForms;
        this.$store.state.form.sfs = ssfs;
      }

      let fs = [];
      if (this.allforms) {
        fs = this.allforms;
      } else {
        fs = [];
      }
  
      let userforms = fs.filter(form => {
        return ssfs.filter(signedform => {
          return form.id === signedform.formId;
        })[0];
      });
      if (this.$store.state.account.user.user.role == "affiliate") {
        userforms = this.$store.state.account.user.user.forms;
      }

      this.html = userforms;
    },
    openFileDialog(type) {
      document.getElementById(type).click();
    }
  },
  computed: {
    currentAffiliate: {
      get: function() {
        if (this.$store.state.account.user.user.role == "affiliate") {
          return this.$store.state.account.user.user;
        }
        if (this.$store.state.account.user.user.role == "sales") {
          if (!this.users.loading) {
            this.$store.state.apps.currentAffiliate = this.users.items.filter(
              user => user.id == this.$root._route.params.id
            );
            return this.$store.state.apps.currentAffiliate;
          }
        }
      },
      set: function(v) {
        this.currentAffiliate = v;
      }
    },
    notifications: function() {
      return this.$store.state.apps.currentAffiliate.reviewed;
    },
    vsource: {
      get: function() {
        return "https://www.youtube.com/embed/47Uf9luX-co";
      },
      set: function() {}
    },
    complete: {
      get: function() {
        if (this.superComplete) {
          this.$store.state.apps.currentStep = 5;
          return true;
        }
        if (this.forms_list) {
          if (this.signed_forms_length >= this.forms_list.length) {
            this.$store.state.apps.currentStep = 4;
            return true;
          }
        }
        this.$store.state.apps.currentStep = 4;
        return true;
      },
      set: function() {}
    },
    signed_forms_length: {
      //get user forms and compare to signed forms
      get: function() {
        if (this.currentAffiliate) {
          let fl = [];
          if (this.forms_list != undefined) {
            fl = this.forms_list.map(form => {
              return form.id;
            });
          } else {
            fl = [];
          }

          let sf = this.$store.state.apps.currentAffiliate.signedforms;
          let total_match = sf.filter(sf => {
            return fl.includes(sf.formId);
          });
          return total_match.length;
        }
        return 0;
      },
      set: function(v) {
        this.signed_forms = v;
      }
    },
    ...mapState({
      account: state => state.account,
      users: state => state.users.all,
      allforms: state => state.form.allforms.items
    }),
    ...mapState("form", ["userForms"]),
    user: {
      get: function() {
        let user = [];
        if (this.$store.state.account.user.user.role == "sales") {
          if (!this.users.loading) {
            let u = this.users.items.filter(
              user => user.id == this.$root._route.params.id
            )[0];
            user.push(u);
          }
        } else {
          let u = this.$store.state.account.user.user;
          user.push(u);
        }

        return user;
      }
    },

    role: function() {
      return this.$store.state.account.user.user.role;
    },
    forms_list: {
      get: function() {
        if (this.$store.state.account.user.user.role == "sales") {
          if (!this.users.loading) {
            this.$store.state.apps.currentAffiliate = this.users.items.filter(
              user => user.id == this.$root._route.params.id
            )[0];
          }
        } else {
          this.$store.state.apps.currentAffiliate = this.$store.state.account.user.user;
        }
        return this.$store.state.apps.currentAffiliate.forms;
      },
      set: function(value) {
        this.forms_list = value;
      }
    }
  },
  data() {
    return {
      formDisplay: false,
      whattodo: "",
      fid: "",
      html: "",
      FormTitle: "",
      thtml: "",
      forms: "",
      formtab: false,
      selected: 1,
      superComplete: false,
      //  user:this.users,
      afid: this.$root._route.params.id
    };
  },
  components: {
    affiliateformfields,
    practicefields,
    forms,
    viewer,
    uploader
  }
};
</script>