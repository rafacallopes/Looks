import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './src/reducers/reducers'
import { Font } from 'expo'

import Routes from './src/components/Routes'

export default class App extends Component {

  state = {
    loading: true
  }

  componentWillMount = async () => {
    let config = {
      apiKey: "AIzaSyA0Itarcjfxeu4HCgpFI8YNg7PkNyumd9g",
      authDomain: "insta-brand-28.firebaseapp.com",
      databaseURL: "https://insta-brand-28.firebaseio.com",
      projectId: "insta-brand-28",
      storageBucket: "",
      messagingSenderId: "184881694195"
    }
    firebase.initializeApp(config)
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  render = () => {
    let store = createStore(reducers, {}, compose( applyMiddleware(thunk) ) )
    if (!this.state.loading) {
      return (
        <Provider store={store}>
          <Routes/>
        </Provider>
      ) 
    } else {
      return <View></View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
