import { appService } from '../_services/apps.service';

const state = {
    id:'',
    application: {},
    list:[],
    wholelist:[],
    currentAffiliate:{},
    currentStep:1,
};
const actions = {
    getApps({ commit }, filter) {
        //commit('getappsRequest');
        appService.getApps(filter)
            .then(
                apps => commit('getappsSuccess', apps),
                error => commit('getappsFailure', error)
            );
    },
    getApp({ commit }, id) {
        //commit('getappsRequest');
        appService.getApp(id)
            .then(
                app => commit('getappSuccess', app),
                error => commit('getappFailure', error)
            );
    },
};
const mutations = {
    getappsSuccess(state,apps){
        state.list = apps;
        state.wholelist = apps;
    },
    getappsFailure(state,error){
        state.error = error;
        
    },
    getappSuccess(state,app){
        state.currentApp = app;
        state.application = app;
       // this.$store.state.apps.application
//        state.wholelist = apps;
    },
    getappsFailure(state,error){
        state.error = error;
        
    },

   /* getApps(){
        fetch('https://2020i.site/api/applications?filter[offset]=0&filter[limit]=100&filter[skip]=0&filter[where][approved][neq]=1')
        .then(response=>response.json())
        .then(json=>{
        let _tis = this;
          this.state.apps.list= json.filter(item=>{return _tis.state.id!=item.id})
        this.state.apps.wholelist = json;
          }
          )
      }, */
};
export const apps = {
    namespaced: true,
    state,
    actions,
    mutations
};
