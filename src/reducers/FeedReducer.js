import * as types from '../actions/types'
const INITIAL_STATE = { data: [], isLoading: false, error: '', userWantsToSeeFeed: false }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.OPEN_FEED:
      return { ...state, userWantsToSeeFeed: true }
    case types.GET_FEED:
      return { ...state, isLoading: true }
    case types.GET_FEED_SUCCESS:
      return { ...state, isLoading: false, data: action.payload }
    case types.GET_FEED_FAIL:
      return { ...state, isLoading: false, error: action.payload }
    case types.SEND_COMMENT_SUCCESS:
      let { postType, postId } = action.payload
      let newlyPosts = state.data.map(p =>
        p.id === postId && p.type === postType ? { ...p, comments: [...p.comments, action.payload] } : p
      )
      return { ...state, data: newlyPosts }
    default:
      return state
  }
}
