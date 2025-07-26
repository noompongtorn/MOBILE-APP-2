import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../page/login';
import Register from '../page/register';
import ChangePassword from '../page/changePassword';
import Coming from '../page/coming';
import Home from '../page/home/index';
import PlayHistory from '../page/playHistory';
import Profile from '../page/profile';
import LeagueDetail from '../page/leagueDetail';
import Teams from '../page/teams';
import EditProfile from '../page/editProfile';
import MyFavorite from '../page/myfavorite';

import {
  headerOptions,
  renderComingTabIcon,
  renderHomeTabIcon,
  renderPlayHistoryTabIcon,
  renderProfileTabIcon,
  RootBottomStackParamList,
  RootStackParamList,
  screenOptions,
} from './config';
import {StackNavigationProp} from 'node_modules/@react-navigation/stack/lib/typescript/commonjs/src';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from '@lib/store/authReducer';

type MainNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootBottomStackParamList>();

function UnauthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen
        options={({navigation}) =>
          headerOptions({navigation: navigation as never as MainNavigation})
        }
        name="Register"
        component={Register}
      />

      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Authorization">
      <Stack.Screen name="Authorization" component={WithBottom} />
      <Stack.Screen
        options={({navigation}) =>
          headerOptions({
            navigation: navigation as never as MainNavigation,
          })
        }
        name="EditProfile"
        component={EditProfile}
      />

      <Stack.Screen
        options={({navigation}) =>
          headerOptions({
            navigation: navigation as never as MainNavigation,
          })
        }
        name="LeagueDetail"
        component={LeagueDetail}
      />

      <Stack.Screen
        options={({navigation}) =>
          headerOptions({
            navigation: navigation as never as MainNavigation,
          })
        }
        name="MyFavorite"
        component={MyFavorite}
      />

      <Stack.Screen
        options={({navigation}) =>
          headerOptions({
            navigation: navigation as never as MainNavigation,
          })
        }
        name="PlayHistory"
        component={PlayHistory}
      />
    </Stack.Navigator>
  );
}

function WithBottom() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => renderHomeTabIcon(focused),
        }}
      />

      <Tab.Screen
        name="Coming"
        component={Coming}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => renderPlayHistoryTabIcon(focused),
        }}
      />

      {/* <Tab.Screen
        name="PlayHistory"
        component={PlayHistory}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => renderPlayHistoryTabIcon(focused),
        }}
      /> */}

      <Tab.Screen
        name="Teams"
        component={Teams}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => renderComingTabIcon(focused),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => renderProfileTabIcon(focused),
        }}
      />
    </Tab.Navigator>
  );
}

function Routes() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthStack /> : <UnauthStack />}
    </NavigationContainer>
  );
}

export default Routes;
