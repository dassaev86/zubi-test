import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import moment from 'moment';
import 'moment/locale/es'


class ItemCard extends Component {
  render() {
    moment.locale('es');
    return (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../../assets/union.jpg')} />
                <Body>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>Pepe Arellano</Text>
                  <Text style={{fontSize: 13, color: '#7F7F7F'}} note>Colima, Col</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: this.props.imgs}} style={{height: 244, width: '100%'}}/>
                <Text style={{marginTop: 5, fontSize: 14, fontWeight: 'bold'}}>
                {this.props.name}
                </Text>
                <Text style={{fontSize: 12, color: '#4A4A4A'}}>
                {moment(this.props.date).locale('es').fromNow()}
                </Text>

                  <TouchableOpacity style={styles.likeContainer}>
                    <Image source={require('../../../assets/icon-like-bg.png')} style={{width: 17.64, height: 17.64}} />
                  </TouchableOpacity>
              </Body>
            </CardItem>
          </Card>
    );
  }
}

const styles = StyleSheet.create({
  likeContainer: {
    width: 45.2,
    height: 45.2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#40505B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    left: '83.88%',
    bottom: '6%'
  }
})

export default ItemCard;