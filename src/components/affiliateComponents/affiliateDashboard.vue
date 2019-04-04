<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">Affiliate Dashboard</h4>
          </div>
        </div>
        <div class>
          <div class="white-box">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Affiliate Application</h4>
                <affiliateApplication :affiliateId="this.$store.state.account.user.user.id"></affiliateApplication>
                <!-- Nav tabs -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from "../layoutComponents/TopHeader";
import SideBar from "../layoutComponents/SideBar";
import viewer from "../formViewerComponents/formViewer";
import affiliateformfields from "./affiliateformfields";
import affiliateApplication from "./affiliateApplication";
import practicefields from "./practicefields";
import forms from "./forms.vue";
import uploader from "./uploads";
import { authHeader } from "../../_helpers";
import { mapState, mapActions } from "vuex";
export default {
  name: "AffiliateDashboard",
  mounted() {
    //   this.getFormsHtml()
  },
  created() {
    // this.getUserForms(this.$store.state.account.user.user.id)
  },
  methods: {
    // ...mapActions("form", [
    //   "getformbyid",
    //   "updateform",
    //   "getforms",
    //   "deleteform",
    //   "attachUserToForm",
    //   "getUserForms"
    // ]),
    // formloader(e) {
    //   this.$store.state.account.formid = e;
    //   let rootform = this.$store.state.form.userForms; //.filter(form=>{return form.formId==e})
    //   this.$store.state.form.current_signed_form = rootform[0].id;
    //   this.getFormHtml(e);
    // },
    // getFormHtml(id) {
    //   let currentf = this.html.filter(form => {
    //     return form.id == id;
    //   });
    //   this.formDisplay = true;
    //   this.thtml = currentf;
    //   return currentf;
    // },
    // async getFormsHtml() {
    //   console.log("AFFFDASHHHHHHHHHHHHH");
    //   let sfs = this.$store.state.account.user.user.signedforms;
    //   let ssfs = await fetch(
    //     "https://2020i.site/api/wsers/" +
    //       this.$store.state.account.user.user.id +
    //       "/signedforms?",
    //     {
    //       method: "GET",
    //       headers: { ...authHeader(), "Content-Type": "application/json" }
    //     }
    //   )
    //     .then(res => res.json())
    //     .then(json => {
    //       return json;
    //     });
    //   this.$store.state.form.sfs = ssfs;
    //   let fs = await fetch(
    //     "https://2020i.site/api/Forms?filter[where][FormType]=affiliate"
    //   )
    //     .then(res => res.json())
    //     .then(json => {
    //       return json;
    //     });
    //   let userforms = fs.filter(form => {
    //     return ssfs.filter(signedform => {
    //       return form.id === signedform.formId;
    //     })[0];
    //   });
    //   this.html = userforms;
    // },
    // openFileDialog(type) {
    //   console.log("FILE DIALOG");
    //   console.log(type);

    //   document.getElementById(type).click();
    // }
  },
  computed: {
    // forms_list: {
    //   get: function() {
    //     return this.html;
    //   },
    //   set: function(value) {
    //     this.forms_list = value;
    //   }
    // }
  },
  data() {
    return {
    //   formDisplay: false,
    //   whattodo: "",
    //   fid: "",
    //   html: "<div>My House</div>",
    //   FormTitle: "",
    //   thtml: "",
    //   forms: ""
    };
  },
  components: {
    affiliateformfields,
    practicefields,
    TopHeader,
    SideBar,
    forms,
    viewer,
    uploader,
    affiliateApplication
  }
};
</script>
<style scoped>
.card {
  background-color: transparent;
  border: none;
}
.tab-content {
  width: 90%;
}
</style>