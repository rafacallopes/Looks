import * as types from '../actions/types'

const INITIAL_STATE = {
  currentTag: { product: null, leftPositioning: null, topPositioning: null },
  selectedTags: [],
  imageUri: '',
  isImageTagging: false,
  isCreating: false,
  error: '',
  name: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.CREATE_TAG_INSTANCE:
      return { ...state, currentTag: action.payload, isImageTagging: true }
    case types.REMOVE_TAG_INSTANCE:
      return { ...state, currentTag: {product: null, leftPositioning: null, topPositioning: null}, isImageTagging: false }
    case types.CREATE_TAG:
      return { ...state, currentTag: {}, selectedTags: [...state.selectedTags, action.payload], isImageTagging: false }
    case types.REMOVE_TAG:
      return { ...state,  selectedTags: [...state.selectedTags.filter(tag => tag !== action.payload)] }
    case types.CHANGE_NAME:
      return { ...state, name: action.payload }
    case types.CREATE_LOOK:
      return { ...state, isCreating: true }
    case types.CREATE_LOOK_SUCCESS:
      return { ...INITIAL_STATE }
    case types.CREATE_LOOK_FAIL:
      return { ...state, error: action.payload, isCreating: false}
    default:
      return state
  }
}
