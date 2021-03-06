import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Login,
  Signup,
  SplashScreen,
  Comments,
  ProfilInformation,
  ProfileGuest,
  AddQuestion,
  BlogDetail,
} from './Pages';
import {Main, Profile, Blog, Forum, AddProducts} from './Drawermenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />

      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Forum" component={Forum} />
      <Drawer.Screen name="Blog" component={Blog} />
      <Drawer.Screen name="Add Products" component={AddProducts} />
    </Drawer.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen
          name="Splashscreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, gestureEnabled: true}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false, gestureEnabled: true}}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{headerShown: false, gestureEnabled: true}}
        />
        <Stack.Screen
          name="DrawerMenu"
          component={DrawerMenu}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ProfileGuest"
          component={ProfileGuest}
          options={{headerShown: false, gestureEnabled: true}}
        />
        <Stack.Screen
          name="ProfilInformation"
          component={ProfilInformation}
          options={{headerShown: false, gestureEnabled: true}}
        />
        <Stack.Screen
          name="AddQuestion"
          component={AddQuestion}
          options={{headerShown: false, gestureEnabled: true}}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{headerShown: false, gestureEnabled: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
