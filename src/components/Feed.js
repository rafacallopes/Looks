import React, { Component } from 'react'
import { ScrollView, Text, Dimensions, View, Image, TouchableWithoutFeedback, TouchableOpacity, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
 
const { width, height } = Dimensions.get('window')

import PostItem from './PostItem'

class Feed extends Component {

  state = {
    scrollSpread: 0
  }

  // likeColor = () => {
  //   if(this.isLookLiked(item[0])){
  //     return{
  //       fontSize: 16, color: 'blue', marginTop: 2.5, backgroundColor: 'grey'
  //     }
  //   } else {
  //     return {
  //       fontSize: 16, color: '#FFF', marginTop: 2.5
  //     }
  //   }
  // }

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


  componentWillMount = () =>
    this.props.getFeed()

  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }

  isProductLiked = (product, likedPosts) => {
    let likedProduct = likedPosts.filter(post => post.id === product.id && post.images !== undefined)
    return likedProduct.length > 0 ? true : false
  }

  onPostPress = (post, isTagged) =>
    isTagged ? Actions.lookInfo({id: post.id, post: post }) : Actions.productInfo({ post: post })

  renderPost = ({ item, index }) => {

    let item1type = item[0].tags ? 'Look' : 'Product'
    let item2type = item[1].tags ? 'Look' : 'Product'

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
          // style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}
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
              // style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}
              style={ this.likeButton( item1type === 'Look' ? this.isLookLiked(item[0], this.props.likedPosts) : this.isProductLiked(item[0], this.props.likedPosts) ) } 
            />
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity>
            <Icon name='ios-chatbubbles' 
                  onPress={() => Actions.comments( { imageUrl: this.renderImageURL(item[0]) }) }
                  style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
            </TouchableOpacity>
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='md-cart' style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
          </View>
        </View>

        </View>
        </TouchableWithoutFeedback>
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
          // style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}
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
                  <TouchableOpacity> 
                  <Icon name='ios-chatbubbles' 
                  onPress={() => Actions.comments({ postId: item[1] , postType: item2type, imageUrl: this.renderImageURL(item[1])})}
                  style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
                  </TouchableOpacity>
          </View>
          <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='md-cart' style={{ fontSize: 16, color: '#FFF', marginTop: 2.5 }}/>
          </View>
        </View>

        </View>
        </TouchableWithoutFeedback>
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
    let { isLoading, data, likedPosts, likePost, unlikePost } = this.props
    if (!isLoading) {
      if (data) {
        return(
          <View>
          <ScrollView style={{ width, height }} onScroll={(event) => this.setState({ scrollSpread: event.nativeEvent.contentOffset.y })}>

            <View style={{ width: '100%', height: (height * 0.30) }}>
              <View style={{ width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center' }}>
                <Image borderRadius={65/2} source={{uri: "https://www.myfarewellnote.com/img/user-placeholder.png"}} style={{ width: 65, height: 65, borderRadius: 65/2, backgroundColor: 'grey',  shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9 }}/>
              </View>
              <View style={{ width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

                <View style={{ width: '30%', height: 'auto', borderRightWidth: 0.5, borderColor: 'grey' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>100</Text>
                  <Text style={{fontSize: 8, textAlign: 'center', color: 'grey'}}>MY LOOKS</Text>
                </View>

                <View style={{ width: '30%', height: 'auto', borderRightWidth: 0.5, borderColor: 'grey' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>100</Text>
                  <Text style={{fontSize: 8, textAlign: 'center', color: 'grey'}}>FRIENDS</Text>
                </View>

                <View style={{ width: '30%', height: 'auto' }}>
                  <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>100</Text>
                  <Text style={{fontSize: 8, textAlign: 'center', color: 'grey'}}>FANS</Text>
                </View>

              </View>
            </View>

              <View style={{ width: '100%', height: height * 0.30,justifyContent: 'space-around' }}>
              <TouchableWithoutFeedback onPress={() => this.props.selectTab("LOOK_ADD")}>
                <View style={{ width: 300, height: 60, backgroundColor: '#521630', borderRadius: 85/2, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 15 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                  <Image source={require('../assets/instalookit-image.png')} style={{ height: '90%', width: '90%', borderRadius: 72.25/2, resizeMode: 'contain' }}/>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ width: '100%', height: '40%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                <View style={{ width: 150, height: 60, backgroundColor: '#FFF', flexDirection: 'row',  shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', borderRadius: 10}}>
                  <View style={{ width: 6.5, height: 35, backgroundColor: '#521630', borderRadius: 35/2 }}></View>
                  <Text style={{ fontSize: 12, color: '#521630', marginHorizontal: 16, fontWeight: 'bold' }}>Browse Looks</Text>
                </View>

                <View style={{ width: 150, height: 60, backgroundColor: '#FFF', flexDirection: 'row',  shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', borderRadius: 10}}>
                  <View style={{ width: 6.5, height: 35, backgroundColor: '#521630', borderRadius: 35/2 }}></View>
                  <Text style={{ fontSize: 12, color: '#521630', marginHorizontal: 16, fontWeight: 'bold' }}>Browse Products</Text>
                </View>

              </View>

            </View>

            <FlatList
                numColumns={2}
                data={this.chunkResponse(2, data)}
                keyExtractor={(o, i) => i.toString()}
                renderItem={this.renderPost}
              />

          </ScrollView>
          {
            this.state.scrollSpread >= 250
            ?
            <TouchableWithoutFeedback onPress={() => this.props.selectTab("LOOK_ADD")}>
                <View style={{ position: 'absolute', right: 32, bottom: 16, width: 90, height: 45, backgroundColor: '#521630', borderRadius: 45/2, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 15 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', elevation: 4 }}>
                  <Image source={require('../assets/instalookit-image.png')} style={{ height: '90%', width: '90%', borderRadius: 45/2, resizeMode: 'contain' }}/>
                </View>
            </TouchableWithoutFeedback>
            :
            <Icon name='ios-arrow-down' style={{ fontSize: 32, position: 'absolute', right: 32, bottom: 16 }}/>
          }
          </View>
        )
      }
    } else {
      return <View><Text>No results</Text></View>
    }
  }
}

const mapStateToProps = state => {
  return { data: state.feed.data, isLoading: state.feed.isLoading, error: state.feed.error, likedPosts: state.likes.likedPosts, userWantsToSeeFeed: state.feed.userWantsToSeeFeed, clicked: state.likes.clicked }
}

export default connect(mapStateToProps, actions)(Feed)