import * as Actions from '../actions/userRegistrationActions'

const initialState = {
  loading: false,
  error: null,
  response: null
}

const userRegistrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        response: null
      };
    case Actions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case Actions.REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default userRegistrationReducer
