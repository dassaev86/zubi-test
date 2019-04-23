import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';

import {Icon, Button, Container, Content, Form, Label, Item, Input,} from 'native-base';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Register from './Register';

import firebase from '../firebase/config';
import 'firebase/firestore';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
  }

  state = {
    email: '',
    password: '',
    altura: Dimensions.get('screen').height
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }

  loginUser = (email, password) => {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
            this.getUserInfo(user.user.email);
            this.props.navigation.navigate('Home');
        })
      }
      catch {
        alert('Error: ', error.toString())
      }
  } 

  getUserInfo = (email) => {
    this.db.collection('users').where('email', '==', email).onSnapshot((querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
          user.push({
            id: doc.data().uid,
            fullName: doc.data().fullName,
            userName: doc.data().userName,
          });
      });
      AsyncStorage.setItem('user', JSON.stringify(user));
  });
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logoContainer}>
        <Image style={styles.imageLogo} source={require('../assets/logo-welcome.png')} style={{height: 108, width: 195}}/>
        </View>

        <View style={{justifyContent: 'center'}}>
          <Form style={{marginTop: '3.5%'}}>
          
              <Item stackedLabel style={{marginLeft: '9%', marginRight: '8%'}}>
                <Label>Email</Label>
                <Input 
                value={this.state.email}
                onChangeText = {(email) => this.setState({email})}
                />
              </Item>

              <Item stackedLabel style={{marginLeft: '9%', marginRight: '8%'}}>
                <Label>Contraseña</Label>
                <Input 
                  value={this.state.password}
                  onChangeText = {(password) => this.setState({password})}
                />
              </Item>

            </Form>
          </View>

          <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <Button style={styles.buttonLogin} full onPress={() => this.loginUser(this.state.email, this.state.password)}>
             <Text style={styles.buttonText}>INGRESAR</Text> 
          </Button>

          <Text style={styles.connectWith}>Conectar con: </Text>

          <View style={styles.socialLogos}>
          <Image source={require('../assets/icon-facebook.png')} style={{height: 56, width: 56}}/>
          <Image style={{marginLeft: 50}} source={require('../assets/icon-gmail.png')} style={{height: 56, width: 56}}/>
          </View>

          <Text style={styles.noAccount}>¿Aún no tienes cuenta?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.createAccount}>Crear cuenta </Text>
          </TouchableOpacity>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  logoContainer: {
    width: '100%',
    height: '33%',
    backgroundColor: '#40505B',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttonLogin: {
    display: 'flex',
    marginLeft: '8.94%',
    width: '82.12%',
    height: '7.5%',
    backgroundColor: '#40505B',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  forgotPassword: {
    marginTop: Dimensions.get('screen').height * .030,
    marginBottom: Dimensions.get('screen').height * .030,
    color: '#B7B7B7',
    fontSize: 12,
    textAlign: 'center'
  },
  connectWith: {
    marginTop: Dimensions.get('screen').height * .030,
    color: '#464646',
    fontSize: 12,
    textAlign: 'center'
  },
  socialLogos: {
    marginTop: Dimensions.get('screen').height * .030,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noAccount: {
    marginTop: Dimensions.get('screen').height * .030,
    fontSize: 14,
    color: '#40505B',
    textAlign: 'center'
  },
  createAccount: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#40505B',
    textAlign: 'center'
  }
});

export default MainScreen;
