import React, { Component } from "react"

import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import moment from 'moment';


export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Details of Users",
    headerTintColor: '#f5f5f5',
    headerTintSize: 10,
    headerStyle: {
      backgroundColor: '#dc143c',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      usersData: {
      },
      item: {
      },
      isFetching: false
    };
  }
  componentDidMount() {
    this.getUsersData();
  }
  getUsersData = async () => {
    try {
      const { params: { name } } = this.props.navigation.state;
      this.setState({ isFetching: true });
      const usersData = await fetch(`https://api.github.com/users/${name}`);
      const jsonUsersData = await usersData.json();
      this.setState({ isFetching: false })
      this.setState({
        usersData: jsonUsersData
      });
    } catch (e) {
      console.warn(e);
    }
  }
  render() {
    const { isFetching, usersData } = this.state;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'c0c0c0' }}>
        <View>
          <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/d8/5f/14/d85f1447ae039d0640111dae2919e6b6.jpg' }} style={{ height: '100%', width: '100%', backfaceVisibility: 'visible' }}>

            <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                xlarge
                rounded
                source={{ uri: `${usersData.avatar_url}` }}
                activeOpacity={0.7}
              />
            </View>
            <View style={{ flex: 0.6 }}>
              <View>
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, marginTop: 20, fontWeight: 'bold' }}>Name: {usersData.login}</Text>
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>ID: {usersData.id}</Text>
                {(usersData.email === null) ? (null) : [<Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Email: {usersData.email}</Text>]}
                {(usersData.location === null) ? (null) : [<Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Location: {usersData.location}</Text>]}
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Followers: {usersData.followers}</Text>
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Following: {usersData.following}</Text>
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Public Repos: {usersData.public_repos}</Text>
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Created at: {moment(usersData.created_at).format('llll')}</Text>
                <Text style={{ fontSize: 18, color: 'red', marginLeft: 15, fontWeight: 'bold' }}>Updated at: {moment(usersData.updated_at).format('llll')}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>

    );
  }
}