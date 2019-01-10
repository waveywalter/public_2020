<template>
  <div>
    <div v-if="logoutPop" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Session Timeout</h3>
          </div>

          <div class="modal-body">
              <p>You're being timed out due to inactivity. Would you like to remain logged in?</p>
              <p>Time remaining: {{logoutTime}}</p>
          </div>

          <div class="modal-footer">
              <button class="modal-default-button" @click="logoutPop = false">Yes</button>
              <button class="modal-default-button" @click="logout()">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { userService } from "../_services";
export default {
  name: "logoutWarning",
  mounted() {
    this.idleTimer();
  },
  data() {
    return {
      logoutPop: false,
      logoutTime: "02:00",
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
      var self = this, timer, minutes, seconds;

      function resetTimer() {
        
        if (self.user && !self.logoutPop) {
          clearTimeout(tp);
          clearTimeout(tt);
          tp = setTimeout(function() {
            self.logoutPop = true;
            self.logoutTime = "02:00";
            timer = 60;
            var logoutTimer = setInterval(function(){
                timer--;
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                self.logoutTime = minutes + ":" + seconds;
                if(timer <= 0 || !self.logoutPop)
                clearInterval(logoutTimer);
            },1000);
          }, 900000);
          tt = setTimeout(function() {
            localStorage.setItem('sessionMsg', 'Session Expired');
            userService.logout();
          }, 1020000);
        }
      }
    },
    logout() {
            userService.logout();
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