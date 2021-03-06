import { userService } from '../_services';

const state = {
    all: {},
    
};

const actions = {
    helloWorld(){
    alert("loml")
    },

    getAll({ commit }, filter) {
        commit('getAllRequest');
        userService.getAll(filter)
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);
        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    },
    update({ commit }, id) {
        commit('patchSuccess', id);

        userService.update(id)
            .then(
                user => commit('patchSuccess', user),
            //    error => commit('deleteSuccess', { id, error: error.toString() })
            );
    }
};

const mutations = {
    patchSuccess(state,user){
        state.account.user.user = user
    },
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
