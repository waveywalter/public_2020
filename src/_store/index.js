import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
        getState: (key) => JSON.parse(localStorage.getItem(key)), 
        setState: (key, state) => localStorage.setItem(key, JSON.stringify(state))
    })]
});
