import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ScrollView, TextInput } from 'react-native'
import { Button, Icon, Header, Right, Left, } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

import Carousel from './utils/Carousel'
import Tag from './utils/Tag'
import CommentItem from './CommentItem'

const { width, height } = Dimensions.get('window')
const COMMENT_LIMIT = 60
const ON_LOAD_IMAGE = require('../assets/image-placeholder.png')

class LookInfo extends Component {

  state = {
    showComments: false, 
    
  };

  // componentWillMount = () => {
  //   let payload = { postId: this.props.postId , postType: this.props.postType }
  //   this.props.getCommentsById(payload)
  // }

  // componentWillUnmount = () => {
  //   this.props.clearComment()
  // }

  onCommentInput = (input, targetId, targetType) =>
  this.props.addComment({ input, targetId, targetType })

  isDisabled = () =>
  this.props.newComment.length <= 0 ? true : false

  onCommentIntent = () => {
  this.props.sendComment({ type: this.props.postType, postId: this.props.postId, comment: this.props.newComment })
  Keyboard.dismiss()
  }

  onbackPressed = () => {
    Actions.main();
  }

  showCommentsfunction = () => {
    this.setState({showComments: true})
  }

  hideCommentsfunction = () => {
    this.setState({showComments: false})
  }

  renderCommentUserName = user =>
    user.email ? user.email + " " : user.name + " "

  renderCommentText = comment =>
    comment.length > COMMENT_LIMIT ? comment.substring(0, COMMENT_LIMIT).concat('...') : comment

  renderComments = comments => {
    /*if (!comments) {
      return null
    }*/
    return comments.map((comment, index) => {
        while ( index <= 4 ) {
          return (
            <View>
            <Text key={index} style={styles.commentText} multiline>
              <Text style={styles.userNameOnComments}>{this.renderCommentUserName(comment.user)}</Text>
              {this.renderCommentText(comment.payload)}
            </Text>
            </View>
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

  isLookLiked = (look, likedPosts) => {
    let likedLook = likedPosts.filter(post => post.id === look.id && post.tags !== undefined)
    return likedLook.length > 0 ? true : false
  }

  renderLikeButton = (isLiked, look) => {
    let { unlikePost, likePost, isTagged } = this.props
    return isLiked
      ?  

        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center',  }}>
        <Icon onPress={() => unlikePost({post: look, type: 'Look'})} style={{fontSize: width > 600 ? 22 : 16, color: '#521630', marginTop: 2.5}} name="ios-heart"/>
        </View>
      : 
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
        <Icon onPress={() => likePost({post: look, type: 'Look'})} style={{fontSize: width > 600 ? 22 : 16, color: 'white', marginTop: 2.5}} name="ios-heart"/>
        </View>
  }

  renderCommentButton = () => {
    
  
      if(!this.state.showComments){
        return (
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
        <Icon  onPress={() => this.showCommentsfunction()} name="ios-chatboxes" style={{ fontSize: width > 600 ? 22 : 16, color: 'white', marginTop: 2.5 }}/>
        </View>
        );
      } else {
        return (
        <View style={{ width: width > 600 ? 50 : 30, height: width > 600 ? 50 : 30, borderRadius: width > 600 ? 50/2 : 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
        <Icon  onPress={() => this.hideCommentsfunction()} name="ios-chatboxes" style={{ fontSize: width > 600 ? 22 : 16, color: 'white', marginTop: 2.5 }}/>
        </View>
        );
      }
  }

  render = () => {

    // console.log(JSON.stringify(post.tags))

    let matrixWidth
    let matrixHeight
    let { look, isTagged, likedPosts, post } = this.props
    let { isLookLiked } = this
    if(!this.props.isLoading) {
      if (post.matrixBase) {
        let matrixBase = post.matrixBase.split("x")
        matrixWidth = parseInt(matrixBase[0])
        matrixHeight = parseInt(matrixBase[1])
      }

      return(
        <ScrollView style={styles.container}>
        <Header style={{height: width > 600 ? 80 : 50, paddingTop: 16, backgroundColor: '#602438'}}>
          <Left>
          <Icon onPress={() => this.onbackPressed()} name="ios-arrow-back" style={{color: 'white', fontSize: width > 600 ? 22 : 16}}/>
          </Left>
          
          <Right>
          <Icon onPress={console.log('menu clicked')} name="menu" style={{color: 'white', fontSize: width > 600 ? 22 : 16}}/>
          </Right>
        </Header>
          <View style={{alignSelf: 'center', paddingTop: 25}}>
            <Image loadingIndicatorSource={ON_LOAD_IMAGE} source={{uri: `http://192.168.1.120:8888/unsafe/1000x1000/${post.imageUrl}`}} style={{width: width * 0.87, height: width * 0.5, backgroundColor: 'grey', borderRadius: 6}}/>
            {
              post.tags
              ?
              post.tags.map(tag =>
                <Tag
                  key={tag.product.id}
                  product={tag.product}
                  showOnly
                  xAxisPosition={tag.leftPositioning}
                  yAxisPosition={tag.topPositioning}
                />
              )
              :
                null
            }
          </View>
          <View style={{flexDirection: 'row', paddingTop: width > 600 ? 25 : 15}}>
            <View style={[styles.options, {paddingLeft: width * 0.051}]}>
            {this.renderLikeButton()}
            <View style={{paddingHorizontal:3}}></View>
            {this.renderCommentButton()}
            {/* <Icon onPress={() => this.showCommentsfunction()} name="chat-bubble" type="MaterialIcons" style={styles.optionsIcon}/> */}
            {/* <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
              <Icon  onPress={() => this.showCommentsfunction()} name="ios-chatboxes" style={{ fontSize: 16, color: 'white', marginTop: 2.5 }}/>
            </View> */}
            <View style={{paddingHorizontal: 3}}></View>
            <View style={styles.inputContainer}>
            <TextInput
                underlineColorAndroid='transparent'
                enablesReturnKeyAutomatically
                onChangeText={(input) => this.onCommentInput(input, this.props.postId, this.props.postType)}
                value={this.props.newComment}
                multiline
                placeholder="Write a comment..."
                style={styles.input}
              />
              </View>
            </View>
            
          </View>
          <View key={post.id} style={styles.descriptionContainer}>
          <View style={{flexDirection: 'row'}}>
          <View>
          <Image 
          source={{uri: 'https://http2.mlstatic.com/skate-eletrico-maxfind-a-skateboard-D_NQ_NP_662042-MLB26091807147_092017-F.jpg'}}
          style={{height: width > 600 ? 130: 96, width: width > 600 ? 130: 96, borderWidth: 1, borderColor:'#edf1f7',}}
           />
           </View>
           <View style={{paddingTop: 60}}>
           <Text style={styles.itemData}>{post.name}</Text>
           </View>
            <View style={{paddingLeft: width > 600 ? width * 0.54 : width * 0.34}}>
              <Icon onPress={() => console.log('product liked')} style={styles.optionsIcon} name="ios-heart-outline"/>
              </View>
            </View>             
            </View>

          

          <View style={styles.commentsContainer}>
           
            
            {this.state.showComments ? this.renderComments(post.comments) : null}
            {
              this.state.showComments ?
              this.renderMoreCommentsOption(post.comments)
              ?
              <Button onPress={() => this.onMoreCommentsPressed(post, isTagged)} transparent style={styles.seeMoreContainer}>
                <Text style={styles.seeMoreText}>See more comments</Text>
              </Button>
              :
              null
              : null
            }
          </View>

          <View style={{alignSelf: 'center', paddingTop: 16, elevation: 1}}>
            <Button style = {styles.button} onPress={() => {console.log('go to purchase page!')} } >
             <Text style={{fontSize: width > 600 ? 16 : 9, fontWeight: 'bold', color: 'white',}}>PURCHASE NOW</Text>
            </Button>
        </View>
        
        </ScrollView>
      )
    } else {
      return null
    }
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
    fontSize: width > 600 ? 22 : 16,
    marginTop: 2,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#521630'
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
    fontSize: 12,
    color: '#521630'
  },
  options: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionsIcon: {
    color: 'purple',
    marginLeft: 16,
    fontSize: width > 600 ? 40 : 32,
  },
  inputContainer: {
    // width,
    width: width > 600 ? 562 : width/1.5, 
    borderColor: 'grey', 
    borderWidth: 1, 
    borderRadius: 600 ? 30 : 20,
     backgroundColor: 'white',
     alignItems: 'center',
     flexDirection: 'row',
     justifyContent: 'space-between',
     height: width > 600 ? 50 : 30
    
   },
   input: {
     fontSize: 14,
     marginLeft: 32,
     width: '65%'
   },
   button: {
    width: width * 0.5,  
    borderWidth: 1, 
    borderRadius: width > 600 ? 30 : 18,
    backgroundColor: '#602438',
    borderColor: '#602438',
    height: width > 600 ? 60 : 35,
    justifyContent: 'center',
    alignItems: 'center'
    
}
}

const mapStateToProps = state => {
  return {
    isLoading: state.look.isLoading,
    error: state.look.error,
    likedPosts: state.likes.likedPosts,
    comments: state.comments.comments,
    isLoading: state.comments.isLoading,
    error: state.comments.error,
    newComment: state.comments.newComment
  }
}

export default connect(mapStateToProps, actions)(LookInfo)
