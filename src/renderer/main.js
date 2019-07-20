import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';

import api from './config/api';

import 'css/reset.css';
import 'css/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.api = api;

Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: require('./assets/img/error.jpg'),
    loading: require('./assets/img/loading.gif'),
})

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: '<App/>'
}).$mount('#app')
