import React, {Component} from 'react';
import {HomeScreen, AddConfScreen} from './screen';
import {createStackNavigator} from 'react-navigation';
import combineReducers from './reducers';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {size, color} from './Constants';

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));

const NavigationStack = createStackNavigator({
  Home: HomeScreen,
  AddConf: AddConfScreen
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: color.BASE_YELLOW_LIGHT
    },
    headerTintColor: color.BASE_BLUE
  }
});

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationStack/>
      </Provider>
    );
  }
}


