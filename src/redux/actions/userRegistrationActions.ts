export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'

export const registerUserRequest = (payload: any): any => {
  return ({
    type: REGISTER_USER_REQUEST,
    payload
  })
}

export const registerUserSuccess = (payload: any): any => {
  return ({
    type: REGISTER_USER_SUCCESS,
    payload
  })
}

export const registerUserFailure = (payload: any): any => {
  return ({
    type: REGISTER_USER_FAILURE,
    payload
  })
}


