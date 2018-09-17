import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CameraReducer from './CameraReducer'
import ProductFormReducer from './ProductFormReducer'
import ProductReducer from './ProductReducer'
import ProductNavigationReducer from './ProductNavigationReducer'
import GalleryReducer from './GalleryReducer'
import LookFormReducer from './LookFormReducer'
import ProductSearchReducer from './ProductSearchReducer'
import LookReducer from './LookReducer'
import MainReducer from './MainReducer'
import FeedReducer from './FeedReducer'
import ChatReducer from './ChatReducer'
import UserSearchReducer from './UserSearchReducer'
import ConversationReducer from './ConversationReducer'
import LikesReducer from './LikesReducer'
import CommentsReducer from './CommentsReducer'
import ContactReducer from './ContactReducer'

export default combineReducers({
  auth: AuthReducer,
  camera: CameraReducer,
  productForm: ProductFormReducer,
  product: ProductReducer,
  productNavigation: ProductNavigationReducer,
  gallery: GalleryReducer,
  lookForm: LookFormReducer,
  look: LookReducer,
  productSearch: ProductSearchReducer,
  main: MainReducer,
  feed: FeedReducer,
  chat: ChatReducer,
  userSearch: UserSearchReducer,
  conversation: ConversationReducer,
  likes: LikesReducer,
  comments: CommentsReducer,
  contact: ContactReducer
})
