import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
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
    store,
    render: h => h(App)
});

