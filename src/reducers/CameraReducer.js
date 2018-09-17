import { Camera } from 'expo'
import * as types from '../actions/types'

const INITIAL_STATE = { hasPermission: null, type: Camera.Constants.Type.back, localImageUrl: '', error: '', processing: false, context: 'LOOK', component: 'CAMERA' }

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.CAMERA_STATUS_GRANTED:
      return { ...state, hasPermission: true }
    case types.CAMERA_STATUS_DENIED:
      return { ...state, hasPermission: false }
    case types.CHANGE_CAMERA_TYPE:
      return { ...state, type: action.payload }
    case types.TAKE_PHOTO:
      return { ...state, localImageUrl: '', error: '', processing: true }
    case types.PHOTO_TAKEN_SUCCESS:
      return { ...state, localImageUrl: action.payload, processing: false }
    case types.PHOTO_TAKEN_ERROR:
      return { ...state, error: action.payload, processing: false }
    case types.SET_CONTEXT:
      return { ...state, context: action.payload }
    case types.CLEAR_CONTEXT:
      return { ...state, context: '' }
    case types.CHANGE_RECORD_COMPONENT:
      return { ...state, component: action.payload }
    default:
      return state
  }
}
