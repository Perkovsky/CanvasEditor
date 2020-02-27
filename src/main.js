import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
// import * as fb from 'firebase/app'
import VuetifyConfirm from 'vuetify-confirm'

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'OK',
  buttonFalseText: 'Cancel',
  color: 'warning',
  icon: 'mdi-warning',
  title: 'Warning',
  width: 300,
  property: '$confirm'
})

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
