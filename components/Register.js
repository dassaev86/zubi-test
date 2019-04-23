import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Container, Content, Form, Label, Item, Input } from 'native-base';

import firebase from '../firebase/config';
import 'firebase/firestore';


class Register extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
      };
    state = {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPass: ''
    }

    singUpUser = (email, password) => {

        return new Promise ((res, rej) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( userData => {
                    res(
                        this.updateUserData(userData.user.uid, this.state.fullName, this.state.userName, email)
                    )
                },
                err => rej(
                    rej(console.log(err))
                ));
        })
    }

    updateUserData = (uid, fullName, userName, email) => {
        this.db.collection('users').add({
            uid: uid,
            fullName: fullName,
            userName: userName,
            email: email
          }).then((data) => {
            alert(`Nuevo usuario creado ${data}`)
            .then(this.props.navigation.navigate('Login'))

          }).catch((error) => {
            console.log(error);
          });
    }

    render() {
        return(
            <Container>
              <View style={{justifyContent: 'center'}}>
                <Form style={{height: '75%'}}>

                    <Item stackedLabel style={styles.inputs}>
                    <Label>Nombre completo</Label>
                    <Input 
                    value={this.state.fullName}
                    onChangeText = {(fullName) => this.setState({fullName})}
                    />
                    </Item>

                    <Item stackedLabel style={styles.inputs}>
                    <Label>Nombre de usuario</Label>
                    <Input 
                        value={this.state.userName}
                        onChangeText = {(userName) => this.setState({userName})}
                    />
                    </Item>

                    <Item stackedLabel style={styles.inputs}>
                    <Label>Correo electrónico</Label>
                    <Input 
                        value={this.state.email}
                        onChangeText = {(email) => this.setState({email})}
                    />
                    </Item>

                    <Item stackedLabel style={styles.inputs}>
                    <Label>Contraseña</Label>
                    <Input 
                        value={this.state.password}
                        onChangeText = {(password) => this.setState({password})}
                    />
                    </Item>

                    <Item stackedLabel style={[styles.inputs, {marginBottom: '25%'}]}>
                    <Label>Confirmar contraseña</Label>
                    <Input 
                        value={this.state.confirmPass}
                        onChangeText = {(confirmPass) => this.setState({confirmPass})}
                    />
                    </Item>

                </Form>
               </View>

                <Button style={styles.buttonRegister} block onPress={() => this.singUpUser(this.state.email, this.state.password)}>
                     <Text style={styles.buttonText}>INGRESAR</Text> 
                </Button>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonRegister: {
      marginLeft: '8.94%',
      marginRight: '8.94%',
      height: '7.5%',
      backgroundColor: '#40505B',
      borderRadius: 50,
    },
    buttonText: {
        color: "#FFFFFF", 
        fontSize: 14,
        fontWeight: 'bold', 
      },
      inputs: {
        marginTop: '5.57%',
        height: '4.75%',
        marginLeft: '9%',
        marginRight: '8%'
      }

  });

export default Register;