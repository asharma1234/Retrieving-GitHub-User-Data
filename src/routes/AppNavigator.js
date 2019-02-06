import React from 'react';
import { createStackNavigator } from "react-navigation";

import { HomeScreen, ProfileScreen } from '../screens';

export default createStackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen }
});