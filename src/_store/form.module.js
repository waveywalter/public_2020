import { formService } from '../_services/form.service';
import { router } from '../_router';
import * as Cookie from 'js-cookie';

const state = {
   status:{},
   allforms:{},
   formdata:null,
   userForms:[],
   current_signed_form:""
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
    updateform({ dispatch, commit }, formdata) {    
        formService.updateform(formdata)
            .then(
                Form => {
                    commit('updateFormSuccess', Form);
                    router.go();
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Update form successful', { root: true });
                    })
                },
                error => {
                    commit('updateFormFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    saveform({ dispatch, commit }, formdata) {
        commit('saveFormRequest');
    
        formService.saveform(formdata)
            .then(
                Form => {
                    commit('saveFromSuccess', Form);
                    // router.go();
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Save form successful', { root: true });
                    })
                },
                error => {
                    commit('saveFromFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    getformbyid({ commit }, id) {
        formService.getformbyid(id)
            .then(
                formdata => commit('getFromSuccess', formdata),
                error => commit('getFormFailure', error)
            );
    },
    deleteform({ commit }, id) {
        commit('deleteFormRequest', id);

        formService.deleteform(id)
            .then(
                form => commit('deleteFormSuccess', id),
                error => commit('deleteFormFailure', { id, error: error.toString() })
            );
    },
    getforms({ commit }, filter) {
        commit('getFormsRequest');
        formService.getforms(filter)
            .then(
                forms => commit('getFormsSuccess', forms),
                error => commit('getFormsFailure', error)
            );
    },
    attachUserToForm({commit},data){
        formService.attachUserToForm(data)
        console.log(data)
    },
    getUserForms({commit},id){

        formService.getFormsByUser(id,this.state.account.user.id).then(
            forms=>commit("getUserFormsSuccess",forms)
        )
       

    }
    
    
};

const mutations = {
    getUserFormsSuccess(state,userForms){
        state.userForms = userForms
    },
    updateFormSuccess(state, forminfo) {
        state.status = {};
    },
    updateFormFailure(state, error) {
        state.status = {};
    },
    saveFormRequest(state) {
        state.status = { savingform: true };
    },
    saveFromSuccess(state) {
        state.status = {};
    },
    saveFromFailure(state, error) {
        state.status = {};
    },
    getFromSuccess(state, forminfo) {
        state.formdata = forminfo;
    },
    getFormFailure(state, error) {
        state.formdata = { error };
    },
    getFormsRequest(state) {
        state.allforms = { loading: true };
    },
    getFormsSuccess(state, forms) {
        state.allforms = { items: forms };
    },
    getFormsFailure(state, error) {
        state.allforms = { error };
    },
    deleteFormRequest(state, id) {
        // add 'deleting:true' property to form being deleted
        state.allforms.items = state.allforms.items.map(form =>
            form.id === id
                ? { ...form, deleting: true }
                : form
        )
    },
    deleteFormSuccess(state, id) {
        // remove deleted form from state
        state.allforms.items = state.allforms.items.filter(form => form.id !== id)
    },
    deleteFormFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.allforms.items = state.items.map(form => {
            if (form.id === id) {
                // make copy of form without 'deleting:true' property
                const { deleting, ...formCopy } = form;
                // return copy of form with 'deleteError:[error]' property
                return { ...formCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const form = {
    namespaced: true,
    state,
    actions,
    mutations
};