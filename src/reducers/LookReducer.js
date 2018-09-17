import * as types from '../actions/types'
const INITIAL_STATE = { data: {}, isLoading: false, error: '' }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.GET_LOOK:
      return { ...state, isLoading: true }
    case types.GET_LOOK_SUCCESS:
      return { ...INITIAL_STATE, data: action.payload }
    case types.GET_LOOK_FAIL:
      return { ...INITIAL_STATE, error: action.payload }
    default:
      return state
  }
}
