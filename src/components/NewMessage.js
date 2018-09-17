import React, { Component } from 'react'
import { View, ScrollView, Text, Dimensions, Image, ActivityIndicator, Keyboard } from 'react-native'
import { Container, Header, Body, Button, Icon, Left, Right } from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

import SearchBar from './utils/SearchBar'

const { width, height } = Dimensions.get('window')

const NO_USER_PLACEHOLDER_IMAGE = "http://answerhealth.com/wp-content/uploads/2016/03/photo-1.png"

class NewMessage extends Component {

  componentWillUnmount = () => {
    Keyboard.dismiss()
  }

  render = () => {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor: '#fff', borderBottomWidth: 0, marginTop: 8}}>
          <SearchBar queryProducts={this.props.queryUsers} query={this.props.query} />
        </Header>
        <Body>
          <ScrollView>
            <View style={{marginTop: 16}}>
              {this.props.isSearching
                ?
                <ActivityIndicator style={{backgroundColor: 'transparent'}} size="large"/>
                :
                this.props.results.map(result =>
                  <Button onPress={() => this.props.createConversation(result.id)} key={result.id} style={{width: '100%', height: 80, marginTop: 8, marginBottom: 8}} transparent>
                    <View style={{width: '100%', height: 80, alignItems: 'center', flexDirection: 'row'}}>
                      <Image source={{uri: result.photoUrl ? result.photoUrl : NO_USER_PLACEHOLDER_IMAGE}} style={{borderRadius: 65/2, width: 65, height: 65, marginLeft: 8}}/>
                      <Text style={{fontWeight: 'bold', color: '#000', marginLeft: 8, fontSize: 16}}>{result.email ? result.email : result.name}</Text>
                    </View>
                  </Button>
                )
              }
            </View>

          </ScrollView>
        </Body>
      </Container>
    )
  }
}

const mapStateToProps = state => (
  { query: state.userSearch.query, results: state.userSearch.results, isSearching: state.userSearch.isSearching }
)

export default connect(mapStateToProps, actions)(NewMessage)
