import Vue from 'vue';
import VeeValidate from 'vee-validate';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)


import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'






import { store } from './_store';
import { router } from './_router';
import { authHeader } from './_helpers';
import App from './app/App';
import BootstrapVue from 'bootstrap-vue';
import { Dropdown } from 'bootstrap-vue/es/components';
import Print from 'vue-print-nb'
import VueHtmlToPaper from 'vue-html-to-paper';
import VueGAPI from "vue-gapi";
 
// create the 'options' object
const apiConfig = {
  apiKey: "Nop_ecwxiULZ8InNlAEpluA-",
  clientId: "26200945294-78ghvpfd0330ribamq2f0q84r3t7k0cu.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
  scope: "https://mail.google.com/"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};
 
// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
Vue.use(PerfectScrollbar);



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
    VIcon ,
    VDialog,
    VButton,
    VCard,
    VList,
    VCardTitle,
    VSlot,
    VCalendar,
    VSheet,
    VCheckbox,
    VDivider,
    VListTile,
    VListTileTitle,
    VListTileSubTitle,
    VListTileContent,
    VListTileAction,
    VCardText,
    VCardActions,
    VSpacer,
    VBtn,
    VLayout,
    VContainer,
    VSubheader


  } from 'vuetify/lib'
  import VueAxios from 'vue-axios'
  import VueAuthenticate from 'vue-authenticate'
  import axios from 'axios';
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
    VIcon,
    VDialog,
    VButton,
    VCard,
    VCardTitle,
    VSlot,
    VListTile,
    VListTileTitle,
    VListTileSubTitle,
    VListTileContent,
    VListTileAction,
    VCalendar,
    VSheet,
    VList,
    VCheckbox,
    VDivider,
    VCardText,
    VCardActions,
    VSpacer,
    VBtn,
    VLayout,
    VContainer,
    VSubheader,



  },
  directives: {
  //  Ripple
  }
})


Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://2020i.site', // Your API domain
  tokenName:"code",
  providers: {
    google: {
      clientId: '26200945294-78ghvpfd0330ribamq2f0q84r3t7k0cu.apps.googleusercontent.com',
      //redirectUri: 'https://2020i.site/' // Your client app URL
    }
  }
})





new Vue({
    el: '#app',
    router,
    authHeader,
    store,
    render: h => h(App)
});
