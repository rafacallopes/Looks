import React, { Component } from 'react';
import { View, Dimensions, Text, Image, KeyboardAvoidingView, TextInput, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Input, Body, Right, Left, Icon , Item, Label, Button, Footer, Title} from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class ContactUs extends Component {

    state = {
        modalVisible: false, 
        
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    onBackPressed = () =>
    Actions.pop()

    onUsernameAdded = input =>
    this.props.usernameAdded(input)

    onFullnameAdded = input =>
    this.props.fullnameAdded(input)

    onEmailAdded = input =>
    this.props.emailAdded(input)

    onPhoneAdded = input =>
    this.props.phoneAdded(input)

    onMessageAdded = input =>
    this.props.messageAdded(input)



    render = () => {
        return (
            
                
        <Container style={{}}>

        <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                alert('Modal has been closed.');
                 }}>
                <Header style={{height: 60, paddingTop: 16, backgroundColor: '#602438'}}>
                <Title style={styles.modalTitle}>THANK YOU</Title>
                </Header>
                <Body>
                 
                    <View style={{alignSelf: 'center', paddingTop: 30}}>

                        <Image style={{alignSelf: 'center', width: width > 600 ? 300 : width * 0.6 ,height: width > 600 ? 200 : 130, resizeMode: 'cover'}}
                        // source={{ uri:'https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/qmtqqlzfohpoeugsibos'}}/>
                            source={require('../assets/logo.png')} />
                        </View>
                   
                   <View style={{paddingTop: 100}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Thanks for reaching out!</Text>
                    <Text style={{fontSize: 11, fontWeight: 'bold', color: '#a8a4a6', paddingTop: 8}}>Our customer care team will be in touch</Text>
                    </View>

                    <View style={{paddingTop: 100}}>
                     <Button style = {styles.button} 
                     onPress={() => {this.setModalVisible(!this.state.modalVisible); Actions.main()  }
                     
                     }>
                     <Text style={{fontSize: width > 600 ? 16 : 11, fontWeight: 'bold', color: 'white',}}>BACK TO PROFILE</Text>
                     </Button>
                    </View>
             
          </Body>
        </Modal>



            <KeyboardAvoidingView style={{width, height}} behavior='padding' enabled>
            <Header style={{height: width > 600 ? 80 : 60, paddingTop: 16, backgroundColor: '#602438'}}>
            <Left>
                 <Icon onPress={this.onBackPressed} name="ios-arrow-back" style={{color: 'white'}}/>
                    
            </Left>
             <Body>
                 <Title style={styles.title}>CONTACT US</Title>
            </Body>
        </Header>

        <Body>


        
         <View style={{paddingTop:15, flexDirection: 'column'}}>
         
         <Text style={styles.label}>USERNAME</Text>
         <View style={styles.inputContainer}>   
            <TextInput
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically
            value={this.props.username}
            onChangeText={this.onUsernameAdded}
            multiline
            style={styles.input}
            />
         </View>
        

        <View>
        <Text style={styles.label}>FULL NAME</Text>
          <View style={styles.inputContainer}>
            <TextInput
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically
            value={this.props.fullname}
            onChangeText={this.onFullnameAdded}
            multiline
            style={styles.input}
            />
          </View>
        </View>

         <View>
         <Text style={styles.label}>EMAIL ADRESS</Text>
          <View style={styles.inputContainer}>
            <TextInput
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically
            value={this.props.email}
            onChangeText={this.onEmailAdded}
            multiline
            style={styles.input}
            />
          </View>
        </View>

         <View style={{ }}>

          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={styles.inputContainer}>
            <TextInput
           underlineColorAndroid='transparent'
           enablesReturnKeyAutomatically
           value={this.props.phone}
           onChangeText={this.onPhoneAdded}
           multiline
           style={styles.input}
           />
          </View>
        </View>

         <View>
          <Text style={styles.label}>MESSAGE</Text>
          <View style={styles.inputContainer2}>
            <TextInput
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically
            value={this.props.message}
            onChangeText={this.onMessageAdded}
            multiline
            style={[styles.input, {height: width > 600 ? 170 : 90}]}
            
            />
          </View>
        </View>
        <View style={{paddingTop: 16, }}>
        <View style={styles.support}>
            <View style={{flexDirection: 'row', alignSelf: 'center', paddingVertical: width > 600 ? 20 : 15}}>
            <Text style={{fontSize: width > 600 ? 13 : 9, color: 'white', fontWeight: 'bold', paddingRight: 45}}>CUSTOMER SUPPORT</Text>
            <View style = {{paddingHorizontal: width > 600 ? 70 : 0}}></View>
            <Text style ={{fontSize: width > 600 ? 13 : 9, color: '#660033', fontWeight: 'bold'}}>HELLO@INSTALOOK.COM</Text>
            </View>
        </View>
        </View>


        <View style={{paddingTop: 16, alignSelf: 'center', flexDirection: 'row'}}>
        <Text style={{fontSize: width > 600 ? 15 : 11,}}>To reset your password, </Text>
        <TouchableOpacity><Text style={{fontSize: width > 600 ? 15 : 11, color: '#660033', fontWeight: 'bold', textDecorationLine: 'underline', }}>Click Here</Text></TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center', paddingTop: 16, elevation: 1}}>
            <Button style = {styles.button} onPress={() => {this.setModalVisible(true); console.log('info submitted')} } >
             <Text style={{fontSize: width > 600 ? 16 : 11, fontWeight: 'bold', color: 'white',}}>SUBMIT</Text>
            </Button>
        </View>

         </View>
        </Body>


             </KeyboardAvoidingView>
        </Container>

        
            
        )
  }
}

const styles = {

title: {
    fontSize: width > 600 ? 20 : 14,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: width > 600 ? width * 0.098 : width * 0.1,
    paddingBottom: width > 600 ? 2 : 2,


}, 
modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: width * 0.090,
    paddingBottom: 15,

}, 
input: {
    fontSize: 13,
    marginLeft: 5,
    width: '90%'
},

inputContainer: {
    // width,
    width: width * 0.8, 
    borderColor: 'white', 
    borderWidth: 1, 
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
    height: width > 600 ? 70 : 36
    
},
inputContainer2: {
    // width,
    width: width * 0.8, 
    borderColor: 'white', 
    borderWidth: 1, 
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
},

label: {
    paddingLeft: 15,
    paddingTop:6,
    paddingBottom: 6,
    fontSize: width > 600 ? 20 : 10,
    fontWeight: 'bold',
    color: '#cccccc'
},

support: {
    
    width: width * 0.8,  
    borderWidth: 1, 
    borderRadius: 6,
    backgroundColor: '#aa7c81',
    borderColor: '#aa7c81',
    height: width > 600 ? 66 : 44,
    
},

button: {
    width: width * 0.5,  
    borderWidth: 1, 
    borderRadius: 18,
    backgroundColor: '#602438',
    borderColor: '#602438',
    height: width > 600 ? 60 : 35,
    justifyContent: 'center',
    alignItems: 'center'
    
}


}

const mapStateToProps = state => {
    return { 
      username: state.contact.username, 
      fullname: state.contact.password, 
      email: state.contact.email,
      phone: state.contact.phone,
      message: state.contact.message,
      
    }
  }


export default connect(mapStateToProps, actions)(ContactUs)