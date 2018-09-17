import * as types from '../actions/types'

const INITIAL_STATE = { conversations: [], isLoading: false, error: '', newlyConversation: {}, isDeleting: false }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_CONVERSATION:
      return { ...state, isLoading: true }
    case types.CREATE_CONVERSATION_SUCCESS:
      return { ...state, isLoading: false, newlyConversation: action.payload }
    case types.CREATE_CONVERSATION_FAIL:
      return { ...state, isLoading: false, error: action.payload }
    case types.GET_CONVERSATIONS:
      return { ...state, isLoading: true }
    case types.GET_CONVERSATIONS_SUCCESS:
      return { ...state, isLoading: false, conversations: action.payload }
    case types.GET_CONVERSATIONS_FAIL:
      return { ...state, isLoading: false, error: action.payload }
    case types.DELETE_CONVERSATION:
      return { ...state, isDeleting: true }
    case types.DELETE_CONVERSATION_SUCCESS:
      return { ...state, conversations: state.conversations.filter(conv => conv.id !== action.payload), isDeleting: false }
    case types.DELETE_CONVERSATION_FAIL:
      return { ...state, isDeleting: false, error: action.payload }
    default:
      return state
  }
}
