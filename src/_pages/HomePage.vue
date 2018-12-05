
<template>
    <div>
        <AdminTopHeader></AdminTopHeader>
        <AdminSideBar></AdminSideBar>
        
        <div id="page-wrapper">
        <h1>Hi {{account.user.firstName}}!</h1>
        <p>You're logged in with Vue + Vuex & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{user.firstname + ' ' + user.lastname + ' ' + user.email}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>

                <span> - <a @click="update(user.id); toggle = !toggle" class="text-danger">Edit User</a></span>

                  <!-- <form ref="form" @submit.prevent="form_m" class="form-group " v-show='toggle'>
                    <label for="exampleInputPassword1">New Password</label>
                    <input type="text" name="name" class="form-controls" id="exampleInputPassword1" placeholder="Password">
                    <input type="submit">
                </form> -->

<div id="app" v-show="toggle">
  <form ref="form" @submit.prevent="form_m">
    <input placeholder="First Name" type="text" name="firstname"> <br>
    <input placeholder="Last Name" type="text" name="lastname"> <br>
    <input placeholder="Email" type="text" name="email">
    <input type="submit">
  </form>
</div>

            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
        </div>
    </div>
</template>

<script>
let user = JSON.parse(localStorage.getItem('user'));

import { authHeader } from '../_helpers';
import AdminTopHeader from '../components/layoutComponents/adminTopHeader';
import AdminSideBar from '../components/layoutComponents/adminSideBar';
import { mapState, mapActions } from 'vuex'


export default {
    data(){
 return {
     toggle:false
 }
    },
        name: "HomePage",
        components: {
            AdminTopHeader,
            AdminSideBar,
        },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
    form_m(){
      var vm = this,
        formData= new FormData(vm.$refs.form[0])
      let jsonObject = {};
      formData.append('key','value')
       
      for (const [key, value]  of formData.entries()) {
        jsonObject[key] = value;
      }
       fetch(`http://localhost:3000/api/wsers/${user.userId}`,{method:'PATCH',
       body:JSON.stringify(jsonObject),
     headers: {
            "Content-Type": "application/json; charset=utf-8",
            //"Accept":"application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
       
       })


    //    console.log({lastname:"Johnson"})
    //    console.log(jsonObject)
    // console.log(JSON.stringify(jsonObject))
    },
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete',
            update: 'update',
        })
    },
    // mounted (){
    //     form
    //     axios.patch (`http://localhost:3000/api/wsers/${user.userId}`, {
    //         'lastname':vm.$refs.form[0],
    //     })
    // }
};
</script>