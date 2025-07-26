/* eslint-disable react-native/no-unused-styles */
import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '@component/Search';
import {
  CardBoard,
  CardBoardSmall,
  CardContainer,
  CardRecommend,
} from '@component/Card';
import {BoardItem} from '@component/Card/Board';
import ScrollContainer from '@component/ScrollContainer';
import {homePageListApi, homePageListWNBAApi} from '@lib/action/nbaAction';
import {getprofileApi} from '@lib/action/userAction';
import modal from '@lib/store/store';
import {
  mapGameDataToTeamStructure,
  mapGameDataToTeamStructure2,
} from '@utils/formatter/profile-team';
import {I18n} from '@utils/i18n';
import {useIsFocused} from '@react-navigation/native';
import {randomNumber} from '@utils/number/random';
import {recordNBAApi, recordWNBAApi} from '@lib/action/userAction';
import {GameResult, PlayerResult, Record} from '@lib/constant/nba.contants';
import TabScroll from '@component/TabScroll';
import _ from 'lodash';

const template = {
  isWin: false,
  isTemplate: true,
};

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const [comings, setComings] = useState<BoardItem[]>([]);
  const [currentGame, setCurrentGame] = useState<BoardItem[]>([]);
  const [records, setRecords] = useState<BoardItem[]>([]);

  const [comingsWNBA, setComingsWNBA] = useState<BoardItem[]>([]);
  const [currentGameWNBA, setCurrentGameWNBA] = useState<BoardItem[]>([]);
  const [recordsWNBA, setRecordsWNBA] = useState<BoardItem[]>([]);

  const [user, setuser] = useState<any>('');
  const [activeTab, setActiveTab] = useState(0); // 0 for NBA, 1 for WNBA

  const scrollRef = React.useRef<ScrollView>(null);
  const isFocus = useIsFocused();

  function handleSearch(text: string) {}

  useEffect(() => {
    loadApi();
    profile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus]);

  useEffect(() => {
    profile();
  }, [activeTab]);

  async function profile() {
    const response = await getprofileApi(activeTab);

    setuser(response.data);
  }

  async function loadApi() {
    const [nbaRes, wnbaRes] = await Promise.all([
      homePageListApi(),
      homePageListWNBAApi(),
    ]);

    if (!nbaRes.success) {
      modal.error({title: 'มีข้อผิดพลาดในระบบ NBA', description: ''});

      return;
    }

    if (!wnbaRes.success) {
      modal.error({title: 'มีข้อผิดพลาดในระบบ WNBA', description: ''});

      return;
    }

    // NBA
    const rawDataNBA = nbaRes.data?.nextGame?.result ?? [];
    const playersNBA = nbaRes.data?.players.result ?? [];
    const rewRecordsNBA = nbaRes.data?.record ?? [];

    await autoStart(rawDataNBA, playersNBA, rewRecordsNBA, 'nba');

    // WNBA
    const rawDataWNBA = wnbaRes.data?.nextGame?.result ?? [];
    const playersWNBA = wnbaRes.data?.players.result ?? [];
    const rewRecordsWNBA = wnbaRes.data?.record ?? [];

    await autoStart2(rawDataWNBA, playersWNBA, rewRecordsWNBA, 'wnba');

    await setupApi();
  }

  async function setupApi() {
    const [nbaRes, wnbaRes] = await Promise.all([
      homePageListApi(),
      homePageListWNBAApi(),
    ]);

    if (!nbaRes.success) {
      modal.error({title: 'มีข้อผิดพลาดในระบบ NBA', description: ''});

      return;
    }

    if (!wnbaRes.success) {
      modal.error({title: 'มีข้อผิดพลาดในระบบ WNBA', description: ''});

      return;
    }

    // NBA
    const players = nbaRes.data?.players.result ?? [];
    const _currentGame = nbaRes.data?.currentGame?.result ?? [];
    const rawData = nbaRes.data?.nextGame?.result ?? [];
    const rewRecords =
      nbaRes.data?.record?.filter(i => i.record_type === 'nba') ?? [];

    setComings(rawData.map(item => mapGameDataToTeamStructure(item, players)));
    setCurrentGame(
      _currentGame.map(item => mapGameDataToTeamStructure(item, players)),
    );
    setRecords(rewRecords.map(item => item.record_data));

    // WNBA
    const playersWNBA = wnbaRes.data?.players.result ?? [];
    const _currentGameWNBA = wnbaRes.data?.currentGame?.result ?? [];
    const rawDataWNBA = wnbaRes.data?.nextGame?.result ?? [];
    const rewRecordsWNBA =
      wnbaRes.data?.record?.filter(i => i.record_type === 'wnba') ?? [];
    setComingsWNBA(
      rawDataWNBA.map(item => mapGameDataToTeamStructure2(item, playersWNBA)),
    );
    setCurrentGameWNBA(
      _currentGameWNBA.map(item =>
        mapGameDataToTeamStructure2(item, playersWNBA),
      ),
    );

    setRecordsWNBA(rewRecordsWNBA.map(item => item.record_data));
  }

  // auto
  async function autoStart(
    rawData: GameResult[] = [],
    players: PlayerResult[] = [],
    rewRecords: Record[] = [],
    type: string,
  ) {
    await Promise.all(
      rawData
        .map(item => mapGameDataToTeamStructure(item, players))
        .map(async item => {
          const currentItem = {
            ...item,
            thisGame: item.currentTeam,
            rounds: Array.from({length: 6}).map(() => ({
              ...template,
              name: randomNumber(),
            })),
          };

          const isStart = rewRecords.find(
            rewRecord => rewRecord.record_data.id === item.id,
          );

          if (isStart) {
            return;
          }

          const results = await recordNBAApi(activeTab, {
            random: currentItem.rounds.map(item => item.name),
            content: currentItem,
            name: item.currentTeam + ' vs ' + item.defeatTeam,
            type: type,
          });
          if (!results.success) {
            return;
          }
        }),
    );

    await Promise.all(
      rawData
        .map(item => mapGameDataToTeamStructure(item, players))
        .map(async item => {
          const currentItem = {
            ...item,
            thisGame: item.defeatTeam,
            rounds: Array.from({length: 6}).map(() => ({
              ...template,
              name: randomNumber(),
            })),
          };

          const isStart = rewRecords.find(
            rewRecord => rewRecord.record_data.id === item.id,
          );

          if (isStart) {
            return;
          }

          const results = await recordNBAApi(activeTab, {
            random: currentItem.rounds.map(item => item.name),
            content: currentItem,
            name: item.defeatTeam + ' vs ' + item.currentTeam,
            type: type,
          });

          if (!results.success) {
            return;
          }
        }),
    );
  }

  async function autoStart2(
    rawData: GameResult[] = [],
    players: PlayerResult[] = [],
    rewRecords: Record[] = [],
    type: string,
  ) {
    await Promise.all(
      rawData
        .map(item => mapGameDataToTeamStructure2(item, players))
        .map(async item => {
          const currentItem = {
            ...item,
            thisGame: item.currentTeam,
            rounds: Array.from({length: 6}).map(() => ({
              ...template,
              name: randomNumber(),
            })),
          };

          const isStart = rewRecords.find(
            rewRecord => rewRecord.record_data.id === item.id,
          );

          if (isStart) {
            return;
          }

          const results = await recordWNBAApi(activeTab, {
            random: currentItem.rounds.map(item => item.name),
            content: currentItem,
            name: item.currentTeam + ' vs ' + item.defeatTeam,
            type: type,
          });

          if (!results.success) {
            return;
          }
        }),
    );

    await Promise.all(
      rawData
        .map(item => mapGameDataToTeamStructure2(item, players))
        .map(async item => {
          const currentItem = {
            ...item,
            thisGame: item.defeatTeam,
            rounds: Array.from({length: 6}).map(() => ({
              ...template,
              name: randomNumber(),
            })),
          };
          const isStart = rewRecords.find(
            rewRecord => rewRecord.record_data.id === item.id,
          );
          if (isStart) {
            return;
          }
          const results = await recordWNBAApi(activeTab, {
            random: currentItem.rounds.map(item => item.name),
            content: currentItem,
            name: item.defeatTeam + ' vs ' + item.currentTeam,
            type: type,
          });

          if (!results.success) {
            return;
          }
        }),
    );
  }

  const onTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({x: screenWidth * index, animated: true});
  };

  return (
    <View style={styles.container}>
      <ScrollContainer>
        <Search onChangeText={handleSearch} />

        <View style={styles.marginLeft10}>
          <Text style={styles.textName}>
            {user?.user?.username} {'ยอดรวม'} {user?.user?.total} {'บาท'}
          </Text>
        </View>

        {/* Tabs */}
        <TabScroll
          activeTab={activeTab}
          onTabPressOne={async () => {
            await AsyncStorage.setItem('type', _.toString(0));
            onTabPress(0);
          }}
          onTabPressTwo={async () => {
            await AsyncStorage.setItem('type', _.toString(1));
            onTabPress(1);
          }}
        />

        {/* Scrollable content */}
        {activeTab === 0 ? (
          <View style={styles.page}>
            <CardContainer
              header={I18n().currentlyPlaying}
              data={[{...records[0]}]}
              renderItem={({item}) => <CardBoard item={item} />}
              ListFooterComponent={undefined}
            />

            <CardContainer
              header={I18n().playingHistory}
              data={records}
              horizontal
              renderItem={({item}) => <CardBoardSmall item={item} />}
              ListFooterComponent={undefined}
            />

            <CardContainer
              header={I18n().comings}
              data={comings}
              renderItem={({item}) => <CardRecommend item={item} />}
              ListFooterComponent={undefined}
            />
          </View>
        ) : (
          <View style={styles.page}>
            {/* WNBA */}
            <>
              <CardContainer
                header={I18n().currentlyPlaying}
                data={[{...recordsWNBA[0]}]}
                renderItem={({item}) => <CardBoard item={item} />}
                ListFooterComponent={undefined}
              />

              <CardContainer
                header={I18n().playingHistory}
                data={recordsWNBA}
                horizontal
                renderItem={({item}) => <CardBoardSmall item={item} />}
                ListFooterComponent={undefined}
              />

              <CardContainer
                header={I18n().comings}
                data={comingsWNBA}
                renderItem={({item}) => <CardRecommend item={item} />}
                ListFooterComponent={undefined}
              />
            </>
          </View>
        )}
      </ScrollContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#222',
    paddingVertical: 10,
  },
  tab: {
    marginHorizontal: 20,
  },
  activeTab: {
    color: '#fff',
    borderColor: '#fff',
  },
  tabText: {
    fontSize: 18,
    color: '#888',
    borderBottomWidth: 2,
    borderColor: 'transparent',
    paddingBottom: 5,
    fontFamily: 'Prompt-Regular',
  },
  textName: {color: '#FFF', fontSize: 18, fontFamily: 'Prompt-Regular'},
  page: {
    width: screenWidth,
    padding: 20,
  },
  marginLeft10: {},
});

export default Home;
