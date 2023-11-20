import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App).component('font-awesome', FontAwesomeIcon).mount('#app')
