<template>
  <div id="app">
    <TopHeader></TopHeader>
    <SideBar></SideBar>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div data-v-7ad1cecc class>
          <div data-v-7ad1cecc class="row bg-title">
            <h4 data-v-7ad1cecc class="page-title">Assign Form</h4>
          </div>
          <div>
              <label>User</label>
          <ul id="userList" v-if="users.items">
            <li v-for="wser in users.items" :key="wser.id">
                 <input type="checkbox">
                 <span class="checkmark"></span>
                 {{wser.username + ' ' + wser.email}}
            </li>
          </ul>
          </div>
          <div>
              <label>Forms</label>
                <ul v-if="allforms.items">
               <li v-for="allform in allforms.items" :key="allform.id">
                 <input type="checkbox">
                 <span class="checkmark"></span>
                 {{allform.FormTitle}}
                 <a :href="'/admin/adminforms/?formid='+allform.id">Edit</a>
                 <!-- <router-link :to="'/admin/adminforms/?formid='+allform.id">Edit</router-link> -->
               </li>
             </ul>
          </div>        
          </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
li{
    cursor: pointer;
}
li:hover {
  background-color: yellow;
}
</style>

<script>
import TopHeader from "../components/layoutComponents/SideBar";
import SideBar from "../components/layoutComponents/TopHeader";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { authHeader } from "../_helpers";

export default {
  name: "assignForm",
  data() {
    return {
      info: ""
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all,
      ...mapState("form", ["allforms", "formdata"]), 
          })
  },
  mounted(){
  },
  created() {
    this.getAllUsers({ });
    this.getforms({ });
  },
  components: {
    TopHeader,
    SideBar
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
      update: "update",
     }),
      ...mapActions("form", ["getformbyid", "updateform","getforms", "deleteform"]),
  },
};
</script>