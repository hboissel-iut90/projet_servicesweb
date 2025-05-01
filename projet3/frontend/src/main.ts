import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {createVuetify} from 'vuetify';

import App from './App.vue';
import router from './router';

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import 'vuetify/styles'; // Vuetify styles obligatoires
import '@mdi/font/css/materialdesignicons.css'; // Icônes MDI
import './assets/main.css'; // Tes styles perso

// Création de Vuetify avant tout
const vuetify = createVuetify({
  components,
  directives,
});

// Création de l'app Vue
const app = createApp(App);

// Utilisation des plugins
app.use(createPinia());
app.use(router);
app.use(vuetify);

// Montage final
app.mount('#app');
