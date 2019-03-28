<style>
.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
}.spiel {
    position: relative;
    left: 133px;
    background-color: white;
    width: 400px;
    top: -82px;
    padding: 10px;
    border-radius:5px;
}
i{
  cursor:pointer
}
.heightless{height:0;width:0;}
.email,.note {
    background-color: white;
    color: black;
    padding: 0px 10px;
    margin-bottom:10px;
    border: 0px solid rgba(0,0,0,.4);
    border-radius: 4px;
}
.card {
    margin: 20px;
    cursor:pointer;
    display:inline-block;
    vertical-align:top;
    
}
.view {
    float: right;
    background-color: #3c4452;
    padding: 2px 6px;
    border-radius: 3px;
    
}
li {
    list-style-image: none;
    list-style: none;
}
.col-md-6{
float:none;
padding:0;

}
.flexible {
    display: flex;
}
.potential_affiliate,.pre_affiliate,.new{
  background-color: #607D8B;
    color:white;
}
div#meta {
 
    width: -webkit-fill-available;

}
.modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
}
#meta .flexible > div{
  width:33%;
  padding:10px;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
}
.card-body.basic.potential_affiliate{
    color:white;
}
.fade {
    transition: opacity .15s linear;
}
.card.lead{
  height:fit-content;
}
.mainc{
  width:80% !important
}
.newness {
    color: red !important;
}
.icons{flex-direction:column;
display:flex;}
</style>
<template>
<div ref="crm" id="page-wrapper">
<div v-if="view==='ListView'" class="container-fluid"> 
  <div class="col-lg-3"><input placeholder="Filter Contacts" type="text" v-model="search" ></input></div>
  <div>
  <div class="leadHolder">

  <div v-for="lead in regexLead(leads)" class="card col-lg-3 col-md-6">
    

    <div :class="'card-body basic  '+lead.status">

    <div class="card-title"> {{lead.first_name}} {{lead.last_name}} 
     <v-icon v-if="lead.type==='therapist'">face</v-icon><v-icon v-if="lead.type==='medical_professional'">local_hospital</v-icon><v-icon v-if="lead.type==='social_worker'">public</v-icon>
            <v-icon v-if="newtest(lead.status)" class="newness">fiber_new</v-icon>     <router-link class="view " :key="lead.id"  tag="li" :to="'/sales/crm/'+lead.id" @click.native="changeLead(lead)">
                  View
                </router-link>      
    </div>
    <div> {{lead.phone}} </div>
    <div> {{lead.email}} </div>
  <div> {{lead.notes}} </div>
   <!-- <button class="btn btn-primary">Convert to Applicant</button> -->
   </div>
   </div>
  </div>
  </div>
 </div>
<div v-if="view==='LeadView'">
   <div class="flexible">
     <button class="btn btn-default hidden" v-on:click="openNoteModal=true">Add Notes</button>
   <button v-on:click="openEmailModal=true" class="btn btn-default hidden">Send Email</button>
   <button class="btn btn-default">Convert To Affiliate</button>
  <button  class="btn btn-default" v-on:click="goBack()">Back</button>

   </div>
   <div class="flexible">
   <div class="card lead col-lg-3 col-md-6">
    <div :class="'card-body basic  '+currentLead.status">
    <div class="card-title"> {{currentLead.first_name}} {{currentLead.last_name}} 
           <v-icon v-if="currentLead.type==='therapist'">face</v-icon><v-icon v-if="currentLead.type==='medical_professional'">local_hospital</v-icon><v-icon v-if="currentLead.type==='social_worker'">public</v-icon>
   
    </div>
    <div> {{currentLead.phone}} </div>
    <div> {{currentLead.email}} </div>
    <div> {{currentLead.notes}} </div>
   <!-- <button class="btn btn-primary">Convert to Applicant</button> -->
   </div>


  
   </div>
<div id="meta">
<div class="flexible">  
    <div class="hidden">
     <div><h3>Notes</h3>     <v-pagination
      v-model="page"
      :length="6"
       ></v-pagination></div>
      <div class="note" v-for="note in filternote(notes)">
<v-icon>delete</v-icon><v-icon>edit</v-icon><v-icon>message</v-icon>

        <h4>Title: {{note.title}}</h4>
        <div>{{note.date_created | moment("dddd, MMMM Do YYYY h:mm ")}}</div>
        <div>{{note.type}} {{note.status}}</div>
        <div>{{note.content}}</div>
      </div>
    </div>
    <div  class="hidden">
      <div><h3>Emails</h3>
       <v-pagination
      v-model="page2"
      :length="3"
       ></v-pagination>
      </div>  

         <div class="email" v-for="email in emails">

        <h4>{{email.subject}}</h4>
        <div>{{email.date_created | moment("dddd, MMMM Do YYYY")}}</div>
        <div>{{email.message}}</div>
      </div>
     </div>
    <div>
      <div><h3>Tasks</h3>
       <v-pagination
      v-model="page3"
      :length="tasks.length/5"
      v-if="tasks.length>6"
       ></v-pagination>
      </div>  
   
         <div class="email" v-for="task in tasks">
         <div class="flexible"><div class="mainc">
        <h5><v-icon v-if="task.type=='phone_call'" class="blueg">phone</v-icon> {{task.title}}</h5>
        
        <div>Created: {{task.date_created | moment("dddd, MMMM Do YYYY")}}</div>
        <div>Due Date: {{task.due_date | moment("dddd, MMMM Do YYYY")}}</div>
        <div><v-icon v-if="task.status=='new'" class="blueg">fiber_new</v-icon><v-icon v-if="task.status=='complete'" class="blueg">cloud_done</v-icon></div>
        <div></div>
        </div><div class="icons">
           <v-icon v-on:click="completeTask(task.id)"  v-if="task.status!='complete'">done</v-icon><v-icon >delete</v-icon>
           <v-icon v-on:click="message_modal==true?message_modal=false:message_modal=true">message</v-icon>
           <v-icon @click.stop="dialog=true">calendar_today</v-icon>
        </div>
           
           </div>
           </div>
                   <div class="heightless"><div v-if="message_modal" class="spiel">
  <div  class="">
                    <div class="white-box todo">
                        <h3 class="box-title">To Do List</h3>
                                      
                        <div class="row">
                       
                            <div class="col-sm-12 col-xs-12">
                        <ul class="list-task list-group" data-role="tasklist">
                            <li class="list-group-item" data-role="task" :class="{'task-done':selected2.includes('meeting')}" >
                                <div class="checkbox checkbox-info" >
                                    <input type="checkbox" id="inputSchedule" name="inputCheckboxesSchedule" @click="taskDone" v-bind:checked="selected2.includes('meeting')" >
                                    <label for="inputSchedule" > <span >Schedule meeting</span> </label>
                                </div>
                            </li>
                            <li class="list-group-item" data-role="task">
                                <div class="checkbox checkbox-info">
                                    <input type="checkbox" id="inputCall" name="inputCheckboxesCall">
                                    <label for="inputCall"> <span>Give Purchase report</span> <span class="label label-danger">Today</span> </label>
                                </div>
                            </li>
            
                                
                            <li class="list-group-item" data-role="task">
                                <div class="checkbox checkbox-info">
                                    <input type="checkbox" id="inputBook" name="inputCheckboxesBook">
                                    <label for="inputBook"> <span>Book flight for holiday</span> </label>
                                </div>
                            </li>
         
                        </ul>
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
<div v-if="openNoteModal">
<div id="responsive-modal" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block; padding-right: 17px;" aria-modal="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="openNoteModal=false">×</button>
<h4 class="modal-title">Add New Note</h4>
</div>
<div class="modal-body">
<form>
    <div class="form-group">
        <label for="recipient-name" class="control-label">Title:</label>
        <input type="text" class="form-control" id="recipient-name" v-model="title">
    </div>
    <div class="form-group">
        <label for="message-text" class="control-label">Note:</label>
        <textarea class="form-control" id="message-text" v-model="notetext"></textarea>
    </div>
</form>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default waves-effect" data-dismiss="modal" @click="openNoteModal=false">Close</button>
<button type="button" class="btn btn-danger waves-effect waves-light" @click="saveNote()">Save changes</button>
</div>
</div>
</div>

</div>
<div class="modal-backdrop fade show"></div>
</div>
<div v-if="openEmailModal">
<div id="responsive-modal" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block; padding-right: 17px;" aria-modal="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="openEmailModal=false">×</button>
<h4 class="modal-title">Send Email</h4>
</div>
<div class="modal-body">
<form>
    <div class="form-group">
        <label for="recipient-name" class="control-label">Recipient</label>
        <input type="text" class="form-control" id="recipient-name" v-model="email">
    </div>
    <div class="form-group">
        <label for="subject" class="control-label">Subject</label>
        <input type="text" class="form-control" id="subject" v-model="subject">
    </div>
    <div class="form-group">
        <label for="message-text" class="control-label">Body</label>
        <textarea class="form-control" id="message-text" v-model="emailtext"></textarea>
    </div>
</form>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default waves-effect" data-dismiss="modal" @click="openEmailModal=false">Close</button>
<button type="button" class="btn btn-danger waves-effect waves-light" @click="saveEmail()">Send Email</button>
</div>
</div>
</div>

</div>
<div class="modal-backdrop fade show"></div>
</div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";



export default{
  name:"crm",
    data() {
    return {
      data: {
        
      },
      dialog:false,
      calendar_modal:false,
      message_modal:false,
      openNoteModal:false,
      openEmailModal:false,
      search:'',
      view:'ListView',
      vlead:{},
      title:'',
      notetext:'',
      email:'',
      subject:'',
      emailtext:'',
      page:1,
      page2:2,
      page3:3,
      gtoken:"",
      tokens:'',
      note_filter:"",
      currentTask:'',
          selected2: []
      
    
    }
  },
  computed: {
    ...mapState({
      leads: state => state.leads,    
      notes: state => state.leads.notes,   
      tasks: state => state.leads.tasks,   
      emails: state => state.leads.emails,  
      currentLead:state=>state.leads.currentlead,
      alltask:state=>state.leads.alltask
          })
  },
  mounted(){
      console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
    console.log(this.$auth)
   this.gtoken = this.$auth.getToken()
   this.tokens = JSON.parse(this.$auth.storage.getItem("tokens"))
   console.log(this.$route.params.id)
   if(this.$route.params.id!=undefined){
     this.loadLead()
     }
   },
  created() {
      console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
    this.getLeads({});
    console.log(this.leads.leads)
    if(this.$route.params.id != undefined){
    this.view = 'LeadView'
    let _this = this;
    //fetch("https://2020i.site/api2/leads/"+this.$route.params.id).then(res=>{return res.json()}).then(json=>{console.log(json);_this.loadLead(json)})
    this.getLeadById(this.$route.params.id)
    
   //console.log(this)
   //let ls  = this.leads.leads.filter(lead=>{return lead.id==this.$route.params.id})
 //console.log(ls)
    
   }
    this.getAllTask();
  },
  components: {
  },
  methods: {
    test(e){
      console.log(e)
    },
    taskDone(){
      
      this.selected2.includes('meeting') ? this.selected2.splice(this.selected2.indexOf('meeting'), 1) : this.selected2.push('meeting');
      console.log(this.selected2)
    },
                goBack(){
                this.$router.go(-1)
                console.log(this)
                this.view="ListView"
            },
    completeTask(id){
        console.log(id)
      fetch('/api2/tasks/'+id,{
        method:"PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({status:"complete"})
      })
      this.getAllTask();
      let g = this.currentLead;
      g.filter = {};
      this.getNotes(g);
      console.log("RELAD SCREEEEENNNNNNNN")
    },
      jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
},
      getIcon(text){
          if(text=="phone_call"){return 'phone'}
          return ''
      },
      newtest(text){
          console.log(text)
          if(text==="new"){return true}
          if(text==="pre_affiliate"){return true}
          if(text==="potential_patient"){return true}
          if(text==="potential_affiliate"){return true}
          return false
      },
    filternote(notes){
      return notes.filter(note=>{if(this.note_filter==""){return true} return note.status==this.note_filter})
    },
    saveNote(){
      let note ={};
      note.title = this.title;
      note.text = this.notetext
      console.log(this.vlead)
      let data = {};
      note.date_created = new Date()
      data.note = note;
      data.id = this.vlead.id
      
      data.filter = {"name":null};
     this.createNote(data)
    },
    saveTask(){
      let note ={};
      note.title = this.title;
      note.text = this.notetext
      console.log(this.vlead)
      let data = {};
      note.date_created = new Date()
      data.task = note;
      data.id = this.vlead.id
      
      data.filter = {"name":null};
     this.createTask(data)
    },
    changeLead(lead){
      console.log("CHANGE LEAD")
      console.log(lead)
      this.getLeadById(lead.id) 
      this.loadLead()
      
    },
    loadLead(){
        console.log("LUXXXXXXXXXXXXXXXXXXXXX")
    
      this.view = 'LeadView'
      this.vlead = this.currentLead
      let filter = {"name":null}
      let d  = {};
      d.filter = filter;
      console.log(this.currentLead)
      d.id = this.$route.params.id
      console.log(d)
      this.getNotes(d)
      //this.getEmails(lead)
    },
    getEmails(lead){
      console.log("HIT Gmail and get assocaited emails")
       

    },
    closeLead(){
      this.view="ListView"
    },
    regexLead(leads){
      console.log( leads.leads.length)
      let r = leads.leads.filter(lead=>{console.log(lead);return lead.first_name.includes(this.search) })
      if(r.length>0){
        return r
      }
      else{
        r =leads.leads.filter(lead=>{console.log(lead);return lead.last_name.includes(this.search) })
      }
      return r
    },
    filterLeads(name){
      console.log(name)
      return 
    },
    ...mapActions("leads", {
      getLeads: "getLeads",
      getNotes: "getNotes",
      createNote: "createNote",
      createTask:"createTask",
      getLeadById:"getLeadById",
      getAllTask:"getAllTask"
     }),
      handleSubmit(e){
        //post to website clear form
        //this.attachUserToForm(this.data)
        e.target.reset()
      }
  },
};

</script>