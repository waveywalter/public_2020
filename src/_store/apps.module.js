const state = {
    application: {},
    list:[],
    wholelist:[]
};

const actions = {

};

const mutations = {
    getApps(){
        console.log("GETEMMMMMMMMMMMMMMMMMMM")
        fetch('https://jott.thewaveint.com/api/applications').then(response=>response.json()).then(json=>{console.log(json)
        
        console.log(this)
          this.state.apps.list= json.map(item=>{ if(true)return{lastname:item.lastname,firstname:item.firstname,email:item.email,id:item.id}})
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
