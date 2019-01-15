
<template>
<div class="container">
    <div class="row">
<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 el-element-overlay">
        <div class="white-box">
        <!-- <div class="user-bg"> <img width="100%" v-bind:src=imagepath alt="user-img"> </div> -->
<div class="row">
<div class="col-md-12">


<form ref="form" @submit.prevent="form_m" class="form-horizontal form-material">
    <div class="form-group">
        <label class="col-md-12">First Name</label>
        <div class="col-md-12">
        <input placeholder="First Name" type="text" v-on:change="clearAlert" v-model="updateInfo.firstname"  name="firstname"><span class="highlight"></span> <span class="bar"></span>
    </div>
    </div>
        <div class="form-group">
        <label class="col-md-12">Last Name</label>
        <div class="col-md-12">
            <input placeholder="Last Name" type="text" v-on:change="clearAlert" v-model="updateInfo.lastname"  name="lastname"> <span class="bar"></span>
    </div>
    </div>
    <div class="form-group">
        <div class="col-sm-12">
            <button class="btn btn-success">Update Profile</button>
        </div>
    </div>
</form>
</div>
</div>
</div>
    </div>
<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 el-element-overlay">
<div>
    <div class="white-box">
        <div class="el-card-item">
            <div class="el-card-avatar el-overlay-1"> <img v-bind:src=imagepath>
                <div class="el-overlay">
                    <ul class="el-info">
                        <!-- <li><a class="btn default btn-outline image-popup-vertical-fit" href="/public/uploads/img1.jpg"><i class="icon-magnifier"></i></a></li> -->
                        <!-- <li><a class="btn default btn-outline" href="javascript:void(0);"><i class="icon-link"></i></a></li> -->
                    </ul>
                </div>
            </div>
            <div class="el-card-content">
                <h3 class="box-title">{{user.user.firstname + " " + user.user.lastname}}</h3> <small>{{user.user.role}}</small>
                <br> 
                </div>
                    <imageUpload></imageUpload>
        </div>
    </div>
</div>
</div>
</div>
</div>


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
      imagepath: "/public/uploads/" + user.user.username +'/'+user.user.avatarName,
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
    }
    }
};
</script>