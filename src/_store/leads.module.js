import { leadService } from '../_services/leads.service';
import { router } from '../_router';


const state = {
   status:{},
   leads:[],
   allleads:{},
   currentlead:{},
   notes:[],
   emails:[],
   task:[],
   tasks:[],
   alltask:[],

};

const actions = {

    // someFunction({commit},data){ perform mutation after action}
    getAllTask({dispatch,commit},id){
        leadService.getAllTask().then(tasks=>{console.log('WHYYYYYYYY',tasks);commit("getAllTaskSuccess",tasks)})
    },
    getLeadById({dispatch,commit},id){
        console.log(id)
        //leadService
        //commit('getFormsRequest');
        console.log("GET LEAD By ID",id)
        leadService.getLeadById(id)
            .then(
                lead => {console.log("SET CUREENTTTT");console.log(lead);commit("setCurrentLead",lead)}
            );
       // commit("getLeadsSuccess")
      
    },
    getLeads({dispatch,commit},filter){
        console.log(filter)
        //leadService
        //commit('getFormsRequest');
        console.log("GET LEADS 2",filter)
        leadService.getLeads(filter)
            .then(
                leads => commit('getLeadsSuccess', leads),
                error => commit('getFormsFailure', error)
            );
       // commit("getLeadsSuccess")
      
    },
    createLead({dispatch,commit},lead){
        leadService.createLead(lead).then(()=>{
            dispatch("getLeads",{name:''})
        }
        )
    },
    getNotes({dispatch,commit},d){
        console.log(d)
        //leadService
        //commit('getFormsRequest');
        console.log("GET Notes 2",d)
       leadService.getNotes(d.filter,d.id)
            .then(
                notes => commit('getNotesSuccess', notes),
                error => commit('getFormsFailure', error)
           );
       // commit("getLeadsSuccess")
    },
    createNote({dispatch,commit},d){
        console.log(d)
        leadService.createNote(d.note,d.id).then(()=>{
            dispatch("getNotes",d)
       })

    },
    createTask({dispatch,commit},d){
        console.log(d)
        leadService.createTask(d.note,d.id).then(()=>{
            dispatch("getNotes",d)
       })
    }
   
    
};

const mutations = {
        // call mutation after action use to set state
        getAllTaskSuccess(state,tasks){
            console.log("ALL TASK SUCCESS")
            console.log(tasks)
            state.alltask = tasks
        },
        setCurrentLead(state,lead){
            state.currentlead = lead;
        },
        getLeadsSuccess(state,leads){
        
            state.leads = leads;
        },
        getNotesSuccess(state,notes){
            console.log("GET NOTESSSSSS")
            console.log(state)
            state.notes = notes.notes;
            state.emails = notes.emails;
            state.tasks = notes.tasks;
        },
        getFormsFailure(state, error) {
            state.allforms = { error };
        },
};

export const leads = {
    namespaced: true,
    state,
    actions,
    mutations
};