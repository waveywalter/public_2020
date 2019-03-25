<template>
  <div class role>
    <h3 class="px-2">Task</h3>
    <h6 class="px-2">My Task</h6>
    <!-- <button v-on:click="addTask" class="px-2">+ Add Task</button> -->
    <div id="taskList">
      <ul>
        <li>
          <a href="#">New Lead</a>
          <p>View profile for James Stone</p>
        </li>
        <li>
          <a href="#">Follow Up</a>
          <p>Call back Julia Wells</p>
        </li>
        <li>
          <a href="#">Sign Document</a>
          <p>Sign new required form</p>
        </li>
        <li>
          <a href="#">Follow Up</a>
          <p>Email applicant Julia Wells</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
var newNote = document.createElement("span");
export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {
    addTask: function() {
      document.getElementById("taskList").innerHTML +=
        '<input style="background-color:white;margin-top:20px " type="text" placeholder="New Note" class="notes">';
    }
  }
};
</script>

<style scoped>
.rightsidebar {
  right: 22px;
  top: 149px;
  z-index: 10;
  position: absolute;
  width: 220px;
  padding-top: 60px;
  height: 59%;
  background: #353c48;
}
</style>