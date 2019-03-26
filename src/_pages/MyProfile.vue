<template>
  <div>
    <div id="page-wrapper">
      <div class="container-fluid">
        <div class="col-lg">
          <div class="row bg-title">
            <h4 class="page-title">My Profile</h4>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="white-box">
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
        <label class="col-md-12">Role</label>
        <div class="col-md-12">
            <p>{{updateInfo.role}}</p> <span class="bar"></span>
    </div>
    </div>

    <div class="form-group">
        <div class="col-sm-12">
            <button class="btn btn-success">Update Profile</button>
        </div>
    </div>
</form>

            <div class="form-group">
        <label class="col-md-12">G-Mail</label>
        <div class="col-md-12">
<input placeholder="Email" type="text" v-on:change="clearAlert" v-model="updateInfo.email" name="email"> <span class="bar"></span>    
</div>
    </div>
            <div class="form-group">
        <label class="col-md-12">Password</label>
        <div class="col-md-12">
<input placeholder="Password" type="text" v-on:change="clearAlert" name="password"> <span class="bar"></span>    
</div>
    </div>
        <div class="form-group">
        <div class="col-sm-12">
            <button class="btn btn-danger" v-on:click="helloworld">Authenticate Gmail</button>
        </div>
    </div>
</div>
</div>
</div>
    </div>
<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 el-element-overlay">
<div>
    <div class="white-box">
    <imageUpload></imageUpload>
    </div>
</div>
</div>
</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { store } from '../_store';
import imageUpload from '../components/layoutComponents/imageUpload'

let user = JSON.parse(localStorage.getItem("user"));
export default {
  name: "MyProfile",
  data() {
    return {
      imagepath: "/public/uploads/" + user.user.username +'/'+user.user.id+'.png',
      userInfo: false,
      userPassword: false,
      updateInfo: {
        firstname: user.user.firstname,
        lastname: user.user.lastname,
        role: user.user.role,
        userId: user.userId,
        email: user.user.email
      },
    };
  },
  name: "UserInformation",
  mounted(){
   
  },
  components: {
    imageUpload
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("alert", ["message"])
  },
  methods: {
        authenticate: function (provider) {
          console.log("AUTHENITCATE")
 this.$login()
    },
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
    helloworld(){
      alert("SSsS")
    }
    }
};
</script>
<style scoped>
.current-avatar{
    margin: 15px 0;
}
</style>
