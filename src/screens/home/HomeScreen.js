import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { Card, Avatar, Icon, Button } from 'react-native-elements';
//import { createStackNavigator } from 'react-navigation';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "GitHub Users",
    headerTintColor: '#f5f5f5',
    headerStyle: {
      backgroundColor: '#dc143c',
    },
    headerLeft: <Icon
      name='home'
      color='#f5f5f5'
      size={40}
      onPress={() => Alert.alert('GitHub welcomes you !!')}
    />
  };
  constructor(props) {
    super(props);
    this.state = {
      usersData: {
      },
      item: {
      }
    };
  }
  componentDidMount() {
    this.getUsersData();
  }
  getUsersData = async () => {
    try {
      const usersData = await fetch("https://api.github.com/users");
      const jsonUsersData = await usersData.json();
      console.warn(jsonUsersData);
      this.setState({
        usersData: jsonUsersData
      });
    } catch (e) {
      console.warn(e);
    }
  }
  handleRenderItem = ({ item }) => (
    <View>
      <View>
        <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/d8/5f/14/d85f1447ae039d0640111dae2919e6b6.jpg' }} style={{ backfaceVisibility: 'visible' }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile', { 'name': item.login })}
          >
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingBottom: 10, paddingTop: 10 }}>
              <Avatar
                medium
                rounded
                source={{ uri: `${item.avatar_url}` }}
                activeOpacity={0.7}
              />
              <View style={{ paddingLeft: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Name: {item.login}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>ID: {item.id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  )
  render() {
    const { usersData } = this.state;
    if (Object.keys(usersData).length <= 0 && usersData.constructor === Object) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color='red' />
        </View>
      )
    }
    return (
      <FlatList
        data={this.state.usersData}
        renderItem={this.handleRenderItem}
      />
    );
  }
}