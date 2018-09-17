import React, { Component } from 'react'
import { View, Text, Dimensions, Image, ScrollView, TextInput } from 'react-native'
import { Button, Icon, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

import Tag from './utils/Tag'
import CommentInput from './CommentInput'

const CHARACTER_LIMIT = 82
const COMMENT_CHAR_LIMIT = 40
const NO_USER_PLACEHOLDER_IMAGE = "http://answerhealth.com/wp-content/uploads/2016/03/photo-1.png"

class ProductPost extends Component {

  descriptionFormat = (rawDescription) =>
    rawDescription.length > CHARACTER_LIMIT ? rawDescription.substring(0, CHARACTER_LIMIT).concat('...') : rawDescription

  renderUserImage = () =>
    this.props.data.user.photoUrl ? this.props.data.user.photoUrl : NO_USER_PLACEHOLDER_IMAGE

  renderUserName = () =>
    this.props.data.user.name ? this.props.data.user.name : this.props.data.user.email

  isProductLiked = (id) => {
    let likedProduct = this.props.likedPosts.filter(post => post.id === id && post.images !== undefined)
    if (likedProduct.length > 0) {
      return true
    } else {
      return false
    }
  }

  isLookLiked = (id) => {
    let likedLook = this.props.likedPosts.filter(post => post.id === id && post.tags !== undefined)
    if ( likedLook.length > 0 ) {
      return true
    } else {
      return false
    }
  }

  hasComments = comments =>
    comments.length > 0 ? true : false

  renderProduct = () => {
    let { comments } = this.props.data
    return(
      <View style={{width, height: comments.length > 1 ? height * 1.2 : height * 1.05, backgroundColor: '#fff', marginBottom: 4}}>

        <View style={{width: '100%', height: '12.5%', flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail style={{marginLeft: 8}} source={{uri: this.renderUserImage()}} />
          <Text style={{fontWeight: 'bold', fontSize: 14, marginLeft: 8}}>{this.renderUserName()}</Text>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {this.props.data.images.map((image, index) =>
            <Image key={index} style={{width: width, height: 400.2, backgroundColor: 'grey'}} source={{uri: image.url}}/>
          )}
        </ScrollView>


        <View style={{width: '100%', height: '30%', marginTop: 16}}>

          <Button transparent style={{width: 'auto', height: 'auto'}}>
            {
              this.isProductLiked(this.props.data.id)
              ?
                <Icon onPress={() => this.props.unlikePost({post: this.props.data, type: 'Product'}) } name="ios-heart" style={{fontSize: 32, color: 'purple'}}/>
              :
                <Icon onPress={() => this.props.likePost({post: this.props.data, type: 'Product'})} name="ios-heart-outline" style={{fontSize: 32, color: 'purple'}}/>
            }
          </Button>

          <View style={{marginLeft: 16}}>
            <Text multiline><Text style={{fontWeight: 'bold'}}>{this.renderUserName()}</Text> {this.descriptionFormat(this.props.data.name)}</Text>
          </View>

          {
            this.hasComments(comments)
            ?
            <View style={{ width, height: 'auto', padding: 16, maxHeight: '42.5%'}}>
              {comments.map((comment, index) => {
                while (index <= 1) {
                  return(
                    <Text key={comment.id} multiline style={{marginBottom: 4}}>
                      <Text style={{fontWeight: 'bold'}}>{comment.user.email ? comment.user.email : comment.user.name} </Text>
                      {comment.payload.length > COMMENT_CHAR_LIMIT ? comment.payload.substring(0, COMMENT_CHAR_LIMIT).concat('...') : comment.payload }
                    </Text>
                  )
                }
              }
              )}
              {
                comments.length >= 1
                ?
                <Button onPress={this.onMoreCommentsPressed} transparent style={{width: 'auto', height: 'auto'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 12}}>See more comments</Text>
                </Button>
                :
                null
              }
              <CommentInput postType={this.props.isTagged ? 'Look' : 'Product'} postId={this.props.data.id} user={this.props.data.user}/>
            </View>
            :
            <View style={{margin: 16}}>
              <CommentInput postType={this.props.isTagged ? 'Look' : 'Product'} postId={this.props.data.id} user={this.props.data.user}/>
            </View>
          }
        </View>

      </View>
    )
  }

  renderLook = () => {
    let { comments } = this.props.data
    return(
      <View style={{width, height: comments.length > 1 ? height * 1.2 : height * 1.05, backgroundColor: '#fff', marginBottom: 4}}>

        <View style={{width: '100%', height: '12.5%', flexDirection: 'row', alignItems: 'center'}}>
          <Thumbnail style={{marginLeft: 8}} source={{uri: this.renderUserImage()}} />
          <Text style={{fontWeight: 'bold', fontSize: 14, marginLeft: 8}}>{this.renderUserName()}</Text>
        </View>

        <View>
          <Image style={{width: '100%', height: 400.2, backgroundColor: 'grey'}} source={{uri: this.props.data.imageUrl}}/>
          {this.props.data.tags ? this.renderTags() : null}
        </View>

        <View style={{width: '100%', height: '40%', marginTop: 16}}>

          <Button transparent style={{width: 'auto', height: 'auto'}}>
            {
              this.isLookLiked(this.props.data.id)
              ?
                <Icon onPress={() => this.props.unlikePost({post: this.props.data, type: 'Look'})} name="ios-heart" style={{fontSize: 32, color: 'purple'}}/>
              :
                <Icon onPress={() => this.props.likePost({post: this.props.data, type: 'Look'})} name="ios-heart-outline" style={{fontSize: 32, color: 'purple'}}/>
            }
          </Button>

          <View style={{marginLeft: 16}}>
            <Text multiline><Text style={{fontWeight: 'bold' }}>{this.renderUserName()}</Text> {this.descriptionFormat(this.props.data.name)}</Text>
          </View>
          {
            this.hasComments(comments)
            ?
            <View style={{ width, height: 'auto', padding: 16}}>
              {comments.map((comment, index) => {
                while (index <= 1) {
                  return(
                    <Text key={comment.id} multiline style={{marginBottom: 4}}>
                      <Text style={{fontWeight: 'bold'}}>{comment.user.email ? comment.user.email : comment.user.name} </Text>
                      {comment.payload.length > COMMENT_CHAR_LIMIT ? comment.payload.substring(0, COMMENT_CHAR_LIMIT).concat('...') : comment.payload }
                    </Text>
                  )
                }
              }
              )}
              {
                comments.length > 2
                ?
                <Button onPress={this.onMoreCommentsPressed} transparent style={{width: 'auto', height: 'auto'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 12}}>See more comments</Text>
                </Button>
                :
                null
              }
              <CommentInput postType={this.props.isTagged ? 'Look' : 'Product'} postId={this.props.data.id} user={this.props.data.user}/>
            </View>
            :
            <View style={{width, height: '42.5%'}}>
              <CommentInput postType={this.props.isTagged ? 'Look' : 'Product'} postId={this.props.data.id} user={this.props.data.user}/>
            </View>
          }

        </View>

      </View>
    )
  }

  onMoreCommentsPressed = () => {
    let type = this.props.isTagged ? 'Look' : 'Product'
    Actions.comments({  postType: type, postId: this.props.data.id  })
  }

  renderTags = () => {
    return this.props.data.tags.map(tag =>
      <Tag
        key={tag.id}
        product={tag.product}
        showOnly
        xAxisPosition={tag.leftPositioning}
        yAxisPosition={tag.topPositioning}
      />
    )
  }

  render = () => {
    if(this.props.isTagged) {
      return this.renderLook()
    } else {
      return this.renderProduct()
    }
  }
}

const mapStateToProps = state => {
  return { likedPosts: state.likes.likedPosts }
}

export default connect(mapStateToProps, actions)(ProductPost)
