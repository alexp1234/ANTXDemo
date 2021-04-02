import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import {MdButton, MdInput, MdFile, MdToolbar} from 'vue-material/dist/components'
import VueMaterial from 'vue-material'

Vue.config.productionTip = false
// Vue.use(MdButton)
// Vue.use(MdInput)
// Vue.use(MdFile)
// Vue.use(MdToolbar)
Vue.use(VueMaterial)

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

let app
  if (!app) {
    app = new Vue({
      store,
      render: h => h(App)
    }).$mount('#app')
  }