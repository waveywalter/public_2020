import { userService } from '../_services';
import { router } from '../_router';
import * as Cookie from 'js-cookie';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    loco(){console.log("LOCOOOOOOOOOOOOOOO9")},
    login({ dispatch, commit }, { username, password }) {
        localStorage.removeItem('sessionMsg');
        commit('loginRequest', { username });
        console.log("LOGINNNNNNNNNNNNNNNNNN")
        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    //router.push('/admindashboard');
                    window.location.href = "/homepage";
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    update({ dispatch, commit }, userInfo ) {
    
        userService.update(userInfo)
            .then(
                user => {
                    commit('updateSuccess', user);
                    dispatch('alert/success', 'Update successfully', { root: true });
                    router.go();
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    // router.go();
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    updateSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};