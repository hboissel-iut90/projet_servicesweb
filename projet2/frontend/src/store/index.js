import Vue from 'vue'
import Vuex from 'vuex'
import {
  getAccessUserInService,
  postRefreshTokenService,
  postSignInService,
  postSignUpService
} from "@/services/connexion.service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false,
    isError: false,
    user: "",
    message: "",
    show: false
  },
  getters: {
  },
  mutations: {
    isConnected(state, msg) {
      state.auth = true;
      state.message = msg;
      state.isError = false;
      state.show = true
      state.user = localStorage.getItem("email")
    },
    setSignup(state, msg) {
      state.message = msg;
      state.isError = false;
      state.show = true
    },
    setLogin(state, data) {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("email", data.username)
      state.message = data.message;
      state.user = data.username;
      state.isError = false;
      state.auth = true;
      state.show = true
    },
    setRefreshToken(state, data){
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("accessToken", data.accessToken)
      state.auth = true;
      state.show = true
    },
    setError(state, msg) {
      state.message = msg;
      state.isError = true;
      state.show = true
    },
    setLogout(state) {
      localStorage.clear()
      state.auth = false
    },
    showDialog(state){
      setTimeout(()=>{state.show = false},3000)
    }
  },
  actions: {
    async isConnected({commit}){
      let result = await getAccessUserInService();
      if(!result.error && result){
        commit("isConnected", result.message)
      }
      else {
        commit("setError", result.data)
      }
      commit('showDialog')
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
        commit('setSignup', result)
      }
      else {
        commit("setError", result.data)
      }
      commit('showDialog')
    },
    async refreshToken({commit}){
      let refreshToken = localStorage.getItem("refreshToken")
      let result = await postRefreshTokenService({refreshToken: refreshToken});
      if (!result.error && result){
        commit('setRefreshToken', result)
      }
      else {
        commit("setError", result.data)
      }
      commit('showDialog')
    },
    logout({commit}) {
        commit('setLogout')
    }
  }
})
