<style>
.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
}
i{
  cursor:pointer
}
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
            <v-icon v-if="newtest(lead.status)" class="newness">fiber_new</v-icon>     <router-link class="view " :key="lead.id"  tag="li" :to="'/sales/crm/'+lead.id" @click.native="loadLead(lead)">
                  View
                </router-link>      
    </div>
    <!-- <div> {{lead.phone}} </div>
    <div> {{lead.email}} </div>
    <div> {{lead.type}} </div>
    <div> {{lead.notes}} </div> -->
   <!-- <button class="btn btn-primary">Convert to Applicant</button> -->
   </div>
   </div>
  </div>
  </div>
 </div>
<div v-if="view==='LeadView'">
   <div class="flexible">
     <button class="btn btn-default" v-on:click="openNoteModal=true">Add Notes</button>
   <button v-on:click="openEmailModal=true" class="btn btn-default">Send Email</button>
   <button class="btn btn-default">Convert To Affiliate</button>
  <button  class="btn btn-default"><router-link to ="/crmpage">Back</router-link></button>

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
<v-icon>delete</v-icon><v-icon>edit</v-icon>
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
      :length="4"
       ></v-pagination>
      </div>  
   
         <div class="email" v-for="task in tasks">
         <div class="flexible"><div class="mainc">
        <h5><v-icon v-if="task.type=='phone_call'" class="blueg">phone</v-icon> {{task.title}}</h5>
        
        <div>{{task.date_created | moment("dddd, MMMM Do YYYY")}}</div>
        <div><v-icon v-if="task.status=='new'" class="blueg">fiber_new</v-icon></div>
        <div></div>
        </div><div class="icons">
           <v-icon>done</v-icon><v-icon>delete</v-icon>
           </div>
           </div>
      </div>
     </div> 
    </div>
    </div>
   </div>
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
      
    };
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
    this.loadLead()
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
    this.getAllTask();
   //console.log(this)
   //let ls  = this.leads.leads.filter(lead=>{return lead.id==this.$route.params.id})
 //console.log(ls)
    
   }

  },
  components: {
  },
  methods: {
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
      console.log( leads.leads)
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