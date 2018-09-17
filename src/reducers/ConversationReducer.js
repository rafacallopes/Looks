import * as types from '../actions/types'

const INITIAL_STATE = { messages: [], newMessage: '', isSending: false, receiver: {}, isWriting: false, isLoading: false }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_MESSAGES:
      return { ...state, isLoading: true }
    case types.GET_MESSAGES_SUCCESS:
      console.log("MESSAGES " + action.payload.messages)
      return { ...state, messages: action.payload.messages, isLoading: false, receiver: action.payload.receiverUser }
    case types.GET_MESSAGES_ERROR:
      return { ...state, isLoading: false }
    case types.WRITE_MESSAGE:
      return { ...state, isWriting: true, newMessage: action.payload }
    case types.DISMISS_MESSAGE:
      return { ...state, isWriting: false, newMessage: '' }
    case types.SEND_MESSAGE:
      return { ...state, isSending: true, isWriting: false }
    case types.SEND_MESSSAGE_SUCCESS:
      return { ...state, messages: [...state.messages, action.payload], newMessage: '', isSending: false, isWriting: false }
    case types.SEND_MESSAGE_FAIL:
      return { ...state, isSending: false, isWriting: true }
    default:
      return state
  }
}
