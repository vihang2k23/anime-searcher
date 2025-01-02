import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import vuetify from './plugins/vuetify';
import router from './router';
import App from './App.vue';
// Vuetify imports
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify); 
app.mount('#app');
