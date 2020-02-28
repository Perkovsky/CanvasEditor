import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import * as fb from 'firebase/app'
import VueCookies from 'vue-cookies'
import VuetifyConfirm from 'vuetify-confirm'

Vue.use(VueCookies)

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
  created () {
    var firebaseConfig = {
      apiKey: process.env.VUE_APP_API_KEY,
      authDomain: process.env.VUE_APP_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_DATABASE_URL,
      projectId: process.env.VUE_APP_PROJECT_ID,
      storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_APP_ID
    }
    // Initialize Firebase
    fb.initializeApp(firebaseConfig)
  }
}).$mount('#app')
