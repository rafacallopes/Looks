import React, { Component } from 'react'
import { View, Text, Dimensions, Image, ScrollView } from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')
const PLACEHOLDER_IMAGE = "http://answerhealth.com/wp-content/uploads/2016/03/photo-1.png"
const ON_LOAD_USER = require('../assets/user-placeholder.png')
const ON_LOAD_IMAGE = require('../assets/image-placeholder.png')
const SUBTITLE_LIMIT = 82
const COMMENT_LIMIT = 40

import CommentInput from './CommentInput'
import Tag from './utils/Tag'

class PostItem extends Component {

  static defaultProps = {
    post: {
      user: { photoUrl: PLACEHOLDER_IMAGE }
    }
  }

  renderProfileImage = url =>
    url ? url : PLACEHOLDER_IMAGE

  renderUserName = user =>
    user.email ? user.email : user.name

  renderProductImages = images => {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.postImage}
      >
        {images.map((image,index) =>
          <Image loadingIndicatorSource={ON_LOAD_IMAGE} key={index} style={styles.postImage} source={{uri: `http://192.168.1.120:8888/unsafe/1000x1000/${image.url}`}}/>
        )}
      </ScrollView>
    )
  }

  renderLookImagesAndTags = (uri, tags) => {
    return (
      <View>
        <Image loadingIndicatorSource={ON_LOAD_IMAGE} style={styles.postImage} source={{uri: `http://192.168.1.120:8888/unsafe/1000x1000/${uri}`}}/>
        {tags.map(tag =>
          <Tag
            key={tag.id}
            product={tag.product}
            showOnly
            xAxisPosition={tag.leftPositioning}
            yAxisPosition={tag.topPositioning}
          />
        )}
      </View>
    )
  }

  renderLikeButton = (isLiked, post) => {
    let { unlikePost, likePost, isTagged } = this.props
    let type = post.tags ? 'Look' : 'Product'
    return isLiked
      ?
        <Icon onPress={() => unlikePost({post: post, type: type})} style={styles.optionsIcon} name="ios-heart"/>
      :
        <Icon onPress={() => likePost({post: post, type: type})} style={styles.optionsIcon} name="ios-heart-outline"/>
  }

  renderPostUserName = user =>
    user.email ? user.email + " " : user.name + " "

  renderPostSubtitle = subtitle =>
    subtitle.length > SUBTITLE_LIMIT ? subtitle.substring(0, SUBTITLE_LIMIT).concat('...') : subtitle

  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }

  isProductLiked = (product, likedPosts) => {
    let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
    return likedProduct.length > 0 ? true : false
  }

  renderCommentText = comment =>
    comment.length > COMMENT_LIMIT ? comment.substring(0, COMMENT_LIMIT).concat('...') : comment

  renderComments = comments => {
    if (!comments) {
      return null
    }
    return comments.map((comment, index) => {
        while ( index <= 1 ) {
          return (
            <Text key={index} style={styles.commentText} multiline>
              <Text style={styles.userNameOnSubtitle}>{this.renderPostUserName(comment.user)}</Text>
              {this.renderCommentText(comment.payload)}
            </Text>
          )
        }
      }
    )
  }

  renderMoreCommentsOption = comments =>
    comments.length >= 2 ? true : false

  onMoreCommentsPressed = (post, isTagged) => {
    let type = isTagged ? 'Look' : 'Product'
    Actions.comments({  postType: type, postId: post.id  })
  }

  onPostPress = (post, isTagged) =>
    isTagged ? Actions.lookInfo({id: post.id, post: post }) : Actions.productInfo({ post: post })

  render = () => {
    let { post, isTagged, likedPosts } = this.props
    let { renderLookImagesAndTags, renderProductImages, isLookLiked, isProductLiked } = this
    return (

      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            loadingIndicatorSource={ON_LOAD_USER}
            style={styles.profileImage}
            source={{uri: this.renderProfileImage(post.user.photoUrl)}}
          />
          <Text style={styles.profileName}>{this.renderUserName(post.user)}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Button transparent onPress={() => this.onPostPress(post, isTagged)} style={styles.imageContainer}>
            {!isTagged ? renderProductImages(post.images) : renderLookImagesAndTags(post.imageUrl, post.tags)}
          </Button>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.optionsContainer}>
            {this.renderLikeButton(isTagged ? isLookLiked(post, likedPosts) : isProductLiked(post, likedPosts), post)}
          </View>
          <View style={styles.commentsContainer}>
            <View style={styles.subtitle}>
              <Text multiline>
                <Text style={styles.userNameOnSubtitle}>{this.renderPostUserName(post.user)}</Text>
                {this.renderPostSubtitle(post.name)}
              </Text>
            </View>
            <View style={styles.comment}>
              {this.renderComments(post.comments)}
              {
                this.renderMoreCommentsOption(post.comments)
                ?
                <Button onPress={() => this.onMoreCommentsPressed(post, isTagged)} transparent style={styles.seeMoreContainer}>
                  <Text style={styles.seeMoreText}>See more comments</Text>
                </Button>
                :
                null
              }
            </View>
          </View>
          <View style={styles.inputContainer}>
            <CommentInput postType={isTagged ? 'Look' : 'Product'} postId={post.id} user={post.user}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    width: width,
    height: 'auto'
  },
  profileContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    marginLeft: 16
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 16
  },
  imageContainer: {
    width: '100%',
    height: 400.2
  },
  postImage: {
    width: width,
    height: 400.2
  },
  statsContainer: {
    width: '100%',
    height: 'auto'
  },
  optionsContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsIcon: {
    color: 'purple',
    marginLeft: 16,
    fontSize: 32
  },
  commentsContainer: {
    width: '100%',
    height: 'auto',
    padding: 16,
    paddingTop: 8
  },
  subtitle: {
    width: '100%',
    marginBottom: 12,
    flexDirection: 'row'
  },
  userNameOnSubtitle: {
    fontWeight: 'bold'
  },
  commentText: {
    fontSize: 12,
    marginBottom: 4
  },
  inputContainer: {
    width: '100%',
    height: 'auto',
    padding: 16,
    paddingTop: 4
  },
  seeMoreContainer: {
    width: 'auto',
    height: 'auto'
  },
  seeMoreText: {
    fontWeight: 'bold',
    fontSize: 12
  }
}

const mapStateToProps = state => {
  return { likedPosts: state.likes.likedPosts }
}

export default connect(mapStateToProps, actions)(PostItem)
