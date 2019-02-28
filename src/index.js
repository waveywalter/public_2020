import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_router';
import { authHeader } from './_helpers';
import App from './app/App';
import {
    Vuetify,
    VApp,
    VNavigationDrawer,
    VFooter,
    VCheckbox,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VForm,
    VTextField,
    VTabs,
    VDatePicker,
  VSelect,
    transitions
  } from 'vuetify'


Vue.use(VeeValidate);


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



