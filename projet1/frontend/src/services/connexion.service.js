import {getRequest, postRequest} from "@/services/axios.service"

async function getLogoutFromAPI() {
  return getRequest('/logout','GETLOGOUT')
}

async function postSignInFromAPI(data) {
  return postRequest('/signin', data,'POSTSIGNIN')
}

async function postSignUpFromAPI(data) {
  return postRequest('/signup', data,'POSTSIGNUP')
}

async function postConnectedFromAPI(data) {
  return postRequest('/logged', data,'POSTLOGGED')
}
//////////////////////

async function getLogoutInService() {
  return await getLogoutFromAPI()
}

async function postSignInService(data) {
  return await postSignInFromAPI(data)
}

async function postSignUpService(data) {
  return await postSignUpFromAPI(data)
}

async function postConnectedService(data) {
  return await postConnectedFromAPI(data)
}

export {
  getLogoutInService,
  postSignInService,
  postSignUpService,
  postConnectedService
}