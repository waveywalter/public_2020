const state = {
    id:'',
    application: {},
    list:[],
    wholelist:[],
    currentAffiliate:{},
    currentStep:1,
};
const actions = {
};
const mutations = {
    getApps(){
        fetch('https://2020i.site/api/applications?filter[offset]=0&filter[limit]=100&filter[skip]=0&filter[where][approved][neq]=1')
        .then(response=>response.json())
        .then(json=>{
        let _tis = this;
          this.state.apps.list= json.filter(item=>{return _tis.state.id!=item.id})
        this.state.apps.wholelist = json;
          }
          )
      },
};
export const apps = {
    namespaced: true,
    state,
    actions,
    mutations
};
