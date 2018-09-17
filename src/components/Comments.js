import React, { Component } from 'react'
import { View, Text, Image, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Content, Header, Body, Right, Left, Icon , Button, Footer} from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

import CommentItem from './CommentItem'

const { width, height } = Dimensions.get('window')


class Comments extends Component {

state = {
  imageUrl: this.props.imageUrl
}


  componentWillMount = () => {
    let payload = { postId: this.props.postId , postType: this.props.postType }
    this.props.getCommentsById(payload)
  }

  componentWillUnmount = () => {
    this.props.clearComment()
  }

  onBackPressed = () =>
    Actions.pop()

  onCommentInput = (input, targetId, targetType) =>
    this.props.addComment({ input, targetId, targetType })

  isDisabled = () =>
    this.props.newComment.length <= 0 ? true : false

  onCommentIntent = () => {
    this.props.sendComment({ type: this.props.postType, postId: this.props.postId, comment: this.props.newComment })
    Keyboard.dismiss()
  }

  render = () => {
    return (
      <Container style={{backgroundColor: 'white'}}>
        <KeyboardAvoidingView style={{width, height}} behavior='padding' enabled>
        <Header style={{height: 50, paddingTop: 16, backgroundColor: '#602438'}}>
          <Left>
            <Icon onPress={this.onBackPressed} name="ios-arrow-back" style={{color: 'white'}}/>
          </Left>
          
          <Right>
          <Icon onPress={console.log('menu clicked')} name="menu" style={{color: 'white'}}/>
          </Right>
        </Header>
        <Body>
            <Content style={{paddingTop: 20}}>
           
             <Image 
             source={{uri: this.state.imageUrl}}
             style={styles.imageStyle}
             />
            </Content>
          </Body>

          <View style={styles.reactions}>
            <View style={{paddingTop: 0}}>
              <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
                <Icon  onPress={console.log('liked')} name="ios-heart" style={{ fontSize: 16, color: 'white', marginTop: 2.5 }}/>
              </View>
            </View>
            <View style={{paddingTop: 0, paddingLeft: 8}}>
              <TouchableOpacity onPress={this.onCommentIntent} disabled={this.isDisabled()}>
                <View style={{ width: 30, height: 30, borderRadius: 30/2, backgroundColor: '#521630', alignItems: 'center', justifyContent: 'center',  }}>
                  <Icon  onPress={console.log('liked')} name="ios-chatboxes" style={{ fontSize: 16, color: 'white', marginTop: 2.5 }}/>
                </View>
              </TouchableOpacity>
            </View>
          <View style={{paddingLeft: 10}}>
            <View style={styles.inputContainer}>

              <TextInput
                underlineColorAndroid='transparent'
                enablesReturnKeyAutomatically
                onChangeText={(input) => this.onCommentInput(input, this.props.postId, this.props.postType)}
                value={this.props.newComment}
                multiline
                placeholder="Add a comment..."
                style={styles.input}
              />

              
              {/* <Button onPress={this.onCommentIntent} disabled={this.isDisabled()} transparent style={styles.button}>
                <Text style={styles.buttonText}>Publish</Text>
              </Button> */}
              
            </View>
            </View>
            
          </View>
         
          <Body>
            <Content style={{paddingLeft: 7}}>
              <ScrollView style={{paddingTop: 20, flexGrow: 1}}>
              {this.props.comments.map(comment =>
                <CommentItem key={comment.id} comment={comment}/>
              )}
              </ScrollView>
            </Content>
          </Body>
          {/* <Footer style={styles.footerContainer}>
            <View style={styles.inputContainer}>

              <TextInput
                underlineColorAndroid='transparent'
                enablesReturnKeyAutomatically
                onChangeText={(input) => this.onCommentInput(input, this.props.postId, this.props.postType)}
                value={this.props.newComment}
                multiline
                placeholder="Add a comment..."
                style={styles.input}
              />

              <Button onPress={this.onCommentIntent} disabled={this.isDisabled()} transparent style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </Button>

            </View>
          </Footer> */}
           
           
           {/* <Footer style={{ backgroundColor: '#FFF' }}>
          <FooterTab style={{ backgroundColor: '#FFF' }}>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'FEED' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab('FEED')}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'FEED' ? '#5B0E32' : '#000'}} name="home"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'LIKES' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("LIKES")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'LIKES' ? '#5B0E32' : '#000'}} name="heart"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'ADD' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("ADD")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'ADD' ? '#5B0E32' : '#000'}} name="plus"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'CHAT' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("CHAT")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'CHAT' ? '#5B0E32' : '#000'}} name="bubbles"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'PROFILE' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("PROFILE")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'PROFILE' ? '#5B0E32' : '#000'}} name="user"/>
            </Button>
          </FooterTab>
        </Footer> */}
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = {
  footerContainer: {
    height: 65
  },
  inputContainer: {
   // width,
   width: width/1.55, 
   borderColor: 'grey', 
   borderWidth: 1, 
   borderRadius: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3
  },
  input: {
    fontSize: 14,
    marginLeft: 32,
    width: '65%'
  },
  button: {
  paddingRight: 20
    
  },
  buttonText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  imageStyle: {
    width: width * 0.85, 
    height: 200,
    borderRadius: 5
  },
  reactions: {
    paddingLeft: width * 0.07,
    flexDirection: 'row',
    borderColor: 'white',
    position: 'relative'
  },
  
    
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    isLoading: state.comments.isLoading,
    error: state.comments.error,
    newComment: state.comments.newComment
  }
}

export default connect(mapStateToProps, actions)(Comments)