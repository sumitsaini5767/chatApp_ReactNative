import i18n from '../localization/i18n';
import { setLanguage } from '../localStorage/mmkv';

export const changeAppLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  setLanguage(lang);
};