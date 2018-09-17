import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class LookAdd extends Component {

  onAddPressed = (context) => {
    this.props.setContext(context)
    if(context === "GALLERY") {
      // Actions.productForm()
      Actions.recordMenu()
    } else {
      Actions.recordMenu()
    }
  }

  render = () => {
    return(
      <View style={{width, height: width > 600 ? (height * 0.9) : (height * 0.8), backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center'}}>

        {/* <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: width > 600 ? 32 : 22, marginBottom: 16, color: '#5B0E32' }}>Instalook it!</Text> */}
        <Text style={{ textAlign: 'center', fontSize: width > 600 ? 24 : 12 }}>Instalook a photo choosing one of the options below</Text>

        <TouchableWithoutFeedback onPress={() => this.onAddPressed('LOOK')}>
          <View style={{ width: 185, height: 145, borderRadius: 20, backgroundColor: '#FFF', shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', marginVertical: 32, justifyContent: 'center' }}>
            <Icon style={{ fontSize: 64, color: '#5B0E32' }} name='md-images' />
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>Upload From gallery</Text>
            <View style={{ width: 160, height: 6.5, backgroundColor: '#5B0E32', borderRadius: 50, position: 'absolute', bottom: 0}}></View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => this.onAddPressed('LOOK')}>
          <View style={{ width: 185, height: 145, borderRadius: 20, backgroundColor: '#FFF', shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', marginVertical: 32, justifyContent: 'center' }}>
            <Icon type='Octicons' style={{ fontSize: 60, color: '#5B0E32' }} name='device-camera' />
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>Take Photo</Text>
            <View style={{ width: 160, height: 6.5, backgroundColor: '#5B0E32', borderRadius: 50, position: 'absolute', bottom: 0}}></View>
          </View>
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

export default connect(null, actions)(LookAdd)
