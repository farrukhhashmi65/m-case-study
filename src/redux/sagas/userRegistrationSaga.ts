import { takeLatest, call, put } from 'redux-saga/effects'
import * as Actions from '../actions/userRegistrationActions'
import { Network, Endpoints } from '../../networking'

// watcher
export function * watchUserRegistrationSaga (): any {
  yield takeLatest(
    Actions.REGISTER_USER_REQUEST,
    registerUser
  )
}

export function *registerUser (action: any): any {
  try {
    const absencesResponse = yield call(registerUserAPI, action)
    yield put(Actions.registerUserSuccess(absencesResponse)) 
  } catch (error) {
    yield put(Actions.registerUserFailure(error))
  }
}


export async function registerUserAPI (action: any): Promise<any> {
  const url = Endpoints.POST_REGISTER_USER
  const config: any = {
    method: 'POST',
    url,
    data: action.payload
  }
  return await Network.makeNetworkCall(config)
}
