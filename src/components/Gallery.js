import React, { Component } from 'react'
import { View, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

const PLACEHOLDER_IMAGE = "http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png"

class Gallery extends Component {

  componentWillMount = async () => {
    this.props.fetchImagesFromCameraRoll()
  }

  render = () => {
    let { isLoading, galleryImages, selectedImageUri, cameraRollPermission } = this.props
    if(!isLoading && cameraRollPermission){
      return(
        <View style={styles.container}>
          <View style={styles.addImageContainer}>
            {
              selectedImageUri
              ?
              <Image style={styles.selectedImage} source={{uri: selectedImageUri}}/>
              :
              <Image style={styles.selectedImage} source={{uri: PLACEHOLDER_IMAGE}}/>
            }
            <Button onPress={() => this.props.addImage(this.props.selectedImageUri, this.props.context)} transparent style={styles.addImageButton}>
              <View style={styles.buttonView}>
                <Icon name="ios-checkmark" style={styles.icon}/>
              </View>
            </Button>
          </View>
          <ScrollView horizontal style={styles.scrollView}>
            {galleryImages.map((node, index) =>
              <Button key={index} onPress={() => this.props.selectImage(node.node.image.uri)} transparent style={{width: 120, height: 120}}>
                {
                  node.node.image.uri
                  ?
                  <Image source={{uri: node.node.image.uri}} style={styles.galleryImage}/>
                  :
                  <Image source={{uri: PLACEHOLDER_IMAGE}} style={styles.galleryImage}/>
                }
              </Button>
            )}
          </ScrollView>
        </View>
      )
    } else if(!isLoading && !cameraRollPermission) {
        return <View><Text>NO CAMERA ROLL PERMISSION</Text></View>
    } else {
      return <View style={styles.loading}><ActivityIndicator size="large"/></View>
    }
  }
}

const mapStateToProps = state => {
  return {
    galleryImages: state.gallery.images,
    isLoading: state.gallery.isLoading,
    error: state.gallery.error,
    selectedImageUri: state.gallery.selectedImageUri,
    cameraRollPermission: state.gallery.cameraRollPermission,
    context: state.camera.context
  }
}

const styles = {
  container: {
    width,
    height: '100%'
  },
  addImageContainer: {
    width,
    height: '75%'
  },
  selectedImage: {
    width: '100%',
    height: '100%'
  },
  addImageButton: {
    width: 70,
    height: 70,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '78%',
    right: '5%',
  },
  buttonView: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 62,
    color: '#fff'
  },
  scrollView: {
    marginTop: 4
  },
  galleryImage: {
    width: 180,
    height: 120
  },
  loading: {
    width,
    height: '82.5%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default connect(mapStateToProps, actions)(Gallery)
