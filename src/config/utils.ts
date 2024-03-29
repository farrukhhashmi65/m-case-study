
import i18n from 'i18next'
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { base, themePalettes } from "../config/theme";
import { Countries } from './constants';
import { AxiosError, AxiosResponse } from 'axios';
import SecureStore, { ACCESSIBLE } from "react-native-secure-key-store";

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

export const handleAxiosErrorMessage = (error: AxiosError) => {
  const axiosError = error as AxiosError;
  const response: AxiosResponse<any> | undefined = axiosError.response;
  const errorMessage = response?.data?.message || "Network Error";
  
  return errorMessage;
 
}


export const setKeyStore = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.set(key, value, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
  } catch (error) {
    throw error;
  }
};

// Function to retrieve the username securely
export const getKeyStore = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.get(key);
    return value || null;
  } catch (error) {
    throw error;
  }
};

// Function to delete the saved username
export const deleteKeyStore = async (key: string): Promise<void> => {
  try {
    await SecureStore.remove(key);
  } catch (error) {
    throw error;
  }
};

