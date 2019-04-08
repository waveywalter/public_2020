const state = {
    id:'',
    application: {},
    list:[],
    wholelist:[],
    currentAffiliate:{}
};

const actions = {

};

const mutations = {
    getApps(){
        console.log("GETEMMMMMMMMMMMMMMMMMMM")
        fetch('https://2020i.site/api/applications').then(response=>response.json()).then(json=>{console.log(json)
        let _tis = this;
        console.log(this)
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
