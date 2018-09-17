import React, { Component } from 'react'
import { View, ScrollView, Text, Image, Dimensions, ActivityIndicator, FlatList, TouchableWithoutFeedback, Alert } from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

import LikedPost from './LikedPost'
import PostItem from './PostItem'

const { width, height } = Dimensions.get('window')

class Likes extends Component {

  likeButton = isLiked => {
    if (isLiked) {
      return {
        fontSize: 16, color: '#521630', marginTop: 2.5, borderRadius: 20, borderColor: 'grey'
      }
    } else {
      return {
        fontSize: 16, color: '#FFF', marginTop: 2.5
      }
    }
  }

  backgroundButton = isLiked => {
    if (isLiked) {
      return {
        width: 30, height: 30, borderRadius: 30/2, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center'      }
    } else {
      return {
        width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center'
      }
    }
  }

  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }
  
  isProductLiked = (product, likedPosts) => {
    let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
    return likedProduct.length > 0 ? true : false
  }

  onMoreCommentsPressed = (post, isTagged) => {
    let type = isTagged ? 'Look' : 'Product'
    Actions.comments({  postType: type, postId: post.id  })
  }

  onPostPress = (post, isTagged) =>
    isTagged ? Actions.lookInfo({id: post.id, post: post }) : Actions.productInfo({ post: post })


  renderPost = ({ item, index }) => {

    let item1type = item[0].tags ? 'Look' : 'Product'

    let item2type
    if (item[1]) {
      item2type = item[1].tags ? 'Look' : 'Product'
    }

    return (
      <View style={{ width, height: width > 600 ? 380 : 250, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
      <TouchableWithoutFeedback onPress={() => this.onPostPress(item[0], item[0].tags ? true : false)}>
        <View style={{width: width * 0.40, height: '90%'}}>

        <View style={{width: '100%', height: '75%'}}>
          <Image source={{ uri: this.renderImageURL(item[0]) }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>

          {
            item1type === 'Look' 
            ? 
            this.isLookLiked(item[0], this.props.likedPosts) ? <View style={{ position: 'absolute', backgroundColor: '#521630', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null 
            : 
            this.isProductLiked(item[0], this.props.likedPosts) ? <View style={{ position: 'absolute', backgroundColor: '#521630', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null 
          }

        </View>

        <View style={{ backgroundColor: '#FFF', width: '90%', height: '20%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }}>
          <View 
          style={ this.backgroundButton( item1type === 'Look' ? this.isLookLiked(item[0], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) } 
          >
            <Icon 
              name='ios-heart' 
              onPress={() => {
                item1type === 'Look' 
                ? 
                this.isLookLiked(item[0], this.props.likedPosts) ? this.props.unlikePost({post: item[0], type: item2type}) : this.props.likePost({post: item[0], type: item2type})
                : 
                this.isProductLiked(item[0], this.props.likedPosts) ? this.props.unlikePost({post: item[0], type: item2type}) : this.props.likePost({post: item[0], type: item2type})
              }}
              style={ this.likeButton( item1type === 'Look' ? this.isLookLiked(item[0], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) } 
            />
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='ios-chatbubbles' style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='md-cart' style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
          </View>
        </View>

        </View>
        </TouchableWithoutFeedback>

        { item[1] 
        ?
        <TouchableWithoutFeedback onPress={() => this.onPostPress(item[1], item[1].tags ? true : false)}>
        <View style={{width: width * 0.40, height: '90%'}}>
        
        <View style={{ width: '100%', height: '75%' }}>
          <Image source={{ uri: this.renderImageURL(item[1]) }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>
          {
            item2type === 'Look' 
            ? 
            this.isLookLiked(item[1], this.props.likedPosts) ? <View style={{ position: 'absolute', backgroundColor: '#521630', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null 
            : 
            this.isProductLiked(item[1], this.props.likedPosts) ? <View style={{ position: 'absolute', backgroundColor: '#521630', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.65, borderRadius: 10 }}></View> : null 
          }
        </View>

        <View style={{ backgroundColor: '#FFF', width: '90%', height: '20%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center' }}>
          <View 
          style={ this.backgroundButton( item1type === 'Look' ? this.isLookLiked(item[1], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) } 
          >
            <Icon 
              name='ios-heart' 
              style={ this.likeButton( item1type === 'Look' ? this.isLookLiked(item[1], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) } 
              onPress={() => {
                item2type === 'Look' 
                ? 
                this.isLookLiked(item[1], this.props.likedPosts) ? this.props.unlikePost({post: item[1], type: item2type}) : this.props.likePost({post: item[1], type: item2type})
                : 
                this.isProductLiked(item[1], this.props.likedPosts) ? this.props.unlikePost({post: item[1], type: item2type}) : this.props.likePost({post: item[1], type: item2type})
              }}
            />
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='ios-chatbubbles' style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='md-cart' style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
          </View>
        </View>

        </View> 
        </TouchableWithoutFeedback>
        :
        null 
        }
      </View>
    )
  }

  renderImageURL = item => {
    if (item.images) {
      if (item.images[0]) {
        return item.images[0].url
      } else {
        return " "
      }
    } else {
      return (item.imageUrl)
    }
  }

  chunkResponse = (desiredNumber, targetArray) => {
    let newlyArray = []
    targetArray
      .map((element, index) => 
      (index % desiredNumber === 0 )
      ? 
        newlyArray.push([element]) 
      : 
        newlyArray[newlyArray.length - 1].push(element)
      )
    return newlyArray
  }

  render = () => {
    let { likedPosts } = this.props
      return(
        <View style={{ width, height, marginBottom: '30%' }}>
          {
            likedPosts.length > 0
            ?
            <View style={{paddingBottom: height * 0.1}}>
            <FlatList
                numColumns={2}
                data={this.chunkResponse(2, likedPosts)}
                keyExtractor={(o, i) => i.toString()}
                renderItem={this.renderPost}
              />
              {/* <ScrollView>
                {
                  likedPosts.map((post, index) =>
                    <PostItem
                      key={index}
                      post={post}
                      isTagged={post.tags ? true : false}
                    />
                  )
                }
              </ScrollView> */}
            </View>
            :
            <Text style={{alignSelf: 'center', marginTop: 32}}>No likes until now</Text>
          }
        </View>
      )
  }
}

const mapStateToProps = state => {
  return { likedPosts: state.likes.likedPosts }
}

export default connect(mapStateToProps, actions)(Likes)
