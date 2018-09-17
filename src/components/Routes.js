import React, { Component } from 'react'
import { Scene, Router, Stack, Actions } from 'react-native-router-flux'
import { Icon } from 'native-base'

import Signup from './Signup'
import Login from './Login'
import Feed from './Feed'
import Launch from './Launch'
import ProductInfo from './ProductInfo'
import InstaCamera from './InstaCamera'
import ProductEditor from './ProductEditor'
import LookEditor from './LookEditor'
import ProductForm from './ProductForm'
import RecordMenu from './RecordMenu'
import LookInfo from './LookInfo'
import Main from './Main'
import EmailVerifying from './EmailVerifying'
import Chat from './Chat'
import NewMessage from './NewMessage'
import Conversation from './Conversation'
import Comments from './Comments'
import ContactUs from './ContactUs'

import BackButton from './utils/BackButton'

class Routes extends Component {

  render = () => {
    return(
      <Router>
        <Stack key="root" hideNavBar>

          <Stack key="auth">
            <Scene
              initial
              key="launch"
              component={Launch}
              hideNavBar
            />
            <Scene
              key="login"
              component={Login}
              hideNavBar
            />
            <Scene
              key="signup"
              component={Signup}
              hideNavBar
            />
            <Scene
              key="emailVerifying"
              component={EmailVerifying}
              hideNavBar
            />
          </Stack>

          <Stack key="main">
            <Scene
              initial
              key="mainPage"
              hideNavBar
              component={Main}
            />
            <Scene
              key="feed"
              component={Feed}
              hideNavBar
            />
            <Scene
              key="productInfo"
              component={ProductInfo}
              navigationBarStyle={styles.navBar}
              hideNavBar
            />
            <Scene
              key="lookInfo"
              component={LookInfo}
              navigationBarStyle={styles.navBar}
              hideNavBar
            />
            <Scene
              key="productForm"
              component={ProductForm}
              navigationBarStyle={styles.navBar}
            />
            <Scene
              key="recordMenu"
              component={RecordMenu}
            />
            <Scene
              key="newMessage"
              component={NewMessage}
              navigationBarStyle={styles.navBar}
            />
            <Scene
              key="conversation"
              component={Conversation}
              hideNavBar
            />
            <Scene
              key="comments"
              component={Comments}
              hideNavBar
            />
            <Scene
              key="contactus"
              component={ContactUs}
              hideNavBar
            />
          </Stack>

          <Stack key="record">
            <Scene
              key="camera"
              component={InstaCamera}
              navigationBarStyle={styles.navBar}
            />
            <Scene
              key="productEditor"
              component={ProductEditor}
              renderBackButton={() => <BackButton onPress={() => Actions.recordMenu()}/>}
              navigationBarStyle={styles.navBar}
            />
            <Scene
              key="lookEditor"
              component={LookEditor}
              hideNavBar
            />
          </Stack>
        </Stack>
      </Router>
    )
  }
}

const styles = {
  navBar: {
    height: 80,
    paddingTop: 20
  }
}

export default Routes
