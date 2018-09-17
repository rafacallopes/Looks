import * as types from '../actions/types'

const INITIAL_STATE = {
  email: "",
  password: "",
  verificationPassword: "",
  userName: "",
  firstName: "",
  lastName: "",
  logginIn: false,
  user: null,
  error: "",
  isLoggingOut: false,
  verifyEmailWasSent: true,
  recoverIsSending: false,
  isRecoveringPassword: false,
  recoverEmail: ""
}


export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.EMAIL_CHANGED:


    return { ...state, email: action.payload }

    case types.PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case types.FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload }
    case types.LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload }
    case types.VERIFICATION_PASSWORD_CHANGED:
      return { ...state, verificationPassword: action.payload }
    case types.USER_NAME_CHANGED:
      return { ...state, userName: action.payload }
    case types.LOGIN_USER:
      return { ...state, logginIn: true }
    case types.LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case types.LOGIN_USER_FAIL:
      return { ...state, error: action.payload, logginIn: false, password: "" }
    case types.LOGOUT_USER_SUCCESS:
      return { ...state, logginIn: false }
    case types.VERIFY_EMAIL:
      return { ...state, verifyEmailWasSent: false }
    case types.VERIFY_EMAIL_SUCCESS:
      return { ...state, verifyEmailWasSent: true }
    case types.VERIFY_EMAIL_FAIL:
      return { ...state, error: action.payload, verifyEmailWasSent: true }
    case types.ACTIVATE_RECOVER_MODAL:
      return { ...state, isRecoveringPassword: true }
    case types.DEACTIVATE_RECOVER_MODAL:
      return { ...state, isRecoveringPassword: false }
    case types.RECOVER_PASSWORD:
      return { ...state, recoverIsSending: true }
    case types.RECOVER_PASSWORD_SUCCESS:
      return { ...state, recoverIsSending: false, isRecoveringPassword: false }
    case types.RECOVER_PASSWORD_FAIL:
      return { ...state, recoverIsSending: false, error: action.payload }
    case types.CHANGE_RECOVER_EMAIL:
      return { ...state, recoverEmail: action.payload }
    default:
      return state
  }
}
