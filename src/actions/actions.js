import * as types from './types'
import firebase from 'firebase'
import { CameraRoll, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Facebook, Camera, Permissions } from 'expo'
import axios from 'axios'
import { v1 } from 'uuid'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'


let sendProduct = async (obj, uploadedImageURLStrings, callback) => {
  let response = await createProductOnServer(obj, uploadedImageURLStrings)
  callback({product: response.data})
}


let createProduct = async (localImageURLStrings, uploadedImageURLStrings, obj, callback) => {
  if (localImageURLStrings.length === 0) {
    sendProduct(obj, uploadedImageURLStrings, (resp) => {
      if (resp.product) {
        callback(resp.product, null)
      } else {
        callback(null, {"error": "network error"})
      }
    })
  } else {
    let AWS_S3_KEY = getFormattedImageName()
    let currentImageURLString = localImageURLStrings.pop()
    sendToAWS(currentImageURLString, AWS_S3_KEY,(resp) => {
      if (resp.url) {
        uploadedImageURLStrings.push(resp.url)
        createProduct(localImageURLStrings, uploadedImageURLStrings, obj, callback)
      } else {
        callback(null, {"error": "network error"})
      }
    });
  }
}

sendToAWS = async (URLString, s3Key, callback) => {
  try {
    AWS.config.update({
      region: 'us-east-2',
      accessKeyId: 'AKIAJRYLVY37G2OLD6KA',
      secretAccessKey: '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',
    })

    const s3 = new AWS.S3()

    const s3Url = await s3.getSignedUrl('putObject', {
      Bucket: 'insta-brand',
      Key: s3Key.concat('.jpg'),
      ContentType: 'image/jpeg'
    })

    let imageUrl = `https://s3.us-east-2.amazonaws.com/insta-brand/${s3Key}.jpg`

    const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback({url: imageUrl})
          }
        }
      }
    xhr.open('PUT', s3Url)
    xhr.setRequestHeader('Content-Type', 'image/jpeg')
    xhr.send({ uri: URLString, type: 'image/jpeg', name: s3Key.concat('.jpg') })
    } catch (e) {
     callback({error: e})
    }
}

export const emailChanged = (input) => {
  var value = input;
  var newStr = value.replace(/\s+/g, '');
  console.log(newStr);
    return { type: types.EMAIL_CHANGED, payload: newStr }
  }

export const passwordChanged = (input) => {
  return { type: types.PASSWORD_CHANGED, payload: input }
}

export const firstNameChanged = input => {
  return { type: types.FIRST_NAME_CHANGED, payload: input }
}

export const lastNameChanged = input => {
  return { type: types.LAST_NAME_CHANGED, payload: input }
}

export const userNameChanged = input => {
  return { type: types.USER_NAME_CHANGED, payload: input }
}

export const verificationPasswordChanged = input => {
  return { type: types.VERIFICATION_PASSWORD_CHANGED, payload: input }
}

export const signupUser = ({email, password, firstName, lastName, userName}) => {
  email = email.trim()
  return (dispatch) => {
    dispatch({ type: types.LOGIN_USER })
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(FBUser => {
        let user = { uid: FBUser.uid, userName, firstName, lastName, email: FBUser.email }
        newlyCreateUserOnServer(dispatch, user)
        sendEmailVerification(dispatch)
      })
      .catch(error => loginUserFail(dispatch, error.message))
  }
}

export const loginUser = ({ email, password }) => {
  email = email.trim()
  return (dispatch) => {
    dispatch({ type: types.LOGIN_USER })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( user => loginUserSuccess(dispatch, user) )
      .catch(error => loginUserFail(dispatch, error.message))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    Actions.auth()
    firebase.auth().signOut()
      .then(() => userIsNotLoggedIn(dispatch))
  }
}

export const facebookLogin = () => {
  return async (dispatch) => {
    let response = await openFBLogin()
    if (response.type === 'success') {
      loginFBUserOnFirebase(response.token)
        .then(user => createUserOnServer(dispatch, user) )
        .catch(error => loginUserFail(dispatch, error.message))
    } else {
      dispatch({ type: types.LOGIN_USER_FAIL })
    }
  }
}

export const checkUserOnLocalStorage = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        userIsLoggedIn(dispatch, user)
      } else {
        userIsNotLoggedIn(dispatch)
      }
    })
  }
}

export const cameraStatusChanged = (status) => {
  let cameraAccess = status === 'granted'
  if (cameraAccess) {
    return { type: types.CAMERA_STATUS_GRANTED }
  } else {
    return { type: types.CAMERA_STATUS_DENIED }
  }
}

export const cameraTypeChanged = (currentType) => {
  let newType = currentType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
  return { type: types.CHANGE_CAMERA_TYPE, payload: newType }
}

export const takePhoto = () => {
  return { type: types.TAKE_PHOTO }
}

export const onPhotoSuccess = (fileUri, context) => {
  if (context === 'LOOK') {
    Actions.lookEditor()
  } else {
    Actions.productEditor()
  }
  return { type: types.PHOTO_TAKEN_SUCCESS, payload: fileUri.uri }
}

export const onPhotoError = (error) => {
  return { type: types.PHOTO_TAKEN_ERROR, error: error }
}

export const changeTextInput = (key, value) => {
  let payload = { key, value }
  return { type: types.CHANGE_TEXT_INPUT, payload: payload }
}

export const addImage = (uri, context) => {
  if (context === 'LOOK') {
    Actions.lookEditor()
    return { type: types.PHOTO_TAKEN_SUCCESS, payload: uri }
  } else {
    Actions.productForm()
    return { type: types.ADD_IMAGE, payload: uri }
  }
}

export const removeImage = (uri) => {
  return { type: types.REMOVE_IMAGE, payload: uri }
}

export const addProduct = (payload) => {
  return (dispatch) => {
    dispatch({ type: types.ADD_PRODUCT })
    createProduct(payload.productImages, [], payload, (createdProduct, error) => {
      if (error !== null) {
        dispatch({ type: types.ADD_PRODUCT_FAIL, payload: error })
      } else {
        dispatch({ type: types.ADD_PRODUCT_SUCCESS, payload: createdProduct })
        Actions.productInfo({ post: createdProduct })
      }
    })
  }
}

export const getProductBy = (id) => {
  return (dispatch) => {
    dispatch({ type: types.GET_PRODUCT })
    getProductOnServer(dispatch, id)
      .then(response => dispatch({ type: types.GET_PRODUCT_SUCCESS, payload: response.data }))
      .catch(error => dispatch({ type: types.GET_PRODUCT_FAIL, payload: error }))
  }
}

export const changeNavigationTab = (nextTab) => {
  return { type: types.CHANGE_PRODUCT_NAVIGATION_TAB, payload: nextTab }
}

export const fetchImagesFromCameraRoll = () => {
  return async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      return dispatch({ type: types.CAMERA_ROLL_PERMISSION_DENIED })
    }
    dispatch({ type: types.FETCH_CAMERA_ROLL})
    CameraRoll.getPhotos({ first: 40 })
      .then(images => {
        let payload = { images: images.edges, firstImageUri: images.edges[0].node.image.uri }
        dispatch({ type: types.FETCH_CAMERA_ROLL_SUCCESS, payload: payload })
      })
      .catch(error => dispatch({ type: types.FETCH_CAMERA_ROLL_FAIL, payload: error }))
  }
}

export const selectImage = (image) => {
  return { type: types.SELECT_IMAGE, payload: image }
}

export const createTag = (tag) => {
  return { type: types.CREATE_TAG_INSTANCE, payload: tag }
}

export const consolidateTag = (tag) => {
  return { type: types.CREATE_TAG, payload: tag }
}

export const queryProducts = (query) => {
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_QUERY, payload: query })
    let queryResult = await axios.get(`http://aqueous-scrubland-84530.herokuapp.com/products/search/${query}`)
    dispatch({type: types.UPDATE_QUERY_SUCCESS, payload: queryResult.data})
  }
}

export const queryUsers = (query) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SEARCH_USER, payload: query })
      let queryResult = await queryUserOnServer(query)
      dispatch({type: types.SEARCH_USER_SUCCESS, payload: queryResult.data})
    } catch (error) {
      dispatch({ type: types.SEARCH_USER_FAIL, payload: error })
    }
  }
}

export const removeTagInstance = () => {
  return { type: types.REMOVE_TAG_INSTANCE }
}

export const removeTag = (tag) => {
  return { type: types.REMOVE_TAG, payload: tag }
}

export const createLook = (look) => {
  let AWS_S3_KEY = getFormattedImageName()
  return (dispatch) => {
    dispatch({ type: types.CREATE_LOOK })
    sendToAWS(look.imageUri, AWS_S3_KEY, (resp) => {
      if (resp.url) {
        createLookOnServer(dispatch, look, resp.url)
          .then((response) => {
            Actions.lookInfo({post: response.data})
            dispatch({type: types.CREATE_LOOK_SUCCESS})
          })
          .catch((error) =>  dispatch({type: types.CREATE_LOOK_FAIL, payload: error}))
      } else {
        dispatch({ type: types.CREATE_LOOK_FAIL, payload: "Look could not be created" })
      }
    })
  }
}

export const getLookBy = (id) => {
  return (dispatch) => {
    dispatch({type: types.GET_LOOK})
    getLookOnServer(dispatch, id)
    .then(look => dispatch({ type: types.GET_LOOK_SUCCESS, payload: look.data }))
    .catch(error => dispatch({ type: types.GET_LOOK_FAIL, payload: error }))
  }
}

export const selectTab = (tab) => {
  return { type: types.SELECT_TAB, payload: tab }
}

export const changeTitle = (title) => {
  return { type: types.CHANGE_NAME, payload: title }
}

export const setContext = (context) => {
  return { type: types.SET_CONTEXT, payload: context }
}

export const clearContext = () => {
  return { type: types.CLEAR_CONTEXT, payload: '' }
}

export const getFeed = () => {
  return (dispatch) => {
    dispatch({ type: types.GET_FEED })
    getFeedOnServer()
      .then(result => dispatch({ type: types.GET_FEED_SUCCESS, payload: result.data }))
      .catch(error => dispatch({ type: types.GET_FEED_FAIL, payload: error }))
  }
}

export const sendEmailVerification = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.VERIFY_EMAIL })
      let result = await firebase.auth().currentUser.sendEmailVerification()
      dispatch({ type: types.VERIFY_EMAIL_SUCCESS })
    } catch (error) {
      dispatch({ type: types.VERIFY_EMAIL_FAIL, payload: error })
    }
  }
}

export const sendPasswordRecovery = (emailAddress) => {
  return (dispatch) => {
    dispatch({ type: types.RECOVER_PASSWORD })
    firebase.auth().sendPasswordResetEmail(emailAddress)
      .then(() => {
        dispatch({ type: types.RECOVER_PASSWORD_SUCCESS })
        Alert.alert("A recovery password email was sent to your inbox, check it out.")
      })
      .catch(error => dispatch({ type: types.RECOVER_PASSWORD_FAIL, payload: error }))
  }
}

export const activateRecoverModal = () => {
  return { type: types.ACTIVATE_RECOVER_MODAL }
}

export const deactivateRecoverModal = () => {
  return { type: types.DEACTIVATE_RECOVER_MODAL }
}

export const recoveryEmailChanged = (email) => {
  return { type: types.CHANGE_RECOVER_EMAIL, payload: email }
}

export const clearProductForm = () => {
  return { type: types.CLEAR_PRODUCT_FORM }
}

export const getConversations = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_CONVERSATIONS })
      let { data } = await getConversationsOnServer()
      dispatch({ type: types.GET_CONVERSATIONS_SUCCESS, payload: data })
    } catch (error) {
      console.log(error)
      dispatch({ type: types.GET_CONVERSATIONS_FAIL, payload: error })
    }
  }
}

export const createConversation = (receiverId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.CREATE_CONVERSATION })
      let result = await createConversationOnServer(receiverId)
      dispatch({ type: types.CREATE_CONVERSATION_SUCCESS, payload: result.data })
      Actions.conversation({conversation: result.data})
    } catch (error) {
      dispatch({ type: types.CREATE_CONVERSATION_FAIL, payload: error })
    }
  }
}

export const writeMessage = message => {
  return { type: types.WRITE_MESSAGE, payload: message }
}

export const dismissMessage = () => {
  return { type: types.DISMISS_MESSAGE }
}

export const sendMessage = payload => {
  return async dispatch => {
    try {
      dispatch({ type: types.SEND_MESSAGE })
      let result = await createMessageOnServer(payload)
      dispatch({ type: types.SEND_MESSSAGE_SUCCESS, payload: result.data })
    } catch (error) {
      dispatch({ type: types.SEND_MESSAGE_FAIL })
    }
  }
}

export const getConversation = payload => {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_MESSAGES })
      let result = await getMessagesOnServer(payload)
      dispatch({ type: types.GET_MESSAGES_SUCCESS, payload: result.data })
    } catch (error) {
      dispatch({ type: types.GET_MESSAGES_ERROR })
    }
  }
}

export const deleteConversation = id => {
  return async dispatch => {
    dispatch({ type: types.DELETE_CONVERSATION })
    try {
      let result = await deleteConversationOnServer(id)
      dispatch({ type: types.DELETE_CONVERSATION_SUCCESS, payload: id })
    } catch (error) {
      dispatch({ type: types.DELETE_CONVERSATION_FAIL, payload: error })
    }
  }
}

export const likePost = payload => {
  return async dispatch => {
    dispatch({ type: types.LIKE_POST, payload: payload })
    await createLikeOnServer(payload)
  }
}

export const unlikePost = payload => {
  return async dispatch => {
    dispatch({ type: types.UNLIKE_POST, payload: payload })
    await unlikeOnServer(payload)
  }
}

export const getCommentsById = payload => {
  return async dispatch => {
    try {
      dispatch({ type: types.GET_COMMENTS_BY_ID })
      let result = await getCommentsByIdOnServer(payload)
      dispatch({ type: types.GET_COMMENTS_BY_ID_SUCCESS, payload: result.data })
    } catch (error) {
      dispatch({ type: types.GET_COMMENTS_BY_ID_FAIL, payload: error })
    }
  }
}

export const addComment = data => {
  return { type: types.ADD_COMMENT, payload: data }
}

export const sendComment = payload => {
  return async dispatch => {
    try {
      dispatch({ type: types.SEND_COMMENT })
      let result = await sendCommentOnServer(payload)
      dispatch({ type: types.SEND_COMMENT_SUCCESS, payload: result.data })
    } catch (error) {
      Alert.alert(error)
      dispatch({ type: types.SEND_COMMENT_FAIL, payload: error })
    }
  }
}

export const clearComment = () => {
  return { type: types.CLEAR_COMMENT }
}

export const openFeed = () => {
  return { type: types.OPEN_FEED }
}

export const changeComponent = component => {
  return { type: types.CHANGE_RECORD_COMPONENT, payload: component }
}

//Contact Reducer

export const usernameAdded = input => {
  return { type: types.USERNAME_ADDED, payload: input}
}
export const fullnameAdded = input => {
  return { type: types.FULLNAME_ADDED, payload: input}
}
export const emailAdded = input => {
  return { type: types.EMAIL_ADDED, payload: input}
}
export const phoneAdded = input => {
  return { type: types.PHONE_ADDED, payload: input}
}
export const messageAdded = input => {
  return { type: types.MESSAGE_ADDED, payload: input}
}

//HELPERS

const getCredentialsOnServer = async user => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/${user.uid}/credentials`, {
    headers: { token: idToken }
  })
}

const sendCommentOnServer = async payload => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: 'POST',
    url: 'http://aqueous-scrubland-84530.herokuapp.com/comments',
    data: {
      postType: payload.type,
      postId: payload.postId,
      userUid: currentUser.uid,
      payload: payload.comment
    },
    headers: { token: idToken }
  })
}

const getCommentsByIdOnServer = async payload => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios.get(`http://aqueous-scrubland-84530.herokuapp.com/feed/${payload.postType}/${payload.postId}/comments`)
}

const createLikeOnServer = async payload => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "POST",
    url: 'http://aqueous-scrubland-84530.herokuapp.com/likes',
    data: {
      postType: payload.type,
      postId: payload.post.id,
      userUid: currentUser.uid
    },
    headers: {
      token: idToken
    }
  })
}

const unlikeOnServer = async payload => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "DELETE",
    url: `http://aqueous-scrubland-84530.herokuapp.com/likes`,
    data: {
      postType: payload.type,
      postId: payload.post.id,
      userUid: currentUser.uid
    },
    headers: {
      token: idToken
    }
  })
}

const deleteConversationOnServer = async id => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "DELETE",
    url: 'http://aqueous-scrubland-84530.herokuapp.com/groups',
    data: {
      groupId: id,
      userUid: currentUser.uid
    },
    headers: {
      token: idToken
    }
  })
}

const getMessagesOnServer = async payload => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  let urlByType = payload.type === 'Broadcast' ? 'broadcasts' : 'groups'
  return await axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/${currentUser.uid}/${urlByType}/${payload.id}`, {
    headers: { token: idToken }
  })
}

const queryUserOnServer = query =>
  axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/search/${query}`)

const createMessageOnServer = async payload => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "POST",
    url: 'http://aqueous-scrubland-84530.herokuapp.com/messages',
    data: {
      userUid: currentUser.uid,
      receiverId: payload.receiverId,
      groupId: payload.groupId,
      message: payload.message
    },
    headers: {
      token: idToken
    }
  })
}

const createConversationOnServer = async receiverId => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "POST",
    url: 'http://aqueous-scrubland-84530.herokuapp.com/groups',
    data: {
      userUid: currentUser.uid,
      receiverId: receiverId
    },
    headers: {
      token: idToken
    }
  })
}

const getConversationsOnServer = async () => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/${currentUser.uid}/conversations`, {
    headers: { token: idToken }
  })
}

const getProductOnServer = async (dispatch, id) => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/${currentUser.uid}/products/${id}`, {
    headers: { token: idToken }
  })
}

const getFeedOnServer = async () => {
  try {
    let currentUser = firebase.auth().currentUser
    let idToken = await currentUser.getIdToken(true)
    console.log(JSON.stringify(currentUser))
    return axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/${currentUser.uid}/feed`, {
    headers: { token: idToken }
    })
  } catch (error) {
    console.log("THERE WAS AN ERROR FETCHING DATA " + error)
  }
}

const getLookOnServer = async (dispatch, id) => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return axios.get(`http://aqueous-scrubland-84530.herokuapp.com/users/${currentUser.uid}/looks/${id}`, {
    headers: { token: idToken }
  })
}

const loginUserSuccess = async (dispatch, user) => {
  if (isAVerifiedUser(user)) {
    let banished = await isABanishedUser(user)
    if (!banished) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user })
      Actions.main()
    } else {
      userIsNotLoggedIn(dispatch)
    }
  } else {
    Actions.emailVerifying()
  }
}

const createUserOnServer = async (dispatch, user) => {
  try {
    let httpResponse = await axios({
      method: "POST",
      url: 'http://aqueous-scrubland-84530.herokuapp.com/users',
      data: {
        firebaseUid: user.uid,
        email: user.email,
        userName: user.displayName,
        photoUrl: user.photoURL
      }
    })
    loginUserSuccess(dispatch, user)
  } catch (error) {
    loginUserFail(dispatch, error)
  }
}

const newlyCreateUserOnServer = async (dispatch, user) => {
  try {
    let httpResponse = await axios({
      method: "POST",
      url: 'http://aqueous-scrubland-84530.herokuapp.com/users',
      data: {
        firebaseUid: user.uid,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
    console.log("THIS WAS THE HTTP RESPONSE " + JSON.stringify(httpResponse))
    loginUserSuccess(dispatch, user)
  } catch (error) {
    loginUserFail(dispatch, error)
  }
}

const createProductOnServer = async (payload, imageUrls) => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "POST",
    url: 'http://aqueous-scrubland-84530.herokuapp.com/products',
    data: {
      productName: payload.productName,
      brand: payload.brandName,
      purchaseLink: payload.purchaseLink,
      color: payload.color,
      productType: payload.productType,
      facePart: payload.facePart,
      pallete: payload.pallete,
      description: payload.description,
      userUid: currentUser.uid,
      productImages: imageUrls
    },
    headers: {
      token: idToken
    }
  })
}

const createLookOnServer = async (dispatch, look, uploadedImageUri) => {
  let currentUser = firebase.auth().currentUser
  let idToken = await currentUser.getIdToken(true)
  return await axios({
    method: "POST",
    url: 'http://aqueous-scrubland-84530.herokuapp.com/looks',
    headers: {
      token: idToken
    },
    data: {
      name: look.name,
      imageUri: uploadedImageUri,
      matrixBase: look.matrixBase,
      tags: look.tags,
      userUid: currentUser.uid
    }
  })
}

const loginUserFail = (dispatch, error) => {
  Alert.alert('Error', error)
  dispatch({ type: types.LOGIN_USER_FAIL, payload: error })
}

const openFBLogin = async () => {
  const APP_ID = "186057772047337"
  let options = {
    permissions: ['public_profile']
  }
  return Facebook.logInWithReadPermissionsAsync(APP_ID, options)
}

const loginFBUserOnFirebase = async (token) => {
  const CREDENTIAL = firebase.auth.FacebookAuthProvider.credential(token)
  return firebase.auth().signInWithCredential(CREDENTIAL)
}

const userIsLoggedIn = async (dispatch, user) => {
  if (isAVerifiedUser(user)) {
    console.log(JSON.stringify(user))
    let banished = await isABanishedUser(user)
    if (!banished) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user })
      Actions.main()
    } else {
      console.log("BANISHED")
      userIsNotLoggedIn(dispatch)
      Alert.alert("You are bashined from the app, contact the team")
    }
  } else {
    dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user })
    Actions.emailVerifying()
  }
}

const isAVerifiedUser = user => {
  if (!user.emailVerified && user.providerData[0].providerId === "password") {
    return false
  } else {
    return true
  }
}

const isABanishedUser = async user => {
  let { data } = await getCredentialsOnServer(user)
  if (data.user.isDisabled) {
    return true
  } else {
    return false
  }
}

const userIsNotLoggedIn = (dispatch) => {
  dispatch({ type: types.LOGOUT_USER_SUCCESS })
  Actions.login()
}

const getFormattedImageName = () => {
    let TODAY = new Date()
    let DD = TODAY.getDate()
    let MM = TODAY.getMonth()+1
    let YYYY = TODAY.getFullYear()
    let PREFIX = 'IMG'
    let UUID = v1()
    let dateBlock = `${MM}${DD}${YYYY}`
    let uniqueBlock = `${String(UUID).substring(0, 7).toUpperCase()}`

    return `${PREFIX}_${dateBlock}_${uniqueBlock}`
}

const hasEmailVerified = (user) => {
  return user.emailVerified ? true : false
}
