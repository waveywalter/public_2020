import { formService } from '../_services/form.service';
import { router } from '../_helpers';
import * as Cookie from 'js-cookie';

const state = {
   status:{},
   formdata:null
};

const actions = {
    // update({ dispatch, commit }, userInfo ) {
    
    //     userService.update(userInfo)
    //         .then(
    //             user => {
    //                 commit('updateSuccess', user);
    //                 dispatch('alert/success', 'Update successfully', { root: true });
    //                 router.go();
    //             },
    //             error => {
    //                 commit('loginFailure', error);
    //                 dispatch('alert/error', error, { root: true });
    //             }
    //         );
    // },
    saveform({ dispatch, commit }, formdata) {
        commit('saveFormRequest');
    
        formService.saveform(formdata)
            .then(
                hrForm => {
                    commit('saveFromSuccess', hrForm);
                    // router.go();
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('saveFromFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    getform({ commit }) {
        formService.getform()
            .then(
                formdata => commit('getFromSuccess', formdata),
                error => commit('getFormFailure', error)
            );
    },
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
    saveFormRequest(state) {
        state.status = { savingform: true };
    },
    saveFromSuccess(state, user) {
        state.status = {};
    },
    saveFromFailure(state, error) {
        state.status = {};
    },
    getFromSuccess(state, forminfo) {
        state.formdata = forminfo;
    },
    getFormFailure(state, error) {
        state.all = { error };
    },
};

export const form = {
    namespaced: true,
    state,
    actions,
    mutations
};