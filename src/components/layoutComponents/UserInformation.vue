
<template>
    <div class="row">
<div class="">
        <div class="white-box">
            <div class="user-bg"> <img width="100%" alt="user" src="/public/uploads/img1.jpg"> </div>
            <div class="user-btm-box">
                <!-- .row -->
                <div class="row text-center m-t-10">
                    <div class="col-md-6 b-r"><strong>Name</strong>
                        <p>{{user.user.firstname +" "+ user.user.lastname}}</p>
                    </div>
                    <div class="col-md-6"><strong>Role</strong>
                        <p>{{ user.user.role}}</p>
                    </div>
                </div>
                <!-- /.row -->
                <hr>
                <!-- .row -->
                <div class="row text-center m-t-10">
                    <div class="col-md b-r"><strong>Email ID</strong>
                        <p>{{user.user.email}}</p>
                    </div>
                </div>
                <!-- /.row -->
                <hr>
            </div>
        </div>
    </div>
</div>
  <!-- <input type="file" @change="onFileChanged"> -->
  <!-- <h3>Users from secure api end point:</h3> -->
  <!-- <em v-if="users.loading">Loading users...</em> -->
  <!-- <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span> -->
  <!-- <ul id="userList" v-if="users.items"> -->
  <!-- <li v-for="wser in users.items" :key="wser.id"> -->
  <!-- {{wser.username + ' ' + wser.email}} -->
  <!-- <span v-if="wser.deleting"><em> - Deleting...</em></span> -->
  <!-- <span v-else-if="wser.deleteError" class="text-danger"> - ERROR: {{wser.deleteError}}</span> -->
  <!-- <span v-else> - <a @click="deleteUser(wser.id)" class="text-danger">Delete</a></span> -->
  <!-- <span> - <a @click="update(wser.id); userPassword = !userPassword" class="text-danger">Change Password</a></span> -->
  <!-- <form ref="form" @submit.prevent="form_m" class="form-group " v-show='toggle'>
                    <label for="exampleInputPassword1">New Password</label>
                    <input type="text" name="name" class="form-controls" id="exampleInputPassword1" placeholder="Password">
                    <input type="submit">
  </form>-->
  <!-- <span> - <a @click="update(wser.id); userInfo = !userInfo" class="text-danger">Edit User Information</a></span> -->
  <!-- </li>
        </ul>
<div id="app" v-show="userInfo">
  <form ref="form" @submit.prevent="form_m">
    <input placeholder="First Name" type="text" name="firstname"> <br>
    <input placeholder="Last Name" type="text" name="lastname"> <br>
    <input placeholder="Email" type="text" name="email"> <br />
    <input type="submit">
  </form>
</div>

<div id="app" v-show="userPassword">
  <form ref="form" @submit.prevent="password_m">
    <input placeholder="Old Password" type="text" name="oldPassword"> <br />
        <input placeholder="New Password" type="text" name="newpassword"> <br>
    <input type="submit">
  </form>
  </div>-->
</template>

<script>
let user = JSON.parse(localStorage.getItem("user"));

// import { authHeader } from '../_helpers';
import AdminTopHeader from "./adminTopHeader";
import AdminSideBar from "./adminSideBar";
import { mapState, mapActions } from "vuex";
import { store } from '../../_store';
import imageUpload from './imageUpload'

//console.log(user)
export default {
  data() {
    return {
      userInfo: false,
      userPassword: false,
      updateInfo: {
        firstname: user.user.firstname,
        lastname: user.user.lastname,
        userId: user.userId,
      },
    };
  },
  name: "UserInformation",
  components: {
    AdminTopHeader,
    AdminSideBar,
    imageUpload
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("alert", ["message"])
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("account", ["update"]),
    ...mapActions({ clearAlert: "alert/clear" }),
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(event);
    },
    onUpload() {},
    form_m() {
       this.update(this.updateInfo);
    },
    password_m() {
      var vm = this,
        formData = new FormData(vm.$refs.form[1]);
      let jsonObject = {};
      formData.append("key", "value");
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
        console.log(vm.$refs.form[1]);
      }
      fetch(`http://localhost:3000/api/wsers/change-password`, {
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    },
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};
</script>