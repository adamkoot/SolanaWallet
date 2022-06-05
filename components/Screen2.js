import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';

export default class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.main}>
        <Text> Have a good day !!!! </Text>
        <Text> Adam Kot </Text>
        <Text style={{color: 'pink'}}> https://github.com/adamkoot </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
