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
        leadService.getAllTask().then(tasks=>{
            commit("getAllTaskSuccess",tasks)
        })
    },
    getLeadById({dispatch,commit},id){
        //leadService
        //commit('getFormsRequest');
        leadService.getLeadById(id)
            .then(
                lead => {
                    commit("setCurrentLead",lead)
                }
            );
       // commit("getLeadsSuccess")
      
    },
    getLeads({dispatch,commit},filter){
        //leadService
        //commit('getFormsRequest');
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
        //leadService
        //commit('getFormsRequest');
       leadService.getNotes(d.filter,d.id)
            .then(
                notes => commit('getNotesSuccess', notes),
                error => commit('getFormsFailure', error)
           );
       // commit("getLeadsSuccess")
    },
    createNote({dispatch,commit},d){
        leadService.createNote(d.note,d.id).then(()=>{
            dispatch("getNotes",d)
       })

    },
    createTask({dispatch,commit},d){
        leadService.createTask(d.note,d.id).then(()=>{
            dispatch("getNotes",d)
       })
    }
   
    
};

const mutations = {
        // call mutation after action use to set state
        getAllTaskSuccess(state,tasks){
            state.alltask = tasks
        },
        setCurrentLead(state,lead){
            state.currentlead = lead;
        },
        getLeadsSuccess(state,leads){
            state.leads = leads;
        },
        getNotesSuccess(state,notes){
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