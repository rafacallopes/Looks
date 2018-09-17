import React, { Component } from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import { Button, Icon } from 'native-base'

const { width, height } = Dimensions.get('window')
const NO_USER_PLACEHOLDER_IMAGE = "http://answerhealth.com/wp-content/uploads/2016/03/photo-1.png"

export default class CommentItem extends Component {
  render = () => {
    let { user, payload } = this.props.comment
    return(
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: user.photoUrl ? user.photoUrl : NO_USER_PLACEHOLDER_IMAGE }}
            style={styles.userImage}
          />
          <View style={styles.comment}>
            <Text multiline>
              <Text style={styles.userName}>{user.email ? user.email + " " : user.name + " "}</Text>
              { payload }
            </Text>
          </View>
        </View>
      </View>
    )
  }

}

const styles = {
  container: {
    width,
    height: 'auto',
    flexDirection: 'row'
  },
  content: {
    flexDirection: 'row',
    padding: 8,
    width: '100%'
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 55/2,
    marginLeft: 8
  },
  comment: {
    width: '70%',
    marginLeft: 16
  },
  userName: {
    fontWeight: 'bold'
  }
}
