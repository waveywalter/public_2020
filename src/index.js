import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';





Vue.use(VeeValidate);
Vue.component('modal', {
    template: '#modal-template'
  })

new Vue({
    //el: '#app',
    router,
    store,
    render: h => h(App)
}).mount('#app');

