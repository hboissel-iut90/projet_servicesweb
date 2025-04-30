import Vue from 'vue'
import Vuex from 'vuex'
import {
  getLogoutInService,
  postConnectedService,
  postSignInService,
  postSignUpService
} from "@/services/connexion.service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false,
    isError: false,
    message: "",
    show: false
  },
  getters: {
  },
  mutations: {
    isConnected(state, msg) {
      state.auth = true;
      state.message = msg;
    },
    setLogin(state, result) {
      localStorage.setItem("token", result.token)
      state.message = result.message;
      state.auth = true;
      state.isError = false;
      state.show = true;
    },
    setLogout(state) {
      state.auth = false
    },
    setError(state, msg) {
      state.message = msg;
      state.isError = true;
      state.show = true;
    },
    showDialog(state){
      state.show = true
      setTimeout(()=>{state.show = false},3000)
    }
  },
  actions: {
    async isConnected({commit}){
      let result = await postConnectedService(localStorage.getItem("token"));
      if(result.auth){
        commit("isConnected", result.message)
      }
    },
    async login({commit}, credentials) {
      let result = await postSignInService(credentials);
      if (!result.error && result){
        commit('setLogin', result)
      }
      else {
        commit("setError", result.data)
      }
      commit('showDialog')
    },
    async signup({commit}, credentials) {
      let result = await postSignUpService(credentials);
      if (!result.error && result){
        commit('setLogin', result)
      }
      else {
        commit("setError", result.data)
      }
      commit('showDialog')
    },
    async logout({commit}) {
      let result = await getLogoutInService();
      if(result.auth === false){
        commit('setLogout')
      }
    }
  }
})
