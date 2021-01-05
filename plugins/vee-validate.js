import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import ru from 'vee-validate/dist/locale/ru.json'

// Install English and Arabic locales.
localize({ en, ru })

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
