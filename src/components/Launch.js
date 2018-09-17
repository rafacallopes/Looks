import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class Launch extends Component {

  componentWillMount = () => {
    this.props.checkUserOnLocalStorage()
  }

  render = () => {
    return(
      <View style={{width: width, height: height, backgroundColor: '#602438', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 36, color: '#fff', fontWeight: 'bold'}}>InstaLookIt</Text>
      </View>
    )
  }

}

export default connect(null, actions)(Launch)
