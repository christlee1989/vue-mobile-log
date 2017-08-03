import Vue from 'vue'
import App from './App'
import Vlog from './index'

Vue.use(Vlog,{
    level:'error',
    env:'development'
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
