<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-lg-4 col-sm-12">
        <div class="white-box mt-5 ml-5">
          <h3 class="box-title m-b-5">Sample Forms with Right icon</h3>
          <div class="row">
            <div class="col-sm-12 col-xs-12">
              <form ref="form" @submit.prevent="form_m">
                <div class="form-group mt-5">
                  <label for="exampleInputuname">First Name</label>
                  <div class="input-group">
                    <input v-model="reg.firstname" type="text" class="form-control" placeholder="First Name" name="firstname">
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group mt-5">
                  <label for="exampleInputuname">Last Name</label>
                  <div class="input-group">
                    <input v-model="reg.lastname" type="text" class="form-control" placeholder="Last Name" name="lastname">
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group mt-5">
                  <label for="exampleInputuname">User Name</label>
                  <div class="input-group">
                    <input v-model="reg.username" type="text" class="form-control" placeholder="Username" name="username">
                    <div class="input-group-addon">
                      <i class="ti-user"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1" type="text" name='role'>Role</label>
                  <div class="input-group">
                    <select v-model="reg.role" name="role" class="form-control">
                      <option disabled="true" value></option>
                      <option value="admin" >Admin</option>
                      <option value="owner" >Owner</option>
                      <option value="exdir" >Executive Director</option>
                      <option value="nursdir">Director of Nursing</option>
                      <option value="nurse1" >Nurse1</option>
                    </select>
                    <div class="input-group-addon">
                      <i class="ti-shield"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <div class="input-group">
                    <input v-model="reg.email" type="text" class="form-control" placeholder="Enter email" name="email">
                    <div class="input-group-addon">
                      <i class="ti-email"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputpwd1">Password</label>
                  <div class="input-group">
                    <input v-model="reg.password" type="text" class="form-control" placeholder="Enter password" name="password">
                    <div class="input-group-addon">
                      <i class="ti-lock"></i>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <button
                    type="submit"
                    class="btn btn-success waves-effect waves-light m-r-10"
                  >Submit</button>
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

export default {
  name: "CreateAdmin",

  data() {
    return {
      // errors: [],
      reg: {
        firstname: "",
        lastname: "",
        username: "",
        role: "",
        email: "",
        password: "",
        submited: false
      }
    };
  },
  methods: {
    form_m() {
      var vm = this,
        formData = new FormData(vm.$refs.form);
      let jsonObject = {};
      formData.append("key", "value");
      for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
      }
       fetch(`http://localhost:3000/api/wsers/`, {
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          //"Accept":"application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
        }
      });

      fetch(`http://localhost:3000/api/wsers/${user.id}`, {
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          //"Accept":"application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
        }
      });

    // handleSubmit(event) {
    //   this.reg.submited = true;
    //   alert(JSON.stringify(this.reg));

    //   if (this.reg.submited) {
    //   }
    // }
  }
}
}
</script>

<style scoped>
</style>