import React, { Component } from 'react'
import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'native-base'
import { Camera, Permissions } from 'expo'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

class InstaCamera extends Component {

  componentWillMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.props.cameraStatusChanged(status)
  }

  onCameraChange = () => {
    let currentType = this.props.type
    return this.props.cameraTypeChanged(currentType)
  }

  onSnapTaken = () => {
    if(this.camera){
      this.props.takePhoto()
      this.camera.takePictureAsync({ quality: 0.5 })
        .then(fileUri => this.props.onPhotoSuccess(fileUri, this.props.context))
        .catch(error => this.props.onPhotoError(error))
    }
  }

  render = () => {
    let { hasPermission } = this.props

    if(hasPermission === null){
      return <View/>
    } else if (!hasPermission){
      return <Text>No Access to camera</Text>
    } else {
      return(
        <View style={styles.container}>
          <Camera
            ref={ref => {this.camera = ref}}
            style={styles.camera}
            type={this.props.type}
            ratio="1:1"
            >
            <Icon onPress={this.onCameraChange} name="ios-reverse-camera" style={styles.icon}/>
          </Camera>

          <View style={styles.buttonContainer}>
            {
              this.props.processing
              ?
                <View style={styles.processingIndicator}>
                  <ActivityIndicator size="large"/>
                </View>
              :
                <Button onPress={this.onSnapTaken} transparent style={styles.button}>
                  <View style={styles.buttonView}>
                  </View>
                </Button>
            }
          </View>
        </View>
      )
    }
  }
}

const styles = {
  container: {
    width: width,
    height: '82.5%'
  },
  camera: {
    width: '100%',
    height: '60%',
    justifyContent: 'flex-end'
  },
  icon: {
    color: '#fff',
    fontSize: 48,
    margin: 16
  },
  buttonContainer: {
    width: '100%',
    height: '40%',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginTop: '5%',
    alignSelf: 'center',
  },
  buttonView: {
    borderWidth: 20,
    borderRadius: 110,
    width: 110,
    height: 110,
    borderColor: 'gray'
  },
  processingIndicator: {
    marginTop: '15%'
  }
}

mapStateToProps = state => {
  return { type: state.camera.type, hasPermission: state.camera.hasPermission, processing: state.camera.processing, context: state.camera.context }
}

export default connect(mapStateToProps, actions)(InstaCamera)
