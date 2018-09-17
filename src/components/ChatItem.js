import React, { Component } from 'react'
import { View, Image, Text, Dimensions } from 'react-native'
import { Button, Icon } from 'native-base'

const { width, height } = Dimensions.get('window')

const CHAR_LIMIT = 20
const PLACEHOLDER_IMAGE = "http://answerhealth.com/wp-content/uploads/2016/03/photo-1.png"

class ChatItem extends Component {

  formatLastMessage = message =>
    message.length > CHAR_LIMIT ? message.substring(0, CHAR_LIMIT).concat('...') : message

  renderUserImage = url =>
    url ? url : PLACEHOLDER_IMAGE

  render = () => {
    let { conversation, isBroadCast } = this.props
    return(
      <View>
        <Button transparent onPress={() => this.props.onPress()} style={styles.button}>
          <View style={[styles.container, { backgroundColor: isBroadCast ? 'lightblue' : 'lightgrey' }]}>
            <Image source={{uri: this.renderUserImage(conversation.receiverUser.photoUrl)}} style={styles.image}/>
            <View style={styles.dataContainer}>
              <Text style={styles.name}>{conversation.receiverUser.email ? conversation.receiverUser.email : conversation.receiverUser.name}</Text>
              <Text>
                {conversation.lastSentMessage ? this.formatLastMessage(conversation.lastSentMessage.payload) : null}
              </Text>
            </View>
          </View>
        </Button>
        {/* <Icon onPress={() => this.props.onDelete()} name="ios-trash" style={{fontSize: 32, color: '#0C0C0C', paddingLeft: 8, position: 'absolute', left: '85%', top: '40%'}}/> */}
      </View>
    )
  }
}

const styles = {
  button: {
    width,
    height: 100,
    marginTop: 4
  },
  container: {
    backgroundColor: 'lightgrey',
    width,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 65/2,
    marginLeft: 16
  },
  dataContainer: {
    marginLeft: 8
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16
  }
}

export default ChatItem
