import { store } from '@lib/store/store';
import TH from './th'
import EN from './en'

export function I18n() {
  const language = store.getState().i18n.language;

  return language === 'th' ? TH : EN;
}
