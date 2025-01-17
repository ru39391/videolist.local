import { createApp } from 'vue';
import App from './App.vue';
import piniaStore from './store';
import router from './router';

const app = createApp(App);

app.use(piniaStore);
app.use(router);
app.mount('#app')
