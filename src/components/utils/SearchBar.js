import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Icon, Item, Input } from 'native-base'

export default class SearchBar extends Component {

  queryInput = (text) => {
    if(text.length === 0) {
      return this.props.queryProducts("")
    } else {
      return this.props.queryProducts(text)
    }
  }

  render = () => {
    return(
      <Item style={{marginTop: 8}}>
        <Icon name="ios-search"/>
        <Input value={this.props.query} onChangeText={(text) => this.queryInput(text)} placeholder="Search a product"/>
      </Item>
    )
  }
}
