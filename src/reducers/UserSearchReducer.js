import * as types from '../actions/types'

const INITIAL_STATE = { query: '', results: [], isSearching: false }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.SEARCH_USER:
      return { ...state, query: action.payload, isSearching: true }
    case types.SEARCH_USER_SUCCESS:
      return { ...state, results: action.payload, isSearching: false }
    case types.CREATE_CONVERSATION_SUCCESS:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
