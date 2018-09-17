import React, { Component } from 'react'
import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class EmailVerifying extends Component {

  render = () => {
    return(
      <View style={{width, height, backgroundColor: 'lightblue', paddingTop: height * 0.2}}>
        <Text style={{fontSize: 32, margin: 16, fontWeight: 'bold', color: '#0C0C0C'}}>Verify your email</Text>
        <Text style={{margin: 16}}>To continue you must verify your email. Verifies your email and login again.</Text>
        <Button onPress={() => this.props.sendEmailVerification()} style={{margin: 16}}>
          {
            this.props.verifyEmailWasSent
            ?
            <Text style={{color: '#fff', marginLeft: 4, marginRight: 4}}>Send email verification link</Text>
            :
            <ActivityIndicator style={{marginLeft: 16, marginRight: 16}}/>
          }
        </Button>
        <Button style={{margin: 16}} onPress={() => this.props.logoutUser()}>
          <Text style={{color: '#fff', marginLeft: 4, marginRight: 4}}>Logout</Text>
        </Button>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return { verifyEmailWasSent: state.auth.verifyEmailWasSent }
}

export default connect(mapStateToProps, actions)(EmailVerifying)
