import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ScrollView } from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

import Carousel from './utils/Carousel'

const { width, height } = Dimensions.get('window')
const COMMENT_LIMIT = 60

class ProductInfo extends Component {

  renderCommentUserName = user =>
    user.email ? user.email + " " : user.name + " "

  renderCommentText = comment =>
    comment.length > COMMENT_LIMIT ? comment.substring(0, COMMENT_LIMIT).concat('...') : comment

  renderComments = comments => {
    if (!comments && comments.length === 0) {
      return <Text>No comments</Text>
    }
    return comments.map((comment, index) => {
        while ( index <= 4 ) {
          return (
            <Text key={index} style={styles.commentText} multiline>
              <Text style={styles.userNameOnComments}>{this.renderCommentUserName(comment.user)}</Text>
              {this.renderCommentText(comment.payload)}
            </Text>
          )
        }
      }
    )
  }

  renderMoreCommentsOption = (comments = null) =>
    comments && comments.length >= 4 ? true : false

  onMoreCommentsPressed = (look, isTagged) => {
    Actions.comments({  postType: 'Look', postId: look.id  })
  }

  isProductLiked = (product, likedPosts) => {
    let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
    return likedProduct.length > 0 ? true : false
  }

  render = () => {
    let { likePost, unlikePost, likedPosts, post } = this.props
    let { isProductLiked } = this
      return(
        <ScrollView style={styles.container}>

          <View style={styles.carousel}>
            <Carousel
              likePost={likePost}
              unlikePost={unlikePost}
              product={post}
              isLiked={isProductLiked(post, likedPosts)}
            />
          </View>

          <View key={post.id} style={styles.descriptionContainer}>
            <Text style={styles.title}>Product Details</Text>
            <Text style={styles.itemTitle}>Brand name:</Text>
            <Text style={styles.itemData}>{post.brand}</Text>
            <Text style={styles.itemTitle}>Product name:</Text>
            <Text style={styles.itemData}>{post.name}</Text>
            <Text style={styles.itemTitle}>Color:</Text>
            <Text style={styles.itemData}>{post.color}</Text>
            <Text style={styles.itemTitle}>Product type:</Text>
            <Text style={styles.itemData}>{post.type}</Text>
            <Text style={styles.itemTitle}>Face part:</Text>
            <Text style={styles.itemData}>{post.facePart}</Text>
            <Text style={styles.itemTitle}>Pallete:</Text>
            <Text style={styles.itemData}>{post.pallete}</Text>
            <Text style={styles.itemTitle}>Product Description:</Text>
            <Text style={styles.itemData}>{post.description}</Text>
          </View>

          <View style={styles.commentsContainer}>
            <View style={styles.commentsSectionTitle}>
              <Text style={styles.title}>Comments</Text>
            </View>
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

        </ScrollView>
      )
  }
}

const styles = {
  container: {
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  descriptionContainer: {
    margin: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  itemTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 4
  },
  itemData: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 4
  },
  commentsContainer: {
    width: width,
    height: 'auto',
    padding: 16
  },
  commentsSectionTitle: {
    marginBottom: 16
  },
  commentText: {
    marginBottom: 8
  },
  userNameOnComments: {
    fontWeight: 'bold'
  },
  seeMoreContainer: {
    width: 'auto',
    height: 'auto'
  },
  seeMoreText: {
    fontWeight: 'bold',
    fontSize: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  carousel: {
    width,
    height: 400.2
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.product.isLoading,
    error: state.product.error,
    likedPosts: state.likes.likedPosts
  }
}

export default connect(mapStateToProps, actions)(ProductInfo)
