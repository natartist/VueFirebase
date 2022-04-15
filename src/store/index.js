import { createStore } from 'vuex'
import { auth } from "../utils/firebase";
export default createStore({
  state: {
    user: undefined
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    realoadUser({ commit }) {
      auth.onAuthStateChanged( user => {
        console.log(user);
        commit("setUser", { ...user })
        
      })
    }
  },
  getters: {
  },
  modules: {
  }
})
