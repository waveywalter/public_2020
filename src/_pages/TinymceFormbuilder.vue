<template>
  <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div data-v-7ad1cecc class>
          <div data-v-7ad1cecc class="row bg-title">
            <h4 data-v-7ad1cecc class="page-title">Form Builder</h4>
          </div>
        </div>
        <div class="row">
          <div class="container col-sm-12">
            <form class="form-horizontal" @submit.prevent="MceSubmit">
              <div class="form-group creat-form-title">
                <label class="col-md-12">Form Title:</label>
                <div class="col-md-12">
                  <input
                    class="form-control form-control-line"
                    v-model="form.FormTitle"
                    type="text"
                    v-on:click="clearAlert"
                  >
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">Form Content:</label>
                <div class="col-md-12">
                  <tinymceEditor id="tiny-mce-form" ref="FormContent" v-model="form.FormContent"></tinymceEditor>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">Form Type:</label>
                <div class="col-md-12">
                  <select v-model="form.FormType" class="form-control">
                    <option value="humanResource">Human Resource</option>
                    <option value="affiliate">Affiliate</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <button
                class="btn btn-success waves-effect waves-light m-r-10"
                type="submit"
              >Save Form</button>
            </form>
            <p v-show="message">{{message}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinymceEditor from "../components/layoutComponents/tinymceEditor";
import AdminTopHeader from '../components/layoutComponents/adminTopHeader';
import AdminSideBar from '../components/adminComponents/adminSideBar';
import formBuilder from "../formBuilder/formBuilder";
import { mapState, mapActions } from "vuex";

export default {
  name: "tinymceformbulder",
  data() {
    return {
      form: {
        FormTitle: " ",
        FormContent: " ",
        FormType: "others"
      },
      submitted: false
    };
  },
  components: {
    tinymceEditor,
    AdminTopHeader,
    AdminSideBar,
    formBuilder
  },
  computed: {
    ...mapState("alert", ["message", "type"])
  },
  methods: {
    ...mapActions("form", ["saveform"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    MceSubmit(e) {
      this.saveform(this.form);
      console.log(e);
      this.submitted = true;
      this.form = {
        FormTitle: ""
      };
      tinymce.get("tiny-mce-form").setContent("");
    }
  }
};
</script>

<style scoped>
#user_image_uploader_button {
  display: none;
}
.creat-form-title,
.creat-form-title input {
  font-size: 24px;
}
</style>