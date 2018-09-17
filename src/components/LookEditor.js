import React, { Component } from 'react'
import { View, Text, Image, Dimensions, PanResponder, ScrollView, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button, Icon, Header, Item, Input, Form, Left, Right, Body} from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../actions/actions'

import Tag from './utils/Tag'
import SearchBar from './utils/SearchBar'

const { width, height } = Dimensions.get('window')

class LookEditor extends Component {

  componentWillMount = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gesture) => true,
      onPanResponderGrant: (event, gesture) => {
        this.props.createTag({leftPositioning: ((gesture.x0)/width), topPositioning: (gesture.y0 - 82)})
      }
    })
  }

  onProductPressed = (product) => {
    let currentTag = this.props.currentTag
    let newTag = { ...currentTag, product: product }
    this.props.consolidateTag(newTag)
  }

  onCreatePress = () => {
    let look = {
      name: this.props.name,
      imageUri: this.props.localImageUrl,
      tags: this.props.selectedTags,
      matrixBase: `${width}x${height * 0.6}`
    }
    this.props.createLook(look)
  }

  render = () => {
    if (this.props.localImageUrl) {
      return(
        <KeyboardAvoidingView enabled={!this.props.isImageTagging} behavior='padding' style={styles.container}>
          <Header searchBar={this.props.isImageTagging} rounded style={{height: 80}}>
            {
              this.props.isImageTagging
              ?
              <SearchBar queryProducts={this.props.queryProducts} query={this.props.query} />
              :
              <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
                <Icon onPress={() => Actions.recordMenu()} name='arrow-back' style={{color: '#000'}}/>
              </View>

            }
          </Header>
          <View>
            <Image { ...this.panResponder.panHandlers } source={{uri: this.props.localImageUrl}} style={styles.image}/>

            {
              this.props.currentTag.leftPositioning && this.props.currentTag.topPositioning
              ?
              <Tag
                xAxisPosition={this.props.currentTag.leftPositioning}
                yAxisPosition={this.props.currentTag.topPositioning}
              />
              :
              null
            }

            {this.props.selectedTags
              ?
                this.props.selectedTags.map(tag =>
                  <Tag
                    key={tag.product.id}
                    product={tag.product}
                    onRemovePress={() => this.props.removeTag(tag)}
                    xAxisPosition={tag.leftPositioning}
                    yAxisPosition={tag.topPositioning}
                  />
                )
              :
              null
            }
            <ScrollView style={styles.buttonContainer}>
              <Form>
                <Item>
                  <Input onChangeText={(t) => this.props.changeTitle(t)} placeholder="Look name"/>
                </Item>
              </Form>
              <Button onPress={() => this.onCreatePress()} transparent style={styles.button}>
                <Icon name="ios-checkmark" style={styles.icon}/>
              </Button>
            </ScrollView>
            {
              this.props.isImageTagging
              ?
              <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: '#fff', opacity: 0.8}}>
                <ScrollView style={{width: '100%', height: '100%'}}>
                  {
                    this.props.results.length > 0
                    ?
                    this.props.results.map(result =>
                      <Button key={result.id} onPress={() => this.onProductPressed(result)} style={{width: '100%', height: 80}} transparent>
                        <View style={{width: '100%', height: 80, alignItems: 'center', flexDirection: 'row'}}>
                          <Image source={{uri: result.image.url}} style={{borderRadius: 65/2, width: 65, height: 65, marginLeft: 8}}/>
                          <Text style={{fontWeight: 'bold', color: '#000', marginLeft: 8, fontSize: 16}}>{result.name}</Text>
                        </View>
                      </Button>
                    )
                    :
                    <Text style={{alignSelf: 'center', marginTop: 32}}>No results</Text>
                  }
                  <Button onPress={() => this.props.removeTagInstance()} style={{alignSelf: 'center', marginTop: 16}}><Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold', paddingLeft: 8, paddingRight: 8}}>Cancel</Text></Button>
                </ScrollView>
              </View>
              :
              <ActivityIndicator size="large"/>
            }

          </View>
          {
            this.props.isCreating
            ?
            <View style={{width: '100%', height: '100%', backgroundColor: '#fff', opacity: 0.8, position: 'absolute', alignItems: 'center'}}>
              <ActivityIndicator style={{top: '35%'}} size="large"/>
            </View>
            :
            null
          }
        </KeyboardAvoidingView>
      )
    } else {
      return <View/>
    }
  }
}

const styles = {
  container: {
    width: width,
    height: height
  },
  image: {
    width: '100%',
    height: '60%',
    backgroundColor: 'grey'
  },
  buttonContainer: {
    width: '100%',
    height: '40%'
  },
  button: {
    width: width,
    height: 70,
    backgroundColor: 'green',
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 0,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 56,
    color: '#fff',
    marginBottom: 8
  }
}

mapStateToProps = state => {
  return {
    localImageUrl: state.camera.localImageUrl,
    currentTag: state.lookForm.currentTag,
    isImageTagging: state.lookForm.isImageTagging,
    query: state.productSearch.query,
    results: state.productSearch.results,
    isSearching: state.productSearch.isSearching,
    selectedTags: state.lookForm.selectedTags,
    isCreating: state.lookForm.isCreating,
    name: state.lookForm.name
  }
}

export default connect(mapStateToProps, actions)(LookEditor)
