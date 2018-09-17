import * as types from '../actions/types'

const INITIAL_STATE = { activeComponent: 'CAMERA' }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.CHANGE_PRODUCT_NAVIGATION_TAB:
      return { ...state, activeComponent: action.payload }
    default:
      return state
  }
}
