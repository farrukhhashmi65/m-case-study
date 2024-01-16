
import i18n from 'i18next'
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart'; 
import { base, themePalettes } from "../config/theme";
import { Countries } from './constants';

export const setLanguage = async (languageKey: string) => {
    const isNewLanguageRTL = i18n.dir(languageKey) === 'rtl';
    
    const isCurrentLayoutRTL = I18nManager.isRTL;
    
    const isLayoutChangeNeeded = isCurrentLayoutRTL !== isNewLanguageRTL;
   
    i18n.changeLanguage(languageKey)
    if (isLayoutChangeNeeded) {    
        I18nManager.forceRTL(isNewLanguageRTL); // successful, since otherwise, the new
        RNRestart.restart();                    // language would not apply after restart.
    }
};

export const getTheme = (country?: string) => {
  switch (country) {
    case Countries.UAE:
      return { ...base, ...themePalettes.orange }
    case Countries.India:
      return { ...base, ...themePalettes.blue }
    case Countries.Pakistan:
      return { ...base, ...themePalettes.green }
    case Countries.Oman:
      return { ...base, ...themePalettes.cyan }
    default:
      return { ...base, ...themePalettes.teal };
  }
}
