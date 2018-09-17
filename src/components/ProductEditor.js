import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { Button, Icon, Header, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class PhotoEditor extends Component {

  render = () => {
    if (this.props.localImageUrl){
      return(
        <View style={styles.container}>
          <View>
            <Image source={{uri: this.props.localImageUrl}} style={styles.image}/>

            <View style={styles.buttonContainer}>
              <Button onPress={() => this.props.addImage(this.props.localImageUrl)} transparent style={styles.button}>
                <Icon name="ios-checkmark" style={styles.icon}/>
              </Button>
            </View>

          </View>
        </View>
      )
    } else {
      return <View/>
    }
  }
}

const styles = {
  container: {
    width: width,
    height: height
  },
  image: {
    width: '100%',
    height: '60%',
    backgroundColor: 'grey'
  },
  buttonContainer: {
    width: width,
    height: '40%'
  },
  button: {
    width: '100%',
    height: 100,
    backgroundColor: 'green',
    borderRadius: 0,
    alignSelf: 'center',
    marginTop: '10%',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 72,
    color: '#fff'
  }
}

mapStateToProps = state => {
  return {
    localImageUrl: state.camera.localImageUrl,
    currentTag: state.lookForm.currentTag,
    isImageTagging: state.lookForm.isImageTagging,
    query: state.productSearch.query,
    results: state.productSearch.results,
    isSearching: state.productSearch.isSearching,
    selectedTags: state.lookForm.selectedTags
  }
}

export default connect(mapStateToProps, actions)(PhotoEditor)
