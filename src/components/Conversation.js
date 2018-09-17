import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ActivityIndicator, ScrollView, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Button, Icon, Container, Header, Footer, Body, Left, Right } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

const RECEIVER_NAME_CHAR_LIMIT = 10

class Conversation extends Component {

  componentWillMount = () => {
    let type = this.props.isBroadCast ? 'Broadcast' : 'Group'
    this.props.getConversation({ id: this.props.conversation.id, type })
  }

  componentWillUnmount = () => {
    Keyboard.dismiss()
  }

  onRefreshPressed = () => {
    this.props.getConversation(this.props.conversation.id)
    Keyboard.dismiss()
  }

  onMessageSend = () => {
    let payload = {
      message: this.props.newMessage,
      groupId: this.props.conversation.id,
      receiverId: this.props.conversation.receiverUser.id
    }
    this.props.sendMessage(payload)
    Keyboard.dismiss()
  }

  onMessageInput = message => {
    this.props.writeMessage(message)
  }

  renderMessage = message => {
    if (this.props.user) {
      return this.props.user.uid === message.author.firebaseUid
      ?
      <View key={message.id} style={{width: '60%', height: 'auto', backgroundColor: 'lightblue', borderRadius: 10, margin: 8}}>
        <Text multiline style={{padding: 24}}>{message.payload}</Text>
      </View>
      :
      <View key={message.id} style={{width: '60%', height: 'auto', backgroundColor: 'lightgrey', borderRadius: 10, margin: 8, alignSelf: 'flex-end'}}>
        <Text multiline style={{padding: 24}}>{message.payload}</Text>
      </View>
    } else {
      return null
    }
  }

  formatReceiverName = name => {
    if (name) {
      name.length > RECEIVER_NAME_CHAR_LIMIT ? name.substring(0, RECEIVER_NAME_CHAR_LIMIT).concat("...") : name
    } else {
      return "No name"
    }
  }

  render = () => {
    let { isBroadCast } = this.props
    console.log("CONVERSATION " + this.props.messages)
      return (
          <KeyboardAvoidingView style={{width, height}} behavior='padding' enabled>
            <Header style={{height: 80, paddingTop: 16}}>
              <Left>
                <Icon onPress={Actions.main} name="arrow-back"/>
              </Left>
              <Body>
                {
                  this.props.receiver.email || this.props.receiver.name
                  ?
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 50, height: 50, borderRadius: 50/2, marginRight: 8}}/>
                    <Text  style={{fontWeight: 'bold', fontSize: 14, width: 200}}>{this.props.receiver.email ? this.props.receiver.email : this.props.receiver.name }</Text>
                  </View>
                  :
                  null
                }
              </Body>
              <Right>
                {
                  this.props.isLoading
                  ?
                  <ActivityIndicator style={{marginRight: 8}}/>
                  :
                  <Icon name='ios-refresh' onPress={() => this.onRefreshPressed()} style={{fontSize: 34, marginRight: 8}}/>
                }
              </Right>
            </Header>

            <Body>
              {
                this.props.isLoading
                ?
                <ActivityIndicator style={{marginTop: '50%'}} size="large"/>
                :
                  <ScrollView style={{width, height: 'auto'}}>
                    <KeyboardAvoidingView behavior='position' style={{width, height: 'auto'}} keyboardVerticalOffset={130}>
                      {this.props.messages.map(message =>
                        this.renderMessage(message)
                      )}
                    </KeyboardAvoidingView>
                  </ScrollView>
              }
            </Body>
            {
              !isBroadCast
              ?
              <Footer style={{height: 65}}>
                <View style={{width, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row'}}>
                  <TextInput underlineColorAndroid='transparent' enablesReturnKeyAutomatically onChangeText={this.onMessageInput} value={this.props.newMessage} multiline placeholder="Message" style={{fontSize: 18, marginLeft: 32, width: '65%'}}/>

                  <Button onPress={this.onMessageSend} disabled={this.props.sendingDisabled} transparent style={{width: 50, height: 50, backgroundColor: this.props.sendingDisabled ? 'grey' : 'lightblue', borderRadius: 50/2, marginLeft: '10%', marginTop: 8}}>
                    <Icon name="ios-send" style={{fontSize: 28, color: '#232323'}}/>
                  </Button>

                </View>
              </Footer>
              :
              null
            }
          </KeyboardAvoidingView>
      )
  }
}

const mapStateToProps = state => {
  let currentUser = firebase.auth().currentUser
  return {
    messages: state.conversation.messages,
    user: currentUser,
    receiver: state.conversation.receiver,
    isLoading: state.conversation.isLoading,
    newMessage: state.conversation.newMessage,
    receiver: state.conversation.receiver,
    isWriting: state.conversation.isWriting,
    isSending: state.conversation.isSending,
    sendingDisabled: state.conversation.newMessage.length <= 0 || state.conversation.isSending ? true : false
  }
}

export default connect(mapStateToProps, actions)(Conversation)
