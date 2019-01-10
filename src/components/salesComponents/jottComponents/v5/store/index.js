import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      progress: 0,
      email:'',
      appid:'',
      name:'',
      address:'',
      phone:'',
      practice_type:'',
      therapist_type:'',
      ssn:'',
      sign1:"",
      sign2:'',
      sign3:'',
      sign4:'',
      sign5:'',
      sign6:'',
      sign7:'',
      sign8:'',
      id:'',
      resume:0,
      license:0,
      ces:0,
      liability:0,
      role:"affiliate",
      visible:1,
      s1:0,
      s2:0,
      s3:0,
      s4:0,
      s5:0,
      s6:0,
      s7:0,
      s8:0,
      approved:0,

    },

    actions: {
      increment({commit}){
        commit('increment')
      },
      getProgress({commit , lastKnown}){
        commit('getProgress',lastKnown)
      }
    },

    mutations: {
      increment (state) {
        // mutate state
        window.sessionStorage.progress = state.progress;
        console.log('store');
        console.log(state.progress);
        //skip authentication for now
        if(state.progress==0){
          console.log('store-1');
          //state.progress=1;
          //this.$store.commit('increment')
          window.sessionStorage.progress = this.progress; 
        }
        state.progress++
      },
      getProgress(state,lk){
        state.progress=lk
      },

    },

    getters: {}
  })
}