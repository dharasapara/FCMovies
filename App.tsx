import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  StatusBar.setBackgroundColor('#222222');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'MOVIEFIX',
            headerStyle: {
              backgroundColor: '#222222',
              borderBottomWidth: 0,
              elevation: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FF0000',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
