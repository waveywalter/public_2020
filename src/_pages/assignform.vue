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
          <form ref="form" @submit.prevent="handleSubmit">
          <div>
              <label>User</label>
          <select id="userList" v-if="users.items" v-model="data.userId">
            <option >Select an Employee</option>
            <option v-for="wser in users.items" :key="wser.id" v-bind:value="wser.id">
              {{wser.firstname}} {{wser.lastname}}
            </option>
          </select>
          </div>
          <div>
              <label>Forms</label>
              <ul v-if="allforms.items">
               <li v-for="allform in allforms.items" :key="allform.id">
                 <input :data-attr="allform.id" type="checkbox" :name="allform.name" v-on:click="updateData">
                 <span class="checkmark"></span>
                 <label :for="allform.name">{{allform.FormTitle}}</label>
                 <a :href="'/admin/adminforms/?formid='+allform.id">Edit</a>
                 <!-- <a :href="'/'+{{url()}}+'/adminforms/?formid='+allform.id">Edit</a> -->
                 <!-- <router-link :to="'/admin/adminforms/?formid='+allform.id">Edit</router-link> -->
               </li>
             </ul>
          </div> 
          <button type="submit">Attach Form To User</button>
          </form>
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
  background-color: #3e5688;
}
button, input, select, textarea {
    background-color: #414b61;
    border-style: groove;
    color: inherit;
}
select {
    -moz-appearance: none;
    -webkit-appearance: menulist;
}
</style>

<script>
import TopHeader from "../components/layoutComponents/SideBar";
import SideBar from "../components/layoutComponents/TopHeader";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { authHeader } from "../_helpers";

let user = JSON.parse(localStorage.getItem('user'));



export default {
  name: "assignForm",
  data() {
    return {
      data: {
        userId:'',
        formId:'',
        meta:{}
      }
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all,
      ...mapState("form", ["allforms", "formdata","userForms"]), 
          })
  },
  mounted(){
   
  },
  created() {
    this.getAllUsers({ });
    this.getforms({ });
   
    //this.attachUserToForm({})
  },
  components: {
    TopHeader,
    SideBar
  },
  methods: {
    // url(){
    //   //if user role is admin return admin if its hr then return hr route
    //   if (wser.email = "eddmin@gmail.com"){
    //     console.log("hypeeeeeeeee")
    //   }
    // },
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
      update: "update",
     }),
      ...mapActions("form", ["getformbyid", "updateform","getforms", "deleteform","attachUserToForm","getUserForms"]),
      updateData(e){

        this.data.formId = e.target.attributes[1].value
        this.data.userId = this.$refs.form[0].value

       
      },
      handleSubmit(e){
        //post to website clear form
        this.attachUserToForm(this.data)
        e.target.reset()
      }
  },

};

</script>