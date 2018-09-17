import * as types from '../actions/types'
const INITIAL_STATE = { isLoading: false, data: {}, error: '' }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.GET_PRODUCT:
      return { ...state, isLoading: true}
    case types.GET_PRODUCT_SUCCESS:
      return { ...INITIAL_STATE, data: action.payload }
    case types.GET_PRODUCT_FAIL:
      return { ...INITIAL_STATE, error: action.payload }
    default:
      return state
  }
}
