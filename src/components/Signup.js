import React, { Component } from 'react'
import { View, Text, Dimensions, ActivityIndicator, TouchableWithoutFeedback, Alert } from 'react-native'
import { Button, Form, Item, Input, Container, Content, Body, Header, Footer, Left, Right, Icon } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import { Actions } from 'react-native-router-flux'

import InstaLookInput from './utils/InstaLookInput'

const { width, height } = Dimensions.get('window')

class Signup extends Component {

  onEmailChange = input => 
    this.props.emailChanged(input)

  onPasswordChange = input =>
    this.props.passwordChanged(input)

  onFirstNameChange = input =>
    this.props.firstNameChanged(input)

  onLastNameChange = input =>
    this.props.lastNameChanged(input)

  onUserNameChanged = input =>
    this.props.userNameChanged(input)

  onVerificationPasswordChanged = input => 
    this.props.verificationPasswordChanged(input)

  onSignup = () => {
    let { email, password, firstName, lastName, userName, verificationPassword } = this.props
    return this.props.signupUser({ email, password, firstName, lastName, userName })
  }

  render = () => {
    return (
      <Container>

        <Header style={{ backgroundColor: '#5B0E32', height: 65, paddingTop: 16 }}>
          <Left>
            <Icon onPress={() => Actions.pop()} name='ios-arrow-back' style={{ marginLeft: 16, color: '#FFF' }}/>
          </Left>
          <Body>
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>SIGN UP</Text>
          </Body>
          <Right>

          </Right>
        </Header>

        <Content style={{ backgroundColor: '#F8F8F8', paddingTop: 16 }}>

          <View style={{ width, height: 'auto', alignItems: 'center', justifyContent: 'center' }}>

            <InstaLookInput
              value={this.props.firstName}
              onChangeText={this.onFirstNameChange}
              label='First name'
              inputPlaceholder='First name'/>

              <InstaLookInput
                value={this.props.lastName}
                onChangeText={this.onLastNameChange}
                label='Last name'
                inputPlaceholder='Last name'/>

            <InstaLookInput
              value={this.props.userName}
              onChangeText={this.onUserNameChanged}
              label='Username'
              inputPlaceholder='User name'/>

            <InstaLookInput
              value={this.props.email}
              onChangeText={this.onEmailChange}
              label='Email address'
              inputPlaceholder='Email'/>

            <InstaLookInput
              value={this.props.password}
              onChangeText={this.onPasswordChange}
              label='Password'
              inputPlaceholder='Password'
              secureTextEntry/>

            <InstaLookInput
              value={this.props.verificationPassword}
              onChangeText={this.onVerificationPasswordChanged}
              label='Confirm Password'
              inputPlaceholder='Password'
              secureTextEntry/>

          </View>

          <View style={{ width, height: height * 0.30, alignItems: 'center', marginTop: 16 }}>
            <Text style={{ fontSize: 12, marginTop: 16, marginBottom: 24 }}>Already Have An Account?
              <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                <Text style={{color: '#5B0E32', fontWeight: 'bold', textDecorationLine: 'underline'}}> Click Here </Text>
              </TouchableWithoutFeedback>
               to Login
             </Text>

            <Button onPress={this.onSignup} transparent style={{ width: 235, height: 50, backgroundColor: '#5B0E32', borderRadius: 60, shadowColor: '#5B0E32', shadowOffset: { width: 0, height: 10 }, shadowRadius: 20, borderTopWidth: 0,shadowOpacity: 0.8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} >
              {
                this.props.logginIn
                ?
                <ActivityIndicator/>
                :
                <View>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>SIGN UP</Text>
                </View>
              }
            </Button>

          </View>

        </Content>

      </Container>
    )
  }

  // render = () => {
  //   let { email, password, logginIn } = this.props
  //   return(
  //     <View style={{width: width, height: height}}>
  //       <Text style={{fontSize: 48, fontWeight: 'bold', marginLeft: 16, marginTop: height * 0.2}}>Signup</Text>
  //       <Form>
  //         <Item>
  //           <Input
  //             placeholder="email"
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
  //             <Button onPress={this.onSignup} style={{marginLeft: 16, marginTop: 16}}>
  //               <Text style={{marginLeft: 32, marginRight: 32, color: '#fff'}}>Create account</Text>
  //             </Button>
  //         }
  //       </Form>
  //     </View>
  //   )
  // }

}

const mapStateToProps = state => {
  return { 
    email: state.auth.email, 
    password: state.auth.password, 
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    userName: state.auth.userName,
    verificationPassword: state.auth.verificationPassword,
    logginIn: state.auth.logginIn 
  }
}

export default connect(mapStateToProps, actions)(Signup)
