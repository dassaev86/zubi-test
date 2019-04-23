import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainScreen from './components/MainScreen';
import Home from './components/AppTabNavigator/HomeTab';
import Search from './components/AppTabNavigator/SearchTab';
import NewItem from './components/AppTabNavigator/NewItemTab';
import Likes from './components/AppTabNavigator/LikesTab';
import Profile from './components/AppTabNavigator/ProfileTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import Register from './components/Register';

// import * as firebase from 'firebase';

export default class App extends React.Component {
  render() {
    return (
     <AppNavigationContainer />
    );
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Register: Register
  });

  const AppTabNavigator = createBottomTabNavigator({
    Home,
    Search,
    NewItem,
    Likes,
    Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          // iconName = `home${focused ? '' : '-outline'}`;
          iconName = `ios-home`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        } else if (routeName === 'NewItem') {
          iconName = `ios-add`;
        } else if (routeName === 'Likes') {
          iconName = `ios-heart`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
        } 

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={iconName === 'ios-add' ? 40 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      showLabel: false
    },
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Login: AppStackNavigator,
  Register: AppStackNavigator,
  Home: AppTabNavigator
});


const AppNavigationContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
