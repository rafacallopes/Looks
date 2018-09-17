import React, { Component } from 'react'
import { View, Image, TextInput, Text, Dimensions, Keyboard } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

const PLACEHOLDER_IMAGE = "http://answerhealth.com/wp-content/uploads/2016/03/photo-1.png"

class CommentInput extends Component {

  onCommentInput = (input, targetId, targetType) => {
    this.props.addComment({ input, targetId, targetType })
  }

  isDisabled = () =>
    this.props.newComment.length <= 0 ? true : false

  onCommentIntent = () => {
    this.props.sendComment({ type: this.props.postType, postId: this.props.postId, comment: this.props.newComment })
    Keyboard.dismiss()
  }

  newCommentIsEmpty = input =>
    input.length > 0 ? false : true

  isCommentTarget = (post, target) =>
    post.postId === target.targetId && post.postType === target.targetType ? true : false

  render = () => {
    let { currentUser, postId, postType, targetType, targetId } = this.props
    return (
      <View style={{width, height: 'auto', alignItems: 'center', flexDirection: 'row'}}>
        <Image source={{uri: currentUser.photoURL ? currentUser.photoURL : PLACEHOLDER_IMAGE}} style={{width: 40, height: 40, borderRadius: 40/2}}/>
        <TextInput
          underlineColorAndroid='transparent'
          enablesReturnKeyAutomatically
          onChangeText={(input) => this.onCommentInput(input, postId, postType)}
          value={this.isCommentTarget({postId, postType}, {targetId, targetType}) ? this.props.newComment : ''}
          multiline
          placeholder="Add a comment"
          style={{width: '65%', marginLeft: 8, marginRight: 8}}/>
        {
          this.newCommentIsEmpty(this.props.newComment)
          ?
          null
          :
          <Button onPress={this.onCommentIntent} disabled={this.isDisabled()} transparent style={{alignSelf: 'center'}}>
            <Text>Publish</Text>
          </Button>
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    newComment: state.comments.newComment,
    currentUser: state.auth.user,
    targetId: state.comments.targetId,
    targetType: state.comments.targetType
  }
}

export default connect(mapStateToProps, actions)(CommentInput)
