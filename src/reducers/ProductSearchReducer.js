import * as types from '../actions/types'

const INITIAL_STATE = { query: '', results: [], isSearching: false, isLoadingQuery: false }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.UPDATE_QUERY:
      return { ...state, query: action.payload, isSearching: true, isLoadingQuery: true }
    case types.UPDATE_QUERY_SUCCESS:
      return { ...state, results: action.payload, isLoadingQuery: false }
    case types.CREATE_TAG:
      return { ...INITIAL_STATE }
    case types.REMOVE_TAG_INSTANCE:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
