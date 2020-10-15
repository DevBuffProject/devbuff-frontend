import Vue from 'vue'
import '~storybook';

import * as components from '../components';
Object.keys(components).forEach(name => Vue.component(name, components[name]))

export const parameters = {}