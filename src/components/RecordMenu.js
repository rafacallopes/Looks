import React, { Component } from 'react'
import { View, Dimensions, Alert } from 'react-native'
import { Footer, FooterTab, Button, Text, Body, Container } from 'native-base'
import { connect } from 'react-redux'

import InstaCamera from './InstaCamera'
import Gallery from './Gallery'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class RecordMenu extends Component {

  componentWillMount = () => {
      this.props.component === 'CAMERA' ? this.onTabPressed('CAMERA') : this.onTabPressed('GALLERY')
  }

  renderComponentBasedOn = (activeComponent) => (
    activeComponent === 'CAMERA' ? <InstaCamera/> : <Gallery/>
  )

  onTabPressed = (nextTab) => (
    this.props.changeNavigationTab(nextTab)
  )

  confirmPath = () => {
    Alert.alert(
      'Choose ',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  render = () => {
    let { activeComponent } = this.props
    return(
      <Container>
        <Body>
          {this.renderComponentBasedOn(activeComponent)}
        </Body>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button onPress={() => this.onTabPressed('GALLERY')}>
              <Text>GALLERY</Text>
            </Button>
            <Button onPress={() => this.onTabPressed('CAMERA')}>
              <Text>CAMERA</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = {
  footer: {
    marginTop: 4
  }
}

const mapStateToProps = state => {
  return { activeComponent: state.productNavigation.activeComponent, context: state.camera.context, component: state.camera.component }
}

export default connect(mapStateToProps, actions)(RecordMenu)
