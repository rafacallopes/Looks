import * as types from '../actions/types'

const INITIAL_STATE = { images: [], isLoading: false, error: '', selectedImageUri: '', cameraRollPermission: true }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.CAMERA_ROLL_PERMISSION_DENIED:
      return { ...state, cameraRollPermission: false }
    case types.FETCH_CAMERA_ROLL:
      return { ...state, images: action.payload, isLoading: true }
    case types.FETCH_CAMERA_ROLL_SUCCESS:
      return { ...state, images: action.payload.images, isLoading: false, error: '', selectedImageUri: action.payload.firstImageUri }
    case types.FETCH_CAMERA_ROLL_FAIL:
      return { ...state, error: action.payload, isLoading: false }
    case types.SELECT_IMAGE:
      return { ...state, selectedImageUri: action.payload }
    default:
      return state
  }
}
