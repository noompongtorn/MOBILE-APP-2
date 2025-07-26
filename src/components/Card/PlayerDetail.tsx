import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typography from '@component/Typography';
import DynamicImage from '@component/Image/Image';
import {PlayerResult} from '@lib/constant/nba.contants';
import {I18n} from '@utils/i18n';
import Favorite from '@component/Favorite';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from 'src/routes/config';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PlayerDetailParam = {
  item: PlayerResult;
  _setfavoriteApi: (item: PlayerResult) => void;
};

type LeagueDetailScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  'LeagueDetail'
>;
export default function PlayerDetail({
  item,
  _setfavoriteApi,
}: PlayerDetailParam) {
  const navigation = useNavigation<LeagueDetailScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={async () => {
        const type = await AsyncStorage.getItem('type');
        navigation.navigate('PlayHistory', {item, type: Number(type)});
      }}
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.viewNameteam}>
          <DynamicImage uri={item.WikipediaLogoUrl ?? ''} />
          <Typography text={item.Name} styleProps={styles.teamName} />
        </View>
        <Favorite
          checked={item.isFavorite}
          onCheck={() => {
            _setfavoriteApi(item);
            item.isFavorite = !item.isFavorite;
          }}
          styleProps={styles.viewcheckbox}
          styleTextProps={styles.viewcheckboxText}
        />
      </View>

      <View>
        <Typography
          text={`Status: ${
            item.Active ? I18n().currentlyInUse : I18n().offline
          }`}
        />
        <Typography text={`City: ${item.City}`} />
        {/* <Typography text={`Conference: ${item.Conference}`} />
        <Typography text={`Division: ${item.Division}`} />
        <Typography text={`Head Coach: ${item.HeadCoach}`} /> */}

        <View style={styles.underLine} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 12,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewNameteam: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 20,
    fontFamily: 'Prompt-Regular',
    marginLeft: 16,
  },
  viewcheckbox: {
    flexDirection: 'row',
    backgroundColor: '#d5d5d5',
  },
  viewcheckboxText: {
    marginLeft: 10,
    fontFamily: 'Prompt-Regular',
    fontSize: 14,
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
});
