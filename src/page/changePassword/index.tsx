import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {I18n} from '@utils/i18n';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/routes/config';
import TextField from '@component/InputField';
import Button from '@component/Button';

const Profile = require('@assets/image/profile.png');

type LeagueDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authorization'
>;

const ChangePassword = () => {
  const [email, setEmail] = useState<string>('');

  const navigation = useNavigation<LeagueDetailScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TextField
        labelIcon={Profile}
        labelText={I18n().email}
        value={email}
        onChangeText={setEmail}
        placeholder={`${I18n().email}...`}
        placeholderTextColor={'#FFF'}
      />
      <Button
        text={I18n().changePassword}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangePassword;
