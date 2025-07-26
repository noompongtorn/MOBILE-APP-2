import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from 'src/routes/config';
import {I18n} from '@utils/i18n';
import DynamicImage from '@component/Image/Image';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BoardParam = {
  item: BoardItem;
};

export type BoardItem = {
  id?: number;
  competitions: Competition[];
  rounds: Round[];
  currentTeam: string;
  defeatTeam: string;
  currentTeamLogo?: string;
  defeatTeamLogo?: string;
};

export type Competition = {
  name: string;
};

export type Round = {
  isWin: boolean;
  name: string;
};

type LeagueDetailScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  'LeagueDetail'
>;

export default function Recommend({item}: BoardParam) {
  const navigation = useNavigation<LeagueDetailScreenNavigationProp>();

  function handleSelect(item: BoardItem) {
    navigation.navigate('LeagueDetail', {item});
  }

  return (
    <View style={styles.details}>
      <View style={styles.matchLayout}>
        <View style={styles?.match}>
          <TouchableOpacity
            onPress={async () => {
              const type = await AsyncStorage.getItem('type');
              navigation.navigate('PlayHistory', {
                ...item,
                item: item?.currentTeam,
                type: Number(type),
              } as never);
            }}
            style={styles.matchDetail}>
            <DynamicImage
              width={32}
              height={32}
              uri={item.currentTeamLogo ?? ''}
            />

            <Text style={styles.matchLabel}>{item.currentTeam}</Text>
          </TouchableOpacity>

          <View style={{width: '10%', marginHorizontal: 5}}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFF',
                fontFamily: 'Prompt-Regular',
              }}>
              VS
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const type = await AsyncStorage.getItem('type');
              navigation.navigate('PlayHistory', {
                ...item,
                item: item?.defeatTeam,
                type: Number(type),
              } as never);
            }}
            style={styles.matchDetail}>
            <DynamicImage
              width={32}
              height={32}
              uri={item.defeatTeamLogo ?? ''}
            />

            <Text numberOfLines={2} style={styles.matchLabel}>
              {item.defeatTeam}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          onPress={() => handleSelect(item)}
          style={styles.start}>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
              fontFamily: 'Prompt-Regular',
            }}>
            {I18n().start}
          </Text>
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          gap: 16,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#FFF',
            fontFamily: 'Prompt-Regular',
          }}>
          วันที่แข่งขัน : {dayjs(item.DateTimeUTC).format('DD-MM-YYYY')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#FFF',
            fontFamily: 'Prompt-Regular',
          }}>
          เวลาแข่งขัน : {dayjs(item.DateTimeUTC).format('HH:mm น.')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  matchLayout: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    width: '100%',
    height: 95,
    backgroundColor: '#FFFFFF90',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  match: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
  },
  matchDetail: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchLabel: {
    fontSize: 12,
    color: '#F0D313',
    marginLeft: 10,
    width: '40%',
  },
  start: {
    width: '15%',
    height: 35,
    backgroundColor: '#F0D313',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
