import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Typography from '@component/Typography';
import {I18n} from '@utils/i18n';

export type TotalParam = {
  data: string;
  header: string;
};

export default function Board({data, header}: TotalParam) {
  return (
    <>
      {header && <Typography text={header} />}
      <View style={styles.details}>
        <View style={[styles.items, {paddingVertical: 12}]}>
          <View style={[styles.color]}>
            <Text style={styles.textlabel}>
              {data} {I18n().baht}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  items: {
    width: '75%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    width: '100%',
    backgroundColor: '#FFFFFF70',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  textlabel: {
    fontFamily: 'Prompt-Regular',
    fontSize: 16,
    color: '#000',
  },
});
