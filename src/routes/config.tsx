import {BoardItem} from '@component/Card/Board';
import TabbarIcon from '@component/TabbarIcon';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from 'node_modules/@react-navigation/stack/lib/typescript/commonjs/src';
import {Text, TouchableOpacity} from 'react-native';
import {PlayerResult} from '@lib/constant/nba.contants';

import HomeIcon from '@assets/image/home.png';
import BasketballIcon from '@assets/image/basketball.png';
import HistoryIcon from '@assets/image/history.png';
import ProfileIcon from '@assets/image/user.png';
import {I18n} from '@utils/i18n';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ChangePassword: undefined;
  LeagueDetail: {item: BoardItem};
  Profile: {userId: string};
  Authorization: undefined | {token: string};
  EditProfile: undefined;
  MyFavorite: undefined;
  PlayHistory: {item: PlayerResult; type: number};
};

export type RootBottomStackParamList = {
  Home: undefined;
  Coming: undefined;
  Profile: {userId: string};
  PlayHistory: undefined;
  Teams: undefined;
};

export function screenOptions(): BottomTabNavigationOptions {
  return {
    headerShown: false,
    tabBarStyle: {height: 75, backgroundColor: '#000'},
    tabBarLabelStyle: {fontSize: 12, fontFamily: 'Prompt-Regular'},
  };
}

export function headerOptions({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList>;
}) {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitle: '',
    headerBackTitleVisible: false,
    headerTintColor: 'white',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Text style={{color: 'white', marginLeft: 10}}>Back</Text>
      </TouchableOpacity>
    ),
  };
}

export function renderHomeTabIcon(focused: boolean) {
  return (
    <TabbarIcon icon={HomeIcon} focused={focused} label={I18n().homeTab} />
  );
}

export function renderComingTabIcon(focused: boolean) {
  return (
    <TabbarIcon icon={BasketballIcon} focused={focused} label={I18n().teams} />
  );
}

export function renderPlayHistoryTabIcon(focused: boolean) {
  return (
    <TabbarIcon icon={HistoryIcon} focused={focused} label={'กำลังจะมาถึง'} />
  );
}

export function renderTeamsTabIcon(focused: boolean) {
  return (
    <TabbarIcon icon={BasketballIcon} focused={focused} label={I18n().teams} />
  );
}

export function renderProfileTabIcon(focused: boolean) {
  return (
    <TabbarIcon icon={ProfileIcon} focused={focused} label={I18n().Profile} />
  );
}
