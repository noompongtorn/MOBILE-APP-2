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

const EditProfile = () => {
  const [formState, setFormState] = useState({
    fullname: '',
    username: '',
    password: '',
    repassword: '',
    telephone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [checkBox, setCheckBox] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<LeagueDetailScreenNavigationProp>();

  const schema = z.object({
    telephone: z
      .string()
      .regex(/^\d+$/, {message: 'Telephone must contain only numbers.'}),
    email: z.string().email({message: 'Invalid email address.'}),
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

    const response = await authRegister({
      data: {
        ...formState,
        firstName: formState.fullname.split(' ')[0],
        lastName: formState.fullname.split(' ')[1],
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
          labelText={I18n().fullname}
          value={formState.fullname}
          onChangeText={value => handleChange('fullname', value)}
          placeholder={`${I18n().fullname}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.fullname}
        />

        <TextField
          labelIcon={Profile}
          labelText={I18n().telephone}
          value={formState.telephone}
          onChangeText={value => handleChange('telephone', value)}
          placeholder={`${I18n().telephone}...`}
          placeholderTextColor="#FFF"
          errorMessage={errors.telephone}
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

        <Button text={I18n().confirm} onPress={handleSubmit} />
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

export default EditProfile;
