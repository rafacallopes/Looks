import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,TouchableOpacity,Animated,Image, Dimensions
} from 'react-native';

const Sliding_Drawer_Width = 350;

const { width, height } = Dimensions.get('window')

export default class App extends Component {
  constructor()
    {
        super();

        this.Animation = new Animated.Value(0);

        this.Sliding_Drawer_Toggle = true;

    }

 
    ShowSlidingDrawer = () =>
    {
        if( this.Sliding_Drawer_Toggle === true )
        {
                Animated.timing(
                    this.Animation,
                    {
                        toValue: 1,
                        duration: 500
                    }
                ).start(() =>
                {
                    this.Sliding_Drawer_Toggle = false;
                });

        }
        else
        {
                Animated.timing(
                    this.Animation,
                    {
                        toValue: 0,
                        duration: 500
                    }
                ).start(() =>
                {
                    this.Sliding_Drawer_Toggle = true;
                });
        }
    }

  render(){
    const Animation_Interpolate = this.Animation.interpolate(
      {
          inputRange: [ 0, 1 ],
          outputRange: [ -(Sliding_Drawer_Width - 32), 0 ]
      });

  return(
    // <View style={styles.container}>



    // <Text style = {styles.TextStyle}>Main page Content or Components Which You Want To Show</Text>


      <Animated.View style = {[ styles.Root_Sliding_Drawer_Container, { transform: [{ translateX: Animation_Interpolate }]}]}>


<View style = { styles.Main_Sliding_Drawer_Container }>

    
  <View style={{ paddingTop: height * 0.05, flex: 1}}>
    
    <View>
      <View style={styles.menuOption}>
      <View style={styles.pinkMargin}></View><TouchableOpacity onPress={() => console.log('Clicked!')}><Text style={styles.optionsText}>Redeem Points</Text></TouchableOpacity></View>
      <View style={styles.pinkMargin}></View>
    </View>

    <View style={{paddingTop: 15}}></View>
    
    <View>
      <View style={styles.menuOption}>
      <View style={styles.pinkMargin}></View><TouchableOpacity onPress={() => console.log('Clicked!')}><Text style={styles.optionsText}>Points & Badges</Text></TouchableOpacity></View>
      <View style={styles.pinkMargin}></View>
    </View>

    <View style={{paddingTop: 15}}></View>
   
     <View>
      <View style={styles.menuOption}>
      <View style={styles.pinkMargin}></View><TouchableOpacity onPress={() => console.log('Clicked!')}><Text style={styles.optionsText}>Subscription Service</Text></TouchableOpacity></View>
      <View style={styles.pinkMargin}></View>
    </View>

    <View style={{paddingTop: height * 0.26}}></View>
    <View style={{flexDirection: 'column', alignSelf: 'center',}}>
      <TouchableOpacity onPress={() => console.log('Clicked!')}><View style={styles.menuButton}><Text style={styles.buttonText}>EDIT PROFILE</Text></View></TouchableOpacity>
      <View style={{paddingTop: 20}}></View>
      <TouchableOpacity onPress={() => console.log('Clicked!')}><View style={styles.menuButton}><Text style={styles.buttonText}>SETTINGS</Text></View></TouchableOpacity>
      <View style={{paddingTop: 20}}></View>
      <TouchableOpacity onPress={() => Actions.contactus()}><View style={styles.menuButton}><Text style={styles.buttonText}>CONTACT US</Text></View></TouchableOpacity>
    </View>
    
    </View>
  

  
    
  
        </View>

    
    <TouchableOpacity onPress = { this.ShowSlidingDrawer}>
    <Image source={require('../assets/menu.png')}  
           style = {{resizeMode: 'contain', width: 30, height: 30,   }} />
    </TouchableOpacity>
  

    </Animated.View>

    // </View>
  );
}
}

const styles = StyleSheet.create({
  container:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'

    },

    Root_Sliding_Drawer_Container:
      {
          position: 'absolute',
          flexDirection: 'row',
          left: 0,
          top: 0,
          //top: (Platform.OS == 'ios') ? 20 : 0,
          width: Sliding_Drawer_Width,
          height:'100%'
      },

      Main_Sliding_Drawer_Container:
      {
          flex: 1,
          backgroundColor: '#f7f5f4',
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center'
      },

      TextStyle: {

          fontSize: 20,
          padding: 10,
          textAlign: 'center',
          color: 'black'
      },

      pinkMargin: {
        position: 'absolute',
        width: 6,
        height: 30,
        backgroundColor: '#521630', 
        borderRadius: 10, 
        top: 10, 
        left: -2
      
      },

      menuOption: {
        height: 50,
        width: width * 0.76 ,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 20,
        // borderLeftWidth: 10,
        // borderLeftColor: '#521630',
        
      },

      optionsText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#521630',
        paddingLeft: 15,
        paddingTop: 15
        // left: 15,
        // top: 5
      },

      menuButton: {
        height: 50,
        width: width * 0.66 ,
        backgroundColor: '#521630',
        borderRadius: 40,
        

      },

      buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        paddingTop: 16

      }

});


// INVERTER LADO