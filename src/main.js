// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuescroll from 'vuescroll'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/style/global.scss"
import './permission.js'
import './utils/filter.js'
import VCharts from 'v-charts'
import { pca, pcaa } from 'area-data'
import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'
// 图片放大
import imageViewer from './components/vue-imageViewer-master/index'
import handlingTitle from '@/components/handlingTitle/index'
Vue.component('handlingTitle', handlingTitle)
Vue.use(imageViewer)

Vue.use(VueAreaLinkage)
Vue.config.productionTip = false
Vue.prototype.$pca = pca;
Vue.prototype.$pcaa = pcaa;
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(vuescroll,{
  ops: {
    vuescroll: {
      mode: 'native',
    },
    scrollPanel: {
      scrollingX: false
    },
    bar: {
      background: '#e2dffa'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  watch: {
    $route(to){
      let title = to.name
      if(title==''){
        title = '首页'
      }
      document.title = `${title}-非客系统`
    }
  }
})
