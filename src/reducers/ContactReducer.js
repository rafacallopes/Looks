import * as types from '../actions/types'

const INITIAL_STATE = {
  username: "",
  fullname: "",
  email: "",
  phone: "",
  message: "",
  
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.USERNAME_ADDED:
      return { ...state, username: action.payload }
    case types.FULLNAME_ADDED:
      return { ...state, fullname: action.payload }
    case types.EMAIL_ADDED:
      return { ...state, email: action.payload }
    case types.PHONE_ADDED:
      return { ...state, phone: action.payload }
    case types.MESSAGE_ADDED:
      return { ...state, message: action.payload }
    
    default:
      return state
  }
}
