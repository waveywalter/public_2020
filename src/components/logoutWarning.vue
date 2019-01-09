<template>
  <div>
    <div v-if="logoutPop" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Logout Warning</slot>
          </div>

          <div class="modal-body">
            <slot name="body">Logout in {{logoutTime}} s</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="logoutPop = false">Back</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { userService } from "../_services";
import * as Cookie from "js-cookie";
export default {
  name: "logoutWarning",
  mounted() {
    this.idleTimer();
  },
  data() {
    return {
      logoutPop: false,
      logoutTime: 10,
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    idleTimer() {
      var tt, tp;
      //window.onload = resetTimer;
      window.onmousemove = resetTimer; 
      window.onmousedown = resetTimer; 
      window.onclick = resetTimer; 
      window.onscroll = resetTimer; 
      window.onkeypress = resetTimer; 
      var self = this;

      function resetTimer() {
        if (self.user && !self.logoutPop) {
          clearTimeout(tp);
          clearTimeout(tt);

          tp = setTimeout(function() {
            self.logoutPop = true;
            self.logoutTime = 10;
            var logoutTimer = setInterval(function(){
                self.logoutTime--;
                if(self.logoutTime <= 0)
                clearInterval(logoutTimer);
            },1000);
          }, 900000);
          tt = setTimeout(function() {
            Cookie.set("sessionMsg", "Auto Logout", {
              expires: 1,
              secure: false
            });
            userService.logout();
          }, 910000);
        }
      }
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>