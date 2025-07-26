import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {I18n} from '@utils/i18n';
import {StackNavigationProp} from '@react-navigation/stack';
import {z} from 'zod';
import {RootStackParamList} from 'src/routes/config';
import Button from '@component/Button';
import Typography from '@component/Typography';
import TextField from '@component/InputField';
import CheckBox from '@component/CheckBox';
import ScrollContainer from '@component/ScrollContainer';
import modal from '@lib/store/store';
import {authRegister} from '@lib/action/authAction';

const Profile = require('@assets/image/profile.png');
const EyeView = require('@assets/image/eyeview.png');
const Lock = require('@assets/image/lock.png');

type LeagueDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authorization'
>;

const Register = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    rePassword: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [checkBox, setCheckBox] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<LeagueDetailScreenNavigationProp>();

  const schema = z
    .object({
      firstName: z.string().min(1, {message: I18n().firstNamerequired}),
      lastName: z.string().min(1, {message: I18n().lastNamerequired}),
      username: z.string().min(1, {message: I18n().usernameRequired}),
      password: z.string().min(6, {message: I18n().passwordRequired}),
      rePassword: z.string().min(1, {message: I18n().passwordConfirm}),
      phone: z.string().regex(/^\d+$/, {message: I18n().telephoneRequired}),
      email: z.string().email({message: I18n().emailRequired}),
    })
    .refine(data => data.password === data.rePassword, {
      path: ['rePassword'],
      message: "Passwords don't match.",
    });

  const handleChange = (field: string, value: string) => {
    setFormState(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: ''})); // Clear error for the field
  };

  async function handleSubmit() {
    setLoading(true);

    const result = schema.safeParse(formState);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setLoading(false);

      setErrors(fieldErrors);
      return;
    }
    // console.log('formState', formState);

    const response = await authRegister({
      data: {
        ...formState,
      },
    });

    if (!response.success) {
      setLoading(false);

      modal.error({
        title: I18n().registrationfailed,
        description: '',
      });
      return;
    }

    setLoading(false);
    modal.push({title: I18n().successfully, description: ''});

    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollContainer>
        <TextField
          labelIcon={Profile}
          labelText={I18n().firstName}
          value={formState.firstName}
          onChangeText={value => handleChange('firstName', value)}
          placeholder={`${I18n().firstName}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.firstName}
        />

        <TextField
          labelIcon={Profile}
          labelText={I18n().lastName}
          value={formState.lastName}
          onChangeText={value => handleChange('lastName', value)}
          placeholder={`${I18n().lastName}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.lastName}
        />

        <TextField
          labelIcon={Profile}
          labelText={I18n().Username}
          value={formState.username}
          onChangeText={value => handleChange('username', value)}
          placeholder={`${I18n().Username}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.username}
        />

        <TextField
          labelIcon={Lock}
          labelText={I18n().Password}
          value={formState.password}
          onChangeText={value => handleChange('password', value)}
          placeholder={`${I18n().Password}...`}
          placeholderTextColor="#FFF"
          icon={EyeView}
          secureTextEntry={showPassword}
          onIconPress={() => setShowPassword(!showPassword)}
          errorMessage={errors.password}
        />

        <TextField
          labelIcon={Lock}
          labelText={I18n().repassword}
          value={formState.rePassword}
          onChangeText={value => handleChange('rePassword', value)}
          placeholder={`${I18n().repassword}...`}
          placeholderTextColor="#FFF"
          secureTextEntry={showPassword}
          onIconPress={() => setShowPassword(!showPassword)}
          icon={EyeView}
          errorMessage={errors.rePassword}
        />

        <TextField
          labelIcon={Profile}
          labelText={I18n().telephone}
          value={formState.phone}
          onChangeText={value => handleChange('phone', value)}
          placeholder={`${I18n().telephone}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.phone}
        />

        <TextField
          labelIcon={Profile}
          labelText={I18n().email}
          value={formState.email}
          onChangeText={value => handleChange('email', value)}
          placeholder={`${I18n().email}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.email}
        />

        <CheckBox
          text={I18n().termsAndConditions}
          checked={checkBox}
          onCheck={setCheckBox}
          styleProps={styles.viewcheckbox}
          styleTextProps={styles.viewcheckboxText}
        />

        <Button text={I18n().register} onPress={handleSubmit} />

        <Typography text={I18n().or} styleProps={styles.viewor} />

        <Button
          variant="tertiary"
          text={I18n().dontHaveAccount}
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  viewcheckbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewcheckboxText: {
    marginLeft: 10,
  },
  viewor: {
    alignSelf: 'center',
  },
});

export default Register;
