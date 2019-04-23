import React, { Component } from 'react';

import { Icon } from 'native-base';
import MainHeader from './UI/Header';
import ItemCard from './UI/ItemCard';
import { ScrollView } from 'react-native-gesture-handler';

import firebase from '../../firebase/config';
import 'firebase/firestore';


class HomeTab extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
  }
  state = {
    allItems: []
  }

  componentWillMount() {
    this.db.collection('items').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
          items.push({
            id: doc.data.id,
            name: doc.data().name,
            desc: doc.data().description,
            cond: doc.data().condition,
            date: doc.data().date,
            imgs: doc.data().imgs
          });
      });

      const user = firebase.auth().currentUser;
      console.log('Usuario: ', user.email);

      this.setState({
        allItems: items
      });
  });
  }

    static navigatorOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{color: tintColor}} />
        )
    }

  render() {
    const allItems = this.state.allItems;
    return (

      <ScrollView>
        <MainHeader />
        {
          allItems.map((item, i) => {
          return(
            <ItemCard
              key={i}
              name={item.name}
              desc={item.desc}
              cond={item.cond}
              date={item.date}
              imgs={item.imgs}
            />
          )
        })
        }
      </ScrollView>
    );
  }
}

export default HomeTab;