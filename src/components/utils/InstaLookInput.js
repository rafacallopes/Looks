import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Input } from 'native-base'


const { width, height } = Dimensions.get('window')

export default class InstaLookInput extends Component {

  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}> {this.props.label.toUpperCase()} </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder={this.props.inputPlaceholder}
            placeholderTextColor='#000'
            style={styles.input}
            value={this.props.value}
            onChangeText={(input) => this.props.onChangeText(input)}
            secureTextEntry={this.props.secureTextEntry}
          />
        </View>
      </View>
    )
  }

}

const styles = {
  container: {
    width,
    height: 75,
    alignItems: 'center'
  },
  label: {
    color: '#B8B8B8',
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 40
  },
  inputContainer: {
    width: '90%',
    height: 45,
    borderRadius: 12,
    marginTop: 6,
    shadowColor: '#D8D8D8',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    shadowOpacity: 0.6,
    backgroundColor: '#FFF',
    paddingLeft: 16
  },
  input: {
    fontSize: 14
  }
}
