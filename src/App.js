import React, {Component} from 'react';
import {HomeScreen, AddConfScreen} from './screen';
import {createStackNavigator} from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools }from "redux-devtools-extension"

const NavigationStack = createStackNavigator({
  Home: HomeScreen,
  AddConf: AddConfScreen
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#1E90FF'
    },
    headerTintColor:'#FFF'
  }
});

export default class App extends Component {

  render() {
    return <NavigationStack/>;
  }
}


