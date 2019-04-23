import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class MainHeader extends Component {
  render() {
    return (

        <Header>
          <Left>
            <Button transparent>
              <Icon name='apps' size={30} />
            </Button>
          </Left>
          <Body>
            <Title>ZUBI</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='information-circle' size={30} />
            </Button>
          </Right>
        </Header>

    );
  }
}

