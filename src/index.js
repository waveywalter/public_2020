import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import '../src/assets/bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css'
import '../src/assets/plugins/bower_components/toast-master/css/jquery.toast.css'
import '../src/assets/css/animate.css'
import '../src/assets/css/colors/default-dark.css'



Vue.use(VeeValidate);


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
