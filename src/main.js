import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')



// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//FontAwesome
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { faStar as emptyStar} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faStar, emptyStar)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

//Flags Library
import LangFlag from 'vue-lang-code-flags';
Vue.component('lang-flag', LangFlag);



