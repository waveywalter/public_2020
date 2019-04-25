<template>

<div class="row">
          <div class="col-lg col-sm-3 col-xs-12">
            <div class="white-box">
              <span v-if="allforms.error" class="text-danger">ERROR: {{allforms.error}}</span>
              <ul class="list-group" v-if="allforms.items">
                <li class="list-group-item" v-for="allform in allforms.items" :key="allform.id">
                  {{allform.FormTitle}}
                  <span v-if="allform.deleting">
                    <em>- Deleting...</em>
                  </span>
                  <span v-else-if="allform.deleteError" class="text-danger">
                    - ERROR:
                    {{allform.deleteError}}
                  </span>
                  <span v-else>-
                    <a @click="deleteform(allform.id)" class="text-danger">Delete</a>
                  </span>
                  <a :href="'/admin/adminforms/?formid='+allform.id">Edit</a>
                  <!-- <router-link :to="'/admin/adminforms/?formid='+allform.id">Edit</router-link> -->
                </li>
              </ul>
            </div>
          </div>
          <div v-if="this.$route.query.formid" class="col-lg-9 col-sm-9 col-xs-12">
            <div class="white-box">

              <form class="form-horizontal" @submit.prevent="MceSubmit">
                <input v-model="editedform.id " type="hidden">
                <div class="form-group creat-form-title">
                  <label class="col-md-12">Form Title:</label>
                  <div class="col-md-12">
                    <input class="form-control form-control-line" v-model="editedform.FormTitle" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-12">Form Content:</label>
                  <div class="col-md-12">
                    <tinymceEditor id="tiny-mce-form" ref="FormContent" v-model="editedform.FormContent"></tinymceEditor>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-12">Form Type:</label>
                  <div class="col-md-12">

                    <select v-model="editedform.FormType" class="form-control">
                      <option value="humanResource">Human Resource</option>
                      <option value="affiliate">Affiliate</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                <button class="btn btn-success waves-effect waves-light m-r-10" type="submit">Update Form</button>

              </form>

            </div>
          </div>
        </div>



</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import tinymceEditor from "../layoutComponents/tinymceEditor";

export default {
  name: "adminForms",
  data() {
    return {
      editedform: {
        id: "",
        FormTitle: "",
        FormContent: "",
        FormType: "",
      },
      loadform: true
    };
  },
  created() {
    this.getforms({});
  },
  updated() {
    if (tinymce.editors.length > 0 && this.loadform) {
      for (var i = 0; i < this.allforms.items.length; i++) {
        if (this.allforms.items[i].id == this.$route.query.formid) {
          tinymce
            .get("tiny-mce-form")
            .setContent(this.allforms.items[i].FormContent);
          this.editedform.id = this.allforms.items[i].id
          this.editedform.FormTitle = this.allforms.items[i].FormTitle
          this.editedform.FormContent = this.allforms.items[i].FormContent
          this.editedform.FormType = this.allforms.items[i].FormType
          this.loadform = false
        }
      }
    }
  },
  methods: {
    ...mapActions("form", ["getformbyid", "updateform","getforms", "deleteform"]),
    MceSubmit(e) {
      this.updateform(this.editedform);
    }
  },
  computed: {
    ...mapState("form", ["allforms", "formdata"]),
    getformid() {
      var filtered_array = [];
      if (this.allforms.items && this.$route.query.formid) {
        for (var i = 0; i < this.allforms.items.length; i++) {
          if (this.allforms.items[i].id == this.$route.query.formid) {
            filtered_array.push(this.allforms.items[i]);
          }
        }
        return filtered_array;
      }
    }
  },
  components: {
    tinymceEditor
  }
};
</script>

<style scoped>
.creat-form-title, .creat-form-title input{
    font-size: 24px;
}
</style>

