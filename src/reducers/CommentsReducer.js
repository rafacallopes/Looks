import * as types from '../actions/types'
const INITIAL_STATE = {
  comments: [],
  isLoading: false,
  newComment: '',
  targetId: null,
  targetType: '',
  error: '',
  isSending: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_COMMENTS_BY_ID:
      return { ...state, isLoading: true, newComment: '' }
    case types.GET_COMMENTS_BY_ID_SUCCESS:
      return { ...state, isLoading: false, comments: action.payload }
    case types.GET_COMMENTS_BY_ID_FAIL:
      return { ...state, isLoading: false, error: action.payload }
    case types.ADD_COMMENT:
      return { ...state, newComment: action.payload.input, targetId: action.payload.targetId, targetType: action.payload.targetType }
    case types.CLEAR_COMMENT:
      return { ...state, newComment: '', targetId: null, targetType: '' }
    case types.SEND_COMMENT:
      return { ...state, isSending: true }
    case types.SEND_COMMENT_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload], isSending: false, newComment: '' }
    case types.SEND_COMMENT_FAIL:
      return { ...state, error: action.payload, isSending: false }
    default:
      return state
  }
}
