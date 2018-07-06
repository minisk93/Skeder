import React, {Component} from 'react';
import {View, Text, ListView, Button} from "react-native";
import {connect} from 'react-redux';
import {size, color} from '../Constants'

//https://pastebin.com/Pe6h5z2f
//https://pastebin.com/qVwi5fxN

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'All Conferences',
      headerRight: (
        <Text style={{color: color.BASE_BLUE, padding: size.x2}}
              onPress={() => navigation.navigate('AddConf')}>Add</Text>
      )
    }
  };

  constructor() {
    super();

    this.state = {
      conferences: []
    };
  }

  componentDidMount() {
    this.props.onGetConferences()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: color.BASE_WHITE}}>
        <ListView
          style={{flex: 1}}
          dataSource={ds.cloneWithRows(this.props.conferences)}
          enableEmptySections={true}
          renderRow={item => {
            let keys = Object.keys(this.props.conferences);
            let bottomWidth = keys[keys.length - 1] === Object.keys(item) ? size.d4 : size.d4 / 2;
            return (
              <View
                style={{
                  padding: size.b,
                  borderTopWidth: size.d4,
                  borderLeftWidth: size.d4,
                  borderRightWidth: size.d4,
                  borderBottomWidth: bottomWidth,
                  borderColor: color.BASE_RED,
                  backgroundColor: color.BASE_WHITE
                }}>
                <Text style={{fontSize: size.ft, color: color.BASE_BLUE}}>{item.title}</Text>
              </View>
            )
          }}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    conferences: state.conference.conferences
  }),
  dispatch => ({
    onGetConferences: () => dispatch({type: 'UPDATE_CONFERENCES'})
  })
)(HomeScreen)