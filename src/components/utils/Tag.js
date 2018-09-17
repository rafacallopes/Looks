import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Button, Icon } from 'native-base'

const { width, height } = Dimensions.get('window')

const CHAR_LIMIT = 16

class Tag extends Component {

  formatText = (text) => {
    return text.length > CHAR_LIMIT ? text.substring(0, CHAR_LIMIT).concat('...') : text
  }

  render = () => {
    return(
      <View style={{width: width * 0.4, height: 50, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: this.props.yAxisPosition, left: width * this.props.xAxisPosition}}>
        {
          this.props.product
          ?
          <Text style={{fontWeight: 'bold', color: '#fff'}}>{this.formatText(this.props.product.name)}</Text>
          :
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Choose the product</Text>
        }
        {this.props.showOnly
          ?
          null
          :
          <Icon name="ios-close-circle" onPress={() => this.props.onRemovePress()} style={{position: 'absolute', right: 0, top: -10, color: 'red'}}/>
        }
      </View>
    )
  }
}

export default Tag
