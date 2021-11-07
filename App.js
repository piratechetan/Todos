import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,

  View,
  Text,
  StatusBar,
} from 'react-native';
import Home from './Src/Screens/Home';
import Add from './Src/Screens/Add';
import Edit from './Src/Screens/Edit';
import { NativeBaseProvider, Title } from 'native-base';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown:false,
             headerStyle:{
              backgroundColor:"#FFF"
             },
             title:"Reminder Store",
             headerTitleStyle:{
               textAlign:'center',
               color:'#23C4ED'
             }
             
            }}
            ></Stack.Screen>
            <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerShown:false,
             headerStyle:{
              backgroundColor:"#FFF"
             },
             title:"Reminder Adder",
             headerTitleStyle:{
               textAlign:'center',
               color:'#23C4ED'
             }
             
            }}
            ></Stack.Screen>
            <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerShown:false,
             headerStyle:{
              
              backgroundColor:"#FFF"
             },
             title:"Reminder Store",
             headerTitleStyle:{
               textAlign:'center',
               color:'#23C4ED'
             }
             
            }}
            ></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
          </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
