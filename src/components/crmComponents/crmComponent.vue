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
    padding: 20px;
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
}
.flexible {
    display: flex;
}
div#meta {
    margin-top: 20px;
    width: -webkit-fill-available;
    border: thin solid;
    padding: 20px;
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
.fade {
    transition: opacity .15s linear;
}
.card.lead{
  height:fit-content;
}
.mainc{
  width:80% !important
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
    

    <div class="card-body">
    <div class="card-title"> {{lead.first_name}} {{lead.last_name}} 

                 <router-link class="view " :key="lead.id"  tag="li" :to="'/sales/crm/'+lead.id" @click.native="loadLead(lead)">
                  View
                </router-link>      
    </div>
    <div> {{lead.phone}} </div>
    <div> {{lead.email}} </div>
    <div> {{lead.type}} </div>
    <div> {{lead.notes}} </div>
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
    <div class="card-body">
    <div class="card-title"> {{vlead.first_name}} {{vlead.last_name}} 
    </div>
    <div> {{vlead.phone}} </div>
    <div> {{vlead.email}} </div>
    <div> {{vlead.type}} </div>
    <div> {{vlead.notes}} </div>
   <!-- <button class="btn btn-primary">Convert to Applicant</button> -->
   </div>


  
   </div>
<div id="meta">
     <div >Last Contact Date : Last Contact Method</div>
     
   <div class="flexible">  
    <div>
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
    <div>
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

         <div class="email" v-for="email in emails">
         <div class="flexible"><div class="mainc">
        <h4>{{email.subject}}</h4>
        <div>{{email.date_created | moment("dddd, MMMM Do YYYY")}}</div>
        <div>{{email.message}}</div>
        </div><div class="icons">
           <v-icon>delete</v-icon><v-icon>edit</v-icon>
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
      tokens:''
    };
  },
  computed: {
    ...mapState({
      leads: state => state.leads,    
      notes: state => state.leads.notes,   
      emails: state => state.leads.emails,   
          })
  },
  mounted(){
    console.log(this.$auth)
   this.gtoken = this.$auth.getToken()
   this.tokens = JSON.parse(this.$auth.storage.getItem("tokens"))
  
   },
  created() {
    this.getLeads({});
    if(this.$route.params.id != undefined){
     this.view = 'LeadView'
    console.log(this.leads.leads)
    let ls  = this.leads.leads.filter(lead=>{return lead.id==this.$route.params.id})
  console.log(ls)
      this.loadLead(ls[0]);
    }

  },
  components: {
  },
  methods: {
    filternote(notes){
      return notes.filter(note=>{return note.status=="New"})
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
    loadLead(lead){
      console.log(lead)
      this.view = 'LeadView'
      this.vlead = lead
      let filter = {"name":null}
      let d  = {};
      d.filter = filter;
      d.id = lead.id
      this.getNotes(d)
      this.getEmails(lead)
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
     }),
      handleSubmit(e){
        //post to website clear form
        //this.attachUserToForm(this.data)
        e.target.reset()
      }
  },
};

</script>