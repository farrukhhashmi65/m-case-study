import { takeLatest, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/userRegistrationActions'
import { Network, Endpoints } from '../../networking'
import axios from 'axios'

// watcher
export function * watchUserRegistrationSaga (): any {
  yield takeLatest(
    Actions.REGISTER_USER_REQUEST,
    registerUser
  )
}

export function *registerUser (action: any): any {
  try {
    const response = yield call(registerUserAPI, action)
    console.log("response", response)
    yield put(Actions.registerUserSuccess(response)) 
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log("response", error)
      yield put(Actions.registerUserFailure("Network Error"))
    } else{
      yield put(Actions.registerUserFailure(error))
    }
   
  }
}


export async function registerUserAPI (action: any): Promise<any> {
  const url = Endpoints.POST_REGISTER_USER
  const config: any = {
    method: 'POST',
    url,
    data: action.payload
  }
  console.log("config", config)
  return await Network.makeNetworkCall(config)
}
