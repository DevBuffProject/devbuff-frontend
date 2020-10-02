import {languagesLocalization} from './common/languagesLocalization'
import {englishLocalization} from './en'
import {russianLocalization} from './ru'

export let localeConfiguration = {
  en: {...englishLocalization, ...languagesLocalization},
  ru: {...russianLocalization, ...languagesLocalization},
};

