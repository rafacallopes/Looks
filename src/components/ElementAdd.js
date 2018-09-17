import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import { Button, Icon, Body } from 'native-base'
import { Camera, Permissions } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import Modal from "react-native-modal";

const { width, height } = Dimensions.get('window')

class ElementAdd extends Component {

  state = {
    modalVisible: false, 
    
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onAddPressed = (context) => {
    this.props.setContext(context)
    if(context === "GALLERY") {
      // Actions.productForm()
      Actions.recordMenu()
    } else {
      Actions.recordMenu()
    }
  }

  onCameraPress = () => {
  if(this.props.hasPermission === null){
    this.setModalVisible(true)
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

        <TouchableWithoutFeedback onPress={() => this.onAddPressed('PRODUCTS')}>
          <View style={{ width: 185, height: 145, borderRadius: 20, backgroundColor: '#FFF', shadowColor: '#D8D8D8', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20, shadowOpacity: 0.9, alignItems: 'center', marginVertical: 32, justifyContent: 'center' }}>
            <Image style={{ width: 60, height: 60}} source={require('../assets/add-product-icon.png')} />
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>Add Products</Text>
            <View style={{ width: 160, height: 6.5, backgroundColor: '#5B0E32', borderRadius: 50, position: 'absolute', bottom: 0}}></View>
          </View>
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

// const styles = {
  
//   button: {
//       width: width * 0.25,  
//       borderWidth: 1, 
//       borderRadius: 18,
//       backgroundColor: '#602438',
//       borderColor: '#602438',
//       height: 35,
//       justifyContent: 'center',
//       alignItems: 'center'
      
//   }
// }

mapStateToProps = state => {
  return { type: state.camera.type, hasPermission: state.camera.hasPermission, processing: state.camera.processing, context: state.camera.context }
}

export default connect(mapStateToProps, actions)(ElementAdd)


// this.onAddPressed('LOOK')