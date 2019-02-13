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
          <b-dropdown id="userList" v-if="users.items">
            <b-dropdown-item v-for="wser in users.items" :key="wser.id">{{wser.username + ' ' + wser.email}}</b-dropdown-item>
          </b-dropdown>
          </div>
          <label>Forms</label>
        </div>
      </div>
    </div>
  </div>
</template>

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
      users: state => state.users.all
    })
  },
  created() {
    this.getAllUsers({ role: null });
  },

  components: {
    TopHeader,
    SideBar
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
      update: "update"
    })
  }
};
</script>