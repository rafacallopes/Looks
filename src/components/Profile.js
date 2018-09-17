import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

class Profile extends Component {

  renderName = () => {
    let { user } = this.props
    if(!this.props.isLoggingOut){
      return user.email ? user.email : user.displayName
    } else {
      return "User"
    }
  }

  render = () => {
    return(
      <View style={{width, height}}>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 16}}>
          <Icon name="ios-contact" style={{fontSize: 68, color: '#000'}}/>
          <Text style={{color: '#000', marginLeft: 16}}>{this.renderName()}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button style={{marginRight: 16, marginLeft: 16}}>
            <Text style={{color: '#fff', fontSize: 14, paddingLeft: 8, paddingRight: 8}}>Preferences</Text>
          </Button>
          <Button onPress={() => this.props.logoutUser()}>
            <Text style={{color: '#fff', fontSize: 14, paddingLeft: 8, paddingRight: 8}}>Logout</Text>
          </Button>
          <View style={{paddingHorizontal: 10}}></View>
          <Button onPress={() => Actions.contactus()}>
            <Text style={{color: '#fff', fontSize: 14, paddingLeft: 8, paddingRight: 8}}>Contact Us</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user, isLoggingOut: state.auth.isLoggingOut }
}

export default connect(mapStateToProps, actions)(Profile)
