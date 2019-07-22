const state = {
    user: null
}

const getters = {
    getUser: state => state.user
}

const mutations = {
    initUser(state, user) {
        state.user = user;
    }
}

const actions = {
    initUser({ commit }, user) {
        commit('initUser', user)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
