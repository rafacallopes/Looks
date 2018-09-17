import React, { Component } from 'react'
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native'
import { Button, Footer, FooterTab, Icon, Body, Container, Header, Right } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

import Feed from './Feed'
import ElementAdd from './ElementAdd'
import Profile from './Profile'
import Chat from './Chat'
import Likes from './Likes'
import SideMenu from './Sidemenu'

import LookAdd from './LookAdd'

class Main extends Component {

  renderElementBy = (currentTab) => {
    console.log("THIS IS THE CURRENT TAB " + currentTab)
    switch(currentTab){
      case "FEED":
        return <Feed/>
      case "ADD":
        return <ElementAdd/>
      case "PROFILE":
        return <Profile/>
      case "CHAT":
        return <Chat/>
      case "LIKES":
        return <Likes/>
      case "LOOK_ADD":
        return <LookAdd/>
      default:
        return <Feed/>
    }
  }




  render = () => {
    let { currentTab, selectTab } = this.props
    return(
      <Container>
        <Header style={{ backgroundColor: '#521630', paddingTop: 32, height: 80, justifyContent: 'center' }}>
        {
          currentTab === 'LOOK_ADD' 
          ? 
          <Left>
            <Icon onPress={() => selectTab("FEED")} name='ios-arrow-back' style={{ marginLeft: 16, color: '#FFF' }}/>
          </Left>
          :
          null
        }
          <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/instalookit-image.png')} style={{ width: 200, height: '100%', alignSelf: 'center' }}/>
   
            
            {/* <TouchableOpacity>
              
               <Image source={require('../assets/menu.png')}  
                style = {{resizeMode: 'contain', width: 30, height: 30, paddingLeft: width * 1.85}} />
           
            </TouchableOpacity> */}
         
          </Body>
        {
          currentTab === 'LOOK_ADD' 
          ? 
          <Right>

          </Right>
          :
          null
        }
        </Header>
        <Body>
          {this.renderElementBy(currentTab)}
        </Body>
        <Footer style={{ backgroundColor: '#FFF' }}>
          <FooterTab style={{ backgroundColor: '#FFF' }}>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'FEED' || currentTab === 'LOOK_ADD' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab('FEED')}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'FEED' || currentTab === 'LOOK_ADD' ? '#5B0E32' : '#000'}} name="home"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'LIKES' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("LIKES")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'LIKES' ? '#5B0E32' : '#000'}} name="heart"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'ADD' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("ADD")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'ADD' ? '#5B0E32' : '#000'}} name="plus"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'CHAT' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("CHAT")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'CHAT' ? '#5B0E32' : '#000'}} name="bubbles"/>
            </Button>
            <Button style={{ borderColor: '#5B0E32', borderBottomWidth: currentTab === 'PROFILE' ? 4 : 0 , borderRadius: 0 }} onPress={() => selectTab("PROFILE")}>
              <Icon type='SimpleLineIcons' style={{fontSize: 20, color: currentTab === 'PROFILE' ? '#5B0E32' : '#000'}} name="user"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { currentTab: state.main.currentTab }
}

export default connect(mapStateToProps, actions)(Main)
