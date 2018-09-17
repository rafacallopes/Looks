import * as types from '../actions/types'

const INITIAL_STATE = {
  brandName: '',
  productName: '',
  purchaseLink: '',
  color: '',
  productType: '',
  facePart: '',
  pallete: '',
  description: '',
  productImages: [],
  isAdding: false,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.CHANGE_TEXT_INPUT:
      return { ...state, [action.payload.key]: action.payload.value }
    case types.ADD_IMAGE:
      return { ...state, productImages: [...state.productImages, action.payload] }
    case types.REMOVE_IMAGE:
      return { ...state, productImages: [...state.productImages.filter(imageUri => imageUri !== action.payload)] }
    case types.ADD_PRODUCT:
      return { ...state, isAdding: true, error: '' }
    case types.ADD_PRODUCT_SUCCESS:
      return { ...INITIAL_STATE }
    case types.ADD_PRODUCT_FAIL:
      return { ...state, isAdding: false, error: action.payload }
    case types.CLEAR_PRODUCT_FORM:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
