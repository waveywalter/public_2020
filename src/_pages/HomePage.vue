
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
                {{user.email + ' ' + user.firstname}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>

                <span v-if="user.deleting"><em> - Updating...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else > - <a @click="update(user.id); toggle = !toggle" class="text-danger">Update Password</a></span>

                  <form ref="form" @submit.prevent="form_m" class="form-group " v-show='toggle'>
                    <label for="exampleInputPassword1">New Password</label>
                    <input type="text" class="form-controls" id="exampleInputPassword1" placeholder="Password">
                    <input type="submit">
                </form>

            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
        </div>
    </div>
</template>

<script>
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
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete',
            update: 'update',
        form_m(){
        var vm =this,
        formData= new FormData(vm.$refs.form)
        let jsonObject = {};

        for (const [key, value] of formData.entries()){
            jsonObject[key] = value;
        };
        console.log(jsonObject)
    }

        })
    },
};
</script>