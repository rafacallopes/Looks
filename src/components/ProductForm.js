import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Form, Input, Item, Icon } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions from '../actions/actions'

const { width, height } = Dimensions.get('window')

class ProductForm extends Component {

  onChangeText = (key, value) =>
    this.props.changeTextInput(key, value)

  componentWillUnmount = () =>
    this.props.clearProductForm()

  render = () => {
    return(
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Add a new product</Text>
          <Form>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('brandName', text)}
                value={this.props.brandName}
                placeholder="Brand name"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('productName', text)}
                value={this.props.productName}
                placeholder="Product name"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('purchaseLink', text)}
                value={this.props.purchaseLink}
                placeholder="Purchase link"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('color', text)}
                value={this.props.color}
                placeholder="Color"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('productType', text)}
                value={this.props.productType}
                placeholder="Product type"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('facePart', text)}
                value={this.props.facePart}
                placeholder="Face part"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('pallete', text)}
                value={this.props.pallete}
                placeholder="Pallete"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.onChangeText('description', text)}
                value={this.props.description}
                multiline={true}
                placeholder="Description"
              />
            </Item>

            <ScrollView horizontal style={styles.imagesContainer}>

              {
                this.props.productImages.length < 5
                  ?
                  <Button onPress={() => Actions.recordMenu()} transparent style={styles.addButton}>
                    <View style={styles.addButtonView}>
                      <Icon name="ios-add-circle-outline" style={styles.addButtonIcon}/>
                    </View>
                  </Button>
                  :
                  null
              }

              {this.props.productImages.map((imageUri, index) =>
                <View key={index} style={styles.productImageContainer}>
                  <Image source={{uri: imageUri}} style={styles.productImage}/>
                  <Icon onPress={() => this.props.removeImage(imageUri)} name="ios-close-circle" style={styles.removeImageIcon}/>
                </View>
              )}

            </ScrollView>
          </Form>

          <Button onPress={() => this.props.addProduct(this.props)} style={styles.addProductButton}>
              <Text style={styles.addProductText}>Submit</Text>
          </Button>

          {
            this.props.isAdding
            ?
            <View style={{width: '100%', height: '100%', backgroundColor: '#fff', opacity: 0.8, position: 'absolute', alignItems: 'center'}}>
              <ActivityIndicator style={{top: '35%'}} size="large"/>
            </View>
            :
            null
          }
        </View>
      </ScrollView>
    )
  }
}

mapStateToProps = state => {
  return {
    brandName: state.productForm.brandName,
    productName: state.productForm.productName,
    purchaseLink: state.productForm.purchaseLink,
    color: state.productForm.color,
    productType: state.productForm.productType,
    facePart: state.productForm.facePart,
    pallete: state.productForm.pallete,
    description: state.productForm.description,
    productImages: state.productForm.productImages,
    isAdding: state.productForm.isAdding
  }
}

const styles = {
  container: {
    width: width,
    height: height
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 16
  },
  imagesContainer: {
    width: width,
    height: height * 0.3,
    marginBottom: 4
  },
  addButton: {
    width: 160,
    height: 160,
    margin: 16
  },
  addButtonView: {
    width: 160,
    height: 160,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonIcon: {
    fontSize: 60,
    color: '#000'
  },
  productImageContainer: {
    width: 160,
    height: 160,
    margin: 16,
    marginBottom: 8
  },
  productImage: {
    width: '100%',
    height: '100%'
  },
  removeImageIcon: {
    fontSize: 38,
    color: 'red',
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '-10%',
    right: '-1%'
  },
  addProductButton: {
    width: width,
    height: height * 0.1,
    borderRadius: 0,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addProductText: {
    color: '#fff',
    fontSize: 28
  }
}

export default connect(mapStateToProps, actions)(ProductForm)
