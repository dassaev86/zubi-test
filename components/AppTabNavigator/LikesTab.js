import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class LikesTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LikesTab really works?</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LikesTab;