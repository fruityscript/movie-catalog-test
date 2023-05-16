import { createApp } from "vue";

import "vuetify/styles";
import store from "./store";
import router from "./router";

import "./assets/styles/app.scss";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

const vuetifyLib = require("vuetify");
const iconsetsFa = require("vuetify/iconsets/fa");
const iconsetsMdi = require("vuetify/iconsets/mdi");
const components = require("vuetify/components");
const directives = require("vuetify/directives");
const Vue3Mq = require("vue3-mq");
const App = require("./App.vue");

const fa = iconsetsFa;
const { aliases, mdi } = iconsetsMdi;

const vuetify = vuetifyLib.createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);
app.component("mq-responsive", Vue3Mq.MqResponsive);
app.mount("#app");

// Responsive Options
Vue3Mq.updateBreakpoints({
  preset: "vuetify",
});
