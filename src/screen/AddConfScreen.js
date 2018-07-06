import React, {Component} from 'react';
import {TextInput, View, Button} from "react-native";
import {fetchJSON} from "../network/Network";
import {Conference, Speaker, Event} from "../realmDB";
import {toRealmArray} from "../utils/Utils";
import {connect} from 'react-redux'

class AddConfScreen extends Component {
  static navigationOptions = {
    title: 'New Conference'
  };

  constructor() {
    super();

    this.state = {
      jsonURL: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.jsonURL !== nextState.jsonURL)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput placeholder={"Place your URL here"} onChangeText={(text) => this.setState({jsonURL: text})}/>
        <Button title={"SUBMIT"} color={'#1E90FF'} onPress={() => this.fetchData()}/>
      </View>
    )
  }

  fetchData = () => {
    fetchJSON(this.state.jsonURL)
      .then(conference => {
        let conf = conference.info;
        conf.id = Conference.getBiggerId() + 1;
        conf.contact = toRealmArray(conf.contact);
        Conference.create(conf);

        let ids = {};
        let speakers = conference.speakers;
        for (let i = 0; i < speakers.length; i++) {
          let id = Speaker.getBiggerId() + 1;
          speakers[i].id = id;
          ids[speakers[i].rawId] = id;
          Speaker.create(speakers[i])
        }

        let events = conference.events;
        for (let i = 0; i < events.length; i++) {
          events[i].id = Event.getBiggerId() + 1;
          events[i].location = toRealmArray(events[i].location);
          events[i].contact = toRealmArray(events[i].contact);
          events[i].confId = conf.id;
          let speakers = events[i].speaker;
          for (let j = 0; j < speakers.length; j++) {
            speakers[j] = ids[speakers[j]]
          }
          events[i].speaker = toRealmArray(events[i].speaker);
          Event.create(events[i]);
        }
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => {
        this.props.onAddConference()
      });
  }
}

export default connect(
  null,
  dispatch => ({
    onAddConference: () => dispatch({type: 'UPDATE_CONFERENCES'})
  })
)(AddConfScreen)