import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollContainer from '@component/ScrollContainer';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/routes/config';
import Button from '@component/Button';
import {I18n} from '@utils/i18n';
import {auth, RootState} from '@lib/store/store';
import ToggleSwitch from '@component/Switch/Switch';
import {useDispatch, useSelector} from 'react-redux';
import {saveLanguage} from '@lib/store/i18nReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
type LeagueDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authorization'
>;
const Profile = () => {
  const navigation = useNavigation<LeagueDetailScreenNavigationProp>();
  const dispatch = useDispatch();
  const {language} = useSelector((state: RootState) => state.i18n);
  const [user, setuser] = useState<any>(null);

  async function profile() {
    const data = await AsyncStorage.getItem('profile');
    setuser(JSON.parse(data));
  }

  function handleLogout() {
    auth.delete();
  }

  function handleChangeLanguage() {
    saveLanguage(language === 'th' ? 'en' : 'th')(dispatch);
  }

  useEffect(() => {
    profile();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollContainer>
        {/* TODO: waiting move to component */}
        <View style={styles.viewimage}>
          <View style={styles.imageProfile}>
            <Image
              style={styles.imageIcon}
              source={require('@assets/image/profile.png')}
            />
          </View>

          <View style={styles.marginLeft10}>
            <Text style={styles.textName}>{user?.user?.email}</Text>
            <Text style={styles.textName}>{user?.user?.phone}</Text>
          </View>
        </View>

        <Button
          styleProps={styles.marginVertical5}
          variant="profile"
          styleTextProps={{color: '#000'}}
          text={I18n().myProfile}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
        />

        <Button
          styleProps={styles.marginVertical5}
          variant="profile"
          text={I18n().favorite}
          styleTextProps={{color: '#000'}}
          onPress={() => {
            navigation.navigate('MyFavorite');
          }}
        />

        <Button
          styleProps={styles.marginVertical5}
          variant="profile"
          text={I18n().condition}
          styleTextProps={{color: '#000'}}
          onPress={() => {}}
        />

        <Button
          styleProps={styles.marginVertical5}
          variant="profile"
          text={I18n().termsofService}
          styleTextProps={{color: '#000'}}
          onPress={() => {}}
        />

        <Button
          styleProps={styles.marginVertical10}
          variant="profile"
          text={I18n().frequently}
          styleTextProps={{color: '#000'}}
          onPress={() => {}}
        />
        {/* 
        <ToggleSwitch
          label={I18n().changeLanguage}
          onValueChange={handleChangeLanguage}
          initialValue={language === 'th'}
        /> */}
      </ScrollContainer>

      <View style={styles.viewBtn}>
        <Button
          text={I18n().deleteAccount}
          onPress={() => navigation.navigate('Register')}
        />

        <Button variant="logout" text={I18n().logOut} onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  viewimage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginVertical5: {
    marginVertical: 5,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  imageProfile: {
    width: 32,
    height: 32,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  imageIcon: {width: 24, height: 24},
  textName: {color: '#FFF', fontSize: 12, fontFamily: 'Prompt-Regular'},
  viewBtn: {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Profile;
