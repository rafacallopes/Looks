import React, { Component } from 'react'
import { Icon } from 'native-base'

class BackButton extends Component {
  render = () => {
    let { onPress } = this.props
    return <Icon name="arrow-back" style={styles.icon} onPress={() => onPress()}/>
  }
}

const styles = {
  icon: {
    marginLeft: 16
  }
}

export default BackButton
