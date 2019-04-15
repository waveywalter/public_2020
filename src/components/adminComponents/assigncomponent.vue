<template>
<form ref="form" @submit.prevent="handleSubmit">
          <div>
              <label>Select Role</label>
          <select id="userList" v-if="roles" v-model="data.roleId">
            <option >Select a Role</option>
            <option v-for="role in roles" :key="role.id" v-bind:value="role.id" >
              {{role.name}}
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
                <!-- <a :href="'/admin/adminforms/?formid='+allform.id">Edit</a>
                 <!-- <a :href="'/'+{{url()}}+'/adminforms/?formid='+allform.id">Edit</a> -->
                 <!-- <router-link :to="'/admin/adminforms/?formid='+allform.id">Edit</router-link> -->
               </li>
             </ul>
          </div> 
          <button type="submit">Attach Forms To Role</button>
          </form>

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
import axios from "axios";
import { mapState, mapActions } from "vuex";
import { authHeader } from "../../_helpers";

let user = JSON.parse(localStorage.getItem('user'));



export default {
  name: "assignForm",
  data() {
    return {
      data: {
        userId:'',
        formIds:[],
        meta:{},
        data:{}
      }
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all,
       roles: state => state.form.roles,
      ...mapState("form", ["allforms", "formdata","userForms"]), 
          })
  },
  mounted(){
   
  },
  created() {
    this.getAllUsers({ });
    this.getforms({ });
    this.getRoles()
   
    //this.attachUserToForm({})
  },
  components: {
 
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
      ...mapActions("form", ["getformbyid", "updateform","getforms", "deleteform","attachUserToForm","getUserForms","getRoles","addFormToRole"]),
      updateData(e){
        let rid = e.target.attributes[1].value;
        console.log(e)
        console.log(this.$refs)
        let mid = this.data.formIds
        if(this.data.formIds.includes(rid)){
          this.data.formIds = mid.filter(form=>{form!=rid})

        }
        else{
          this.data.formIds.push(rid)
        }
        //this.data.roleId = e.target.attributes[1].value
       // this.data.formId = this.$refs.form[0].value

       
      },
    async  handleSubmit(e){
        //post to website clear form
  console.log(this.data)
  await this.data.formIds.map(id=>{
    let data = {
        formId:id,
        roleId:this.data.roleId,
        meta:{}
    }
    this.addFormToRole(data)
  })

        //this.addFormToRole(this.data)
        e.target.reset()
      }
  },

};

</script>