import * as types from '../actions/types'

const INITIAL_STATE = { currentTab: 'FEED' }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.SELECT_TAB:
      return { ...state, currentTab: action.payload }
    case types.LOGOUT_USER_SUCCESS:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
