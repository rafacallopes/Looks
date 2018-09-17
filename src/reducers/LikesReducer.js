import * as types from '../actions/types'
const INITIAL_STATE = { likedPosts: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LIKE_POST:
      return { ...state, likedPosts: [...state.likedPosts, action.payload.post] }
    case types.UNLIKE_POST:
      if (action.payload.type === 'Product') {
        return { ...state, likedPosts: [...state.likedPosts.filter(post => post.id !== action.payload.post.id && post.images !== null )] }
      } else {
        return { ...state, likedPosts: [...state.likedPosts.filter(post => post.id !== action.payload.post.id && post.tags !== null )] }
      }
    case types.GET_FEED_SUCCESS:
      return { ...state, likedPosts: action.payload.filter(post => post.like !== null) }
      case types.SEND_COMMENT_SUCCESS:
        let { postType, postId } = action.payload
        let newlyPosts = state.likedPosts.map(p =>
          p.id === postId && p.type === postType ? { ...p, comments: [...p.comments, action.payload] } : p
        )
        return { ...state, likedPosts: newlyPosts }
    default:
      return state
  }
}
