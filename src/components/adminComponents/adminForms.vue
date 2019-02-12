<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">All Forms</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-sm-3 col-xs-12">
            <div class="white-box">
              <span v-if="allforms.error" class="text-danger">ERROR: {{allforms.error}}</span>
              <ul v-if="allforms.items">
                <li v-for="allform in allforms.items" :key="allform.id">
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
                  <h1>
                    <span>Form Title:</span>
                    <input v-model="editedform.FormTitle" type="text">
                  </h1>
                  <tinymceEditor id="tiny-mce-form" ref="FormContent" v-model="editedform.FormContent"></tinymceEditor>
                  <h3>
                    <span>Form Type:</span>
                    <select v-model="editedform.FormType" class="form-control">
                      <option value="humanResource">Human Resource</option>
                      <option value="affiliate">Affiliate</option>
                      <option value="others">Others</option>
                    </select>
                  </h3>
                  <div class="col-lg-2 col-sm-4 col-xs-12">
                    <input class="btn btn-success upload-botton" type="submit" value="Update Form">
                  </div>
                </form>
              
            </div>
          </div>
        </div>
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
        FormType: ""
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