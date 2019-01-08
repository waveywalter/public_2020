import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookie from 'js-cookie';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users
    },
    plugins: [createPersistedState({
        paths: ['alert.message'],
        getState: (key) => Cookie.getJSON(key), 
        setState: (key, state) => Cookie.set(key, state, { expires: 1, secure: false })
    })]
});
