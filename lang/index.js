import {languagesLocalization} from './common/languagesLocalization'
import {englishLocalization} from './en'
import {russianLocalization} from './ru'

export default {
  en: {...englishLocalization, ...languagesLocalization},
  ru: {...russianLocalization, ...languagesLocalization},
};

