import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_router';
import { authHeader } from './_helpers';
import App from './app/App';
import BootstrapVue from 'bootstrap-vue';
import { Dropdown } from 'bootstrap-vue/es/components';
import Print from 'vue-print-nb'
import VueHtmlToPaper from 'vue-html-to-paper';
 
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
 
Vue.use(VueHtmlToPaper, options);
import Vuetify,{
    
    VApp,
    VPagination,
    VIcon

  } from 'vuetify/lib'

  import 'vuetify/src/stylus/app.styl'
  Vue.use(require('vue-moment'));
Vue.use(Print);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(Dropdown);
Vue.use(Vuetify, {
  components: {
    VApp,
    VPagination,
    VIcon
  },
  directives: {
  //  Ripple
  }
})





new Vue({
    el: '#app',
    router,
    authHeader,
    store,
    render: h => h(App)
});
console.log("INDEX VUEEEEEEEEEEEE")
// import { register } from 'register-service-worker';


//   register(`/pwabuilder-sw.js`, {
//     ready() {
//       console.log('App is being served from cache by a service worker.\n' +
//         'For more details, visit https://goo.gl/AFskqB');
//     },
//     cached() {
//       console.log('Content has been cached for offline use.');
//     },
//     updated() {
//       console.log('New content is available; please refresh.');
//     },
//     offline() {
//       console.log('No internet connection found. App is running in offline mode.');
//     },
//     error(error) {
//       console.error('Error during service worker registration:', error);
//     },
//   });



