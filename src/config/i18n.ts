/* eslint-disable */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import english from '../localization/en.json'
import french from '../localization/fr.json'
import russian from '../localization/ru.json'

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: {
          ...english,
        }
      },
      ru: {
        translation: {
          ...russian,
        }
      },
      fr: {
        translation: {
          ...french,
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
