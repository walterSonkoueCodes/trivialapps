import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translations: require('./locales/en/common.json') },
        fr: { translations: require('./locales/fr/common.json') },
        de: { translations: require('./locales/de/common.json') }
    }
});

export default i18n;