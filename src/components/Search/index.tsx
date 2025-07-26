import {View, TextInput, Image, StyleSheet} from 'react-native';
import React from 'react';

type SearchParams = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
};

export default function Search({
  placeholder = 'ค้นหา...',
  onChangeText = () => {},
}: SearchParams) {
  return (
    <View style={styles.viewInput}>
      <View style={styles.search}>
        <Image
          style={styles.searchIcon}
          source={require('../../../assets/image/search.png')}
        />
      </View>

      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor={'#FFF'}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    width: '100%',
    borderRadius: 10,
    height: 52,
    borderColor: '#FFF',
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  search: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
  searchInput: {
    width: '90%',
    height: 52,
    padding: 10,
    color: '#FFF',
    fontFamily: 'Prompt-Regular',
  },
  searchIcon: {width: 18, height: 18},
});
