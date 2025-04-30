import {getRequest, postRequest} from "@/services/axios.service"

async function getAccessUserFromAPI(){
  return getRequest('access/user','GETACCESSUSER')
}

async function postSignInFromAPI(data) {
  return postRequest('auth/signin', data,'POSTSIGNIN')
}

async function postSignUpFromAPI(data) {
  return postRequest('auth/signup', data,'POSTSIGNUP')
}

async function postRefreshTokenFromAPI(data) {
  return postRequest('auth/refreshtoken', data,'POSTREFRESHTOKEN')
}
//////////////////////

async function getAccessUserInService() {
  return await getAccessUserFromAPI()
}

async function postSignInService(data) {
  return await postSignInFromAPI(data)
}

async function postSignUpService(data) {
  return await postSignUpFromAPI(data)
}

async function postRefreshTokenService(data) {
  return await postRefreshTokenFromAPI(data)
}

export {
  getAccessUserInService,
  postSignInService,
  postSignUpService,
  postRefreshTokenService
}