import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

import Account from './assets/accounting.png';
import Money from './assets/profits.png';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Create account"
          component={Screen1}
          options={{
            tabBarIcon: () => <Image source={Account} style={styles.image} />,
            headerStyle: {
              backgroundColor: '#9932CC',
            },
            headerTintColor: '#ffffff',
          }}
        />
        <Tab.Screen
          name="Info"
          component={Screen2}
          options={{
            tabBarIcon: () => <Image source={Money} style={styles.image} />,

            headerStyle: {
              backgroundColor: '#9932CC',
            },
            headerTintColor: '#ffffff',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
});

export default App;
