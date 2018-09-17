import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Dimensions, Keyboard, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Body, Header, Left, Right, Icon, Button, Fab } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

import ChatItem from './ChatItem'

class Chat extends Component {

  componentWillMount = () => {
    this.props.getConversations()
  }

  render = () => {
    let { conversations, isLoading, error } = this.props
    return(
      <Container>
        <Body>
          {
            isLoading || error
            ?
            <View style={{width, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large"/>
            </View>
            :
            <View>
              {
                conversations.groups || conversations.broadcastings
                ?
                <ScrollView>
                  {
                    conversations.broadcastings
                    ?
                    conversations.broadcastings.map(conversation =>
                      <ChatItem isBroadCast onPress={() => Actions.conversation({conversation: conversation, isBroadCast: true})} key={conversation.id} conversation={conversation}/>
                    )
                    :
                    null
                  }
                  {
                    conversations.groups
                    ?
                    conversations.groups.map(conversation =>
                      <ChatItem onPress={() => Actions.conversation({conversation: conversation})} key={conversation.id} conversation={conversation}/>
                    )
                    :
                    null
                  }
                </ScrollView>
                :
                <View style={{width, height, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>No conversations yet.</Text>
                </View>
              }
            </View>
          }
        </Body>
        <Fab
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => Actions.newMessage()}
        >
          <Icon name="ios-add" style={{fontSize: 32, marginTop: Platform.OS === 'ios' ? 8 : null}}/>
        </Fab>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { conversations: state.chat.conversations, isLoading: state.chat.isLoading, error: state.chat.error }
}

export default connect(mapStateToProps, actions)(Chat)
