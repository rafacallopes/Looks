import React, { Component } from 'react'
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native'
import { Icon, Button } from 'native-base'

const { width } = Dimensions.get('window')
const ON_LOAD_IMAGE = require('../../assets/image-placeholder.png')

export default class Carousel extends Component {

  render = () => {
    const { product, isLiked, likePost, unlikePost } = this.props
    if(product.images && product.images.length) {
      return (
        <View style={styles.container}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            { product.images.map((image, index) =>
              <Image key={index} source={{uri: `http://192.168.1.120:8888/unsafe/1000x1000/${image.url}`}} style={styles.image}/>
            ) }
          </ScrollView>
            <View style={styles.buttonContainer}>
              <Button transparent style={styles.button}>
                {
                  this.props.isLiked
                    ?
                      <Icon onPress={() => unlikePost({post: product, type: 'Product'})} name="ios-heart" style={styles.icon}/>
                    :
                      <Icon onPress={() => likePost({post: product, type: 'Product'})} name="ios-heart-outline" style={styles.icon}/>
                }
              </Button>
          </View>
        </View>
      )
    } else {
      return null
    }
  }
}

const styles = {
  container: {
    height: '100%',
    flexDirection: 'row'
  },
  image: {
    width: width,
    height: '100%',
    backgroundColor: 'grey'
  },
  buttonContainer: {
    width: width,
    height: 50,
    backgroundColor: 'grey',
    marginTop: 4,
    justifyContent: 'center',
    position: 'absolute',
    opacity: 0.9,
    alignSelf: 'flex-end'
  },
  button: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'flex-end'
  },
  icon: {
    fontSize: 36,
    marginRight: 32,
    color: 'purple'
  }
}
