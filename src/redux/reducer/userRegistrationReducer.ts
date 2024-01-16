import * as Actions from '../actions/userRegistrationActions'

const initialState = {
   loading: false,
   error :  null,
   response : null
}

const userRegistrationReducer = (state = initialState, action : any) => {
    switch (action.type) {
      default:
        return state
    }
}

export default userRegistrationReducer
