import React, {Component} from 'react';
import {fetchJSON} from "../network/Network";
import {Text, ListView, Button} from "react-native";

//https://pastebin.com/Pe6h5z2f
//https://pastebin.com/qVwi5fxN

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'All Conferences',
      headerRight: (
        <Text style={{color: "#FFF", padding: 20}} onPress={() => navigation.navigate('AddConf')}>Add</Text>
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
    let confs = [];
    const conf1 = fetchJSON('https://pastebin.com/raw/Pe6h5z2f')
      .then(conference => confs.push(conference));
    const conf2 = fetchJSON('https://pastebin.com/raw/qVwi5fxN')
      .then(conference => confs.push(conference));
    Promise.all([conf1, conf2]).then(() => this.setState({conferences: confs}))
  }

  render() {
    return (
      <ListView
        style={{flex: 1}}
        dataSource={ds.cloneWithRows(this.state.conferences)}
        enableEmptySections={true}
        renderRow={item => {
          return <Text>{item.info.title}</Text>
        }}
      />
    );
  }
}