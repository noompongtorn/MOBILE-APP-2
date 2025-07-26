// LeagueDetail.tsx
import Button from '@component/Button';
import {CardBoard} from '@component/Card';
import Typography from '@component/Typography';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {I18n} from '@utils/i18n';
import {RootStackParamList} from 'src/routes/config';
import ScrollContainer from '@component/ScrollContainer';
import {randomNumber} from '@utils/number/random';
import {recordApi} from '@lib/action/userAction';
import modal from '@lib/store/store';

type LeagueDetailRouteProp = RouteProp<RootStackParamList, 'LeagueDetail'>;

interface Props {
  route: LeagueDetailRouteProp;
}

const template = {
  isWin: false,
  isTemplate: true,
};

const LeagueDetail = ({route}: Props) => {
  const navigation = useNavigation<LeagueDetailRouteProp>();

  const {item} = route.params;
  const currentItem = {
    ...item,
    rounds: Array.from({length: 6}).map(() => ({
      ...template,
      name: randomNumber(),
    })),
  };

  async function handleStart() {
    const results = await recordApi({
      random: currentItem.rounds.map(item => item.name),
      content: currentItem,
      name: item.currentTeam + ' vs ' + item.defeatTeam,
    });
    if (!results.success) {
      modal.error({
        title: I18n().errorSystem,
        description: I18n().failedToRegister,
      });
      return;
    }

    modal.push({title: I18n().success, description: ''});
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollContainer>
        <View style={styles.viewLayout}>
          <Typography text={I18n().readyRandom} />

          <CardBoard item={currentItem} />

          <Button onPress={handleStart} text={I18n().start} />
        </View>
      </ScrollContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  viewLayout: {
    gap: 8,
  },
});

export default LeagueDetail;
