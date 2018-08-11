import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import WebImage from 'react-native-web-image';
import testImage1 from './assets/test1/subtest1/test1.png';
import testImage2 from './assets/test2/test2.png';
import testImage3 from './assets/test3.png';
import testImage4 from './assets2/test4.png';
import testImage5 from './test5.png';

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

export default class App extends React.Component {
  switch2Uri(image) {
    console.log('#########1: ', Image.resolveAssetSource(image));
    let imageObject = Image.resolveAssetSource(image);
    if (imageObject.uri) {
      if (!imageObject.uri.startsWith('http:/') && !imageObject.uri.startsWith('https:/') && !imageObject.uri.startsWith('file:/')) {
        imageObject.uri = imageObject.uri.replaceAll('_','/');
        if (!(/\.(gif|jpg|jpeg|tiff|png|webp)$/i).test(imageObject.uri)) {
          imageObject = { uri: 'file:///android_asset/' + imageObject.uri + '.png' };
        } else {
          imageObject = { uri: 'file:///android_asset/' + imageObject.uri };
        }
      }
    } else {
      imageObject = { uri: '' };
    }
    console.log('#########2: ', imageObject.uri);
    return imageObject;
  }
  render() {
    imageObject1 = this.switch2Uri(testImage1);
    imageObject2 = this.switch2Uri(testImage2);
    imageObject3 = this.switch2Uri(testImage3);
    imageObject4 = this.switch2Uri(testImage4);
    imageObject5 = this.switch2Uri(testImage5);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Sample images</Text>
        <View style={styles.imgContainer}>
          <WebImage style={styles.img} source={imageObject1} onError={ event => {console.log('############ error on testImage1: ', event)} }/>
        </View>
        <View style={styles.imgContainer}>
          <WebImage style={styles.img} source={imageObject2} onError={ event => {console.log('############ error on testImage2: ', event)} }/>
        </View>
        <View style={styles.imgContainer}>
          <WebImage style={styles.img} source={imageObject3} onError={ event => {console.log('############ error on testImage3: ', event)} }/>
        </View>
        <View style={styles.imgContainer}>
          <WebImage style={styles.img} source={imageObject4} onError={ event => {console.log('############ error on testImage4: ', event)} }/>
        </View>
        <View style={styles.imgContainer}>
          <WebImage style={styles.img} source={imageObject5} onError={ event => {console.log('############ error on testImage5: ', event)} }/>
        </View>
      </View>
    )
  }
}

const white = '#FFFFFF'
const blue = 'rgb(0,0,255)'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  img: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'yellow'
  },
  imgContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: blue,
  }
})
