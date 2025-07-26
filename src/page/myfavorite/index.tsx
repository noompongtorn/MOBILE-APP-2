import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Search from '@component/Search';
import {CardContainer, CardPlayerDetail} from '@component/Card';
import ScrollContainer from '@component/ScrollContainer';
import {favoritePageListApi, homePageListApi} from '@lib/action/nbaAction';
import modal from '@lib/store/store';
import {PlayerResult, FavoriteResult} from '@lib/constant/nba.contants';
import {favoriteApi} from '@lib/action/userAction';
import {I18n} from '@utils/i18n';
import {useIsFocused} from '@react-navigation/native';

const MyFavorite = () => {
  const [player, setPlayer] = useState<PlayerResult[]>([]);
  const [favorite, setFavorite] = useState<FavoriteResult[]>([]);
  const [playersWithStatus, setPlayersWithStatus] = useState<PlayerResult[]>(
    [],
  );
  const isFocus = useIsFocused();

  function handleSearch(text: string) {}

  useEffect(() => {
    loadApi();
    loadfavoriteApi();
  }, [isFocus]);

  async function loadApi() {
    const response = await homePageListApi();

    if (!response.success) {
      modal.error({title: I18n().errorSystem, description: ''});

      return;
    }

    const players = response.data?.players.result ?? [];
    setPlayer(players);
  }

  useEffect(() => {
    const _player = [...player];
    const _favorite = [...favorite];

    const updatedPlayers = _player.map(player => ({
      ...player,
      isFavorite: _favorite.some(team => team.team_id === player.TeamID),
    }));

    const _filter = updatedPlayers.filter(player => player.isFavorite);
    setPlayersWithStatus(_filter);
  }, [player, favorite]);

  async function _setfavoriteApi(item: PlayerResult) {
    const response = await favoriteApi({
      teamId: item.TeamID.toString(),
    });

    if (!response.success) {
      modal.error({title: I18n().errorSystem, description: ''});
      return;
    }
    await loadApi();
    await loadfavoriteApi();
  }

  async function loadfavoriteApi() {
    const response = await favoritePageListApi();

    if (!response.success) {
      modal.error({title: I18n().errorSystem, description: ''});

      return;
    }

    const teams = response.data?.rows ?? [];
    setFavorite(teams);
  }

  return (
    <View style={styles.container}>
      <ScrollContainer>
        <Search onChangeText={handleSearch} />

        <CardContainer
          header={I18n().allTeams}
          data={playersWithStatus}
          renderItem={({item}) => (
            <CardPlayerDetail item={item} _setfavoriteApi={_setfavoriteApi} />
          )}
        />
      </ScrollContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default MyFavorite;
