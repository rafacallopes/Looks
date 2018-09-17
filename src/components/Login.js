import React, { Component } from 'react'
import { View, Text, Dimensions, ActivityIndicator, Modal, Alert, Image, TouchableWithoutFeedback } from 'react-native'
import { Button, Form, Item, Input, Container, Content, Header, Body, Footer, Left, Right, Icon } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

import InstaLookInput from './utils/InstaLookInput'

const { width, height } = Dimensions.get('window')

const LOGO = require('../assets/logo.png')

class Login extends Component {

  onEmailChange = (input) => {
    this.props.emailChanged(input);
    
  }
  
  
  onPasswordChange = input =>
    this.props.passwordChanged(input)

  onLogin = () => {
    let { email, password } = this.props
    return this.props.loginUser({ email, password })
  }

  onRecoveryEmailChange = input =>
    this.props.recoveryEmailChanged(input)

  onFacebookLogin = () =>
    this.props.facebookLogin()

    handleKeyPress = (event) => {
      
    }

  render = () => {
    return (
      <Container>

        <Header style={{ backgroundColor: '#5B0E32', height: 75, paddingTop: 20 }}>
          <Body style={{ alignItems: 'center' }}>
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>LOGIN</Text>
          </Body>
        </Header>

        <View style={{ backgroundColor: '#F8F8F8', height: height - 75 }}>

          <View style={{ width, height: (width > 600) ? 385 : 190, alignItems: 'center', justifyContent: 'center'  }}>
            <Image source={LOGO} style={{ backgroundColor: 'grey', width: '100%' , height: '100%' }} />
          </View>

          <View style={{ width, height: (height * 0.295), alignItems: 'center', justifyContent: 'space-around', marginTop: 16 }}>

            <InstaLookInput
              value={this.props.email}
              onChangeText={this.onEmailChange} 
              label='User or email address'
              inputPlaceholder='Username or email address'
              
              />


            <InstaLookInput
              value={this.props.password}
              onChangeText={this.onPasswordChange}
              label='Password'
              inputPlaceholder='Password'
              secureTextEntry
              
              />

          </View>

          <View style={{ width, height: height * 0.25, alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => this.props.activateRecoverModal()}>
              <Text style={{ fontSize: 14, marginBottom: 12, color: '#5B0E32', fontWeight: 'bold', textDecorationLine: 'underline' }} > Recover your password </Text>
            </TouchableWithoutFeedback>
            <Text style={{ fontSize: 12, marginBottom: 18 }}>Don't have an Account?
              <TouchableWithoutFeedback onPress={() => Actions.signup()}>
                <Text style={{color: '#5B0E32', fontWeight: 'bold', textDecorationLine: 'underline'}}> Click Here </Text>
              </TouchableWithoutFeedback>
               to Sign Up
             </Text>

            <Button onPress={this.onLogin} transparent style={{ width: 235, height: 45, backgroundColor: '#5B0E32', borderRadius: 50, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 10 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} >
              {
                this.props.logginIn
                ?
                <ActivityIndicator/>
                :
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>LOGIN</Text>
              }
            </Button>

          </View>

        </View>

                <Modal animationType="slide" transparent={false} visible={this.props.isRecoveringPassword} onRequestClose={() => console.log("close modal")}>
                  <Header style={{ backgroundColor: '#5B0E32' }}>
                    <Left>
                      <Icon onPress={() => this.props.deactivateRecoverModal()} name='ios-arrow-down' style={{ marginLeft: 16, color: '#FFF' }}/>
                    </Left>
                    <Body>
                      <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', width: 180, marginLeft: 16}}>RESET PASSWORD</Text>
                    </Body>
                    <Right>

                    </Right>
                  </Header>

                  <Container style={{ backgroundColor: '#F8F8F8' }}>

                    <View style={{ width, height: height * 0.40, alignItems: 'center', justifyContent: 'center' }}>

                      <InstaLookInput
                        value={this.props.recoverEmail}
                        onChangeText={this.onRecoveryEmailChange}
                        label='User or email address'
                        inputPlaceholder='Enter your email'/>

                    </View>

                    <View style={{ width, height: height * 0.30, alignItems: 'center' }}>

                      <Text style={{ fontSize: 14, marginBottom: 24 }}> A Temporary Password Will Be E-Mailed Shortly </Text>

                      <Button onPress={() => { this.props.sendPasswordRecovery(this.props.recoverEmail) ; this.props.deactivateRecoverModal() }} transparent style={{ width: 275, height: 50, backgroundColor: '#5B0E32', borderRadius: 60, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 10 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} >
                        {
                          this.props.recoverIsSending
                          ?
                          <ActivityIndicator/>
                          :
                          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>SUBMIT</Text>
                        }
                      </Button>

                    </View>

                  </Container>
                {/* <View style={{width: width, marginTop: '20%'}}>
                  <Form style={{margin: 16}}>
                    <Text style={{fontSize: 32, fontWeight: 'bold', margin: 16}}>Recover Password</Text>
                    <Item>
                      <Input onChangeText={this.onRecoveryEmailChange} value={this.props.recoverEmail} placeholder="Enter your email"></Input>
                    </Item>
                    <Button onPress={() => this.props.sendPasswordRecovery(this.props.recoverEmail)} style={{margin: 16}}>
                      {
                        this.props.recoverIsSending
                        ?
                        <ActivityIndicator style={{marginLeft: 16, marginRight: 16}}/>
                        :
                        <Text style={{color: '#fff', marginLeft: 4, marginRight: 4}}>Recover my password</Text>
                      }
                    </Button>
                    <Text onPress={() => this.props.deactivateRecoverModal()} style={{color: 'blue', margin: 22, fontSize: 18}}>Cancel</Text>
                  </Form>
                </View> */}
                </Modal>

      </Container>
    )
  }

  // render = () => {
  //   let { email, password, logginIn } = this.props
  //   return(
  //     <View style={{width: width, height: height, justifyContent: 'center'}}>
  //       <Text style={{fontSize: 48, fontWeight: 'bold', marginLeft: 16}}>Login</Text>
  //       <Form>
  //         <Item>
  //           <Input
  //             placeholder="Username"
  //             value={email}
  //             onChangeText={this.onEmailChange}
  //           />
  //         </Item>
  //         <Item>
  //           <Input
  //             placeholder="Password"
  //             secureTextEntry
  //             value={password}
  //             onChangeText={this.onPasswordChange}
  //           />
  //         </Item>
  //         {
  //           logginIn
  //           ?
  //             <ActivityIndicator/>
  //           :
  //             <Button onPress={this.onLogin} style={{marginLeft: 16, marginTop: 16}}>
  //               <Text style={{marginLeft: 32, marginRight: 32, color: '#fff'}}>Submit</Text>
  //             </Button>
  //         }
  //
  //         <Text onPress={() => Actions.signup()} style={{color: 'blue', fontSize: 18, marginTop: 16, marginLeft: 16}}>Create account</Text>
  //         <Text onPress={() => this.onFacebookLogin()} style={{color: 'blue', fontSize: 18, marginTop: 16, marginLeft: 16}}>Login on Facebook</Text>
  //         <Text onPress={() => this.props.activateRecoverModal()} style={{color: 'blue', fontSize: 18, marginTop: 16, marginLeft: 16}}>Recover password</Text>
  //
  //       </Form>
  //
  //         <Modal animationType="slide" transparent={false} visible={this.props.isRecoveringPassword} onRequestClose={() => console.log("close modal")}>
  //         <View style={{width: width, marginTop: '20%'}}>
  //           <Form style={{margin: 16}}>
  //             <Text style={{fontSize: 32, fontWeight: 'bold', margin: 16}}>Recover Password</Text>
  //             <Item>
  //               <Input onChangeText={this.onRecoveryEmailChange} value={this.props.recoverEmail} placeholder="Enter your email"></Input>
  //             </Item>
  //             <Button onPress={() => this.props.sendPasswordRecovery(this.props.recoverEmail)} style={{margin: 16}}>
  //               {
  //                 this.props.recoverIsSending
  //                 ?
  //                 <ActivityIndicator style={{marginLeft: 16, marginRight: 16}}/>
  //                 :
  //                 <Text style={{color: '#fff', marginLeft: 4, marginRight: 4}}>Recover my password</Text>
  //               }
  //             </Button>
  //             <Text onPress={() => this.props.deactivateRecoverModal()} style={{color: 'blue', margin: 22, fontSize: 18}}>Cancel</Text>
  //           </Form>
  //         </View>
  //         </Modal>
  //
  //     </View>
  //   )
  // }

}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    logginIn: state.auth.logginIn,
    isRecoveringPassword: state.auth.isRecoveringPassword,
    recoverIsSending: state.auth.recoverIsSending,
    recoverEmail: state.auth.recoverEmail,
    error: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Login)
