<template>
  <div class="col-md-4">
    <div class="white-box todo">
      <h3 class="box-title">To Do List</h3>
      <div class="row">
        <perfect-scrollbar>
          <div class="col-sm-12 col-xs-12">
            <ul class="list-task list-group" data-role="tasklist">
              <div class="taskBox">
                <li class="list-group-item" data-role="task" v-for="task in ctasklist">
                     <div class="wrapper">
                    <div class="font-icon">
                      <i class="fas fa-phone">
                        <span class="line"></span>
                      </i>
                    </div>
                    <div class="task-data">
                      <label for="inputSchedule">
                        <span class="mainText">{{task.title}}</span>
                      </label> 
                      <p class="subText" v-html="`<a href='`+returnUrl(task.content)+`'>View Lead</a>`"></p>
                      <p class="subText">Created: {{task.date_created | moment("dddd, MMMM Do YYYY h:mm ")}}</p>
                      <p class="subText">Due By: {{task.due_date | moment("dddd, MMMM Do YYYY h:mm ")}}</p>

                      <div class="bottom-cal">
                        <i @click.stop="dialog=true" class="fas fa-calendar"></i>
                        <i @click.stop="dialog=true" class="fas fa-calendar-o"></i>
                      </div>
                    </div>
                    <div class="right-side">
                      <i class="fa fa-file-text"></i>
                      <i class="fa fa-trash-o"></i>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
 <div class="text-xs-center">
    <v-dialog
    v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Change Date
        </v-card-title>
        <v-card-text>
    <v-sheet height="300">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
        ></v-calendar>
      </v-sheet> </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 50px 200px 50px;
      border-style: solid;
    border-width: 1px;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 2px;
    background-color: #3c4452;
    padding: 10px;
}
.font-icon {
  float: left;
  font-size: 30px;
  margin-right: 10px;
  color: dodgerblue;
  grid-column: 1;
}
.line {
  border-left: solid;
  margin-left: 10px;
}
.task-data {
  grid-column: 2;
}
.right-side {
  grid-column: 3;
  display: grid;
  font-size: 20px;
}
.subText {
  line-height: 1;
}
.ps {
  position: relative;
  height: 525px;
  width: 100%;
}
.ps__rail-x:hover > .ps__thumb-x,
.ps__rail-x:focus > .ps__thumb-x,
.ps__rail-x.ps--clicking .ps__thumb-x {
  background-color: rgb(156, 1, 1) !important;
  height: 11px !important;
}
.todo {
}
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
.bottom-cal {
    display: flex;
    justify-content: space-evenly;
}
</style>
<script>
import { mapState, mapActions } from "vuex";
let user = JSON.parse(localStorage.getItem("user"));
var newNote = document.createElement("span");
export default {
  name: "Taskbox",
  methods:{
        returnUrl(text){
      return text.slice(12)
    },
  },
  computed:{
        ...mapState({
      ctasklist: state => state.leads.alltask.filter(task=>{return task.status=="new"})
    }),
  },
  data() {
    return {
    dialog:false,
        tasklist:[{
          content:"string",
date_created:"2019-03-25T19:33:34.081Z",
due_date:"1554404841544",
id:"5c992d0e16815d7bb6209621",
leadId:"5c992c242f52d27613674343",
status:"complete",
title:"string",
type:"string",
        }],
              type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ]
    }
  }
};
</script>