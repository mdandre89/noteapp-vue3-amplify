import Amplify from 'aws-amplify';
import { createApp } from 'vue';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';
import App from './App.vue';
import router from './router';
import awsExports from './aws-exports';

Amplify.configure(awsExports);
applyPolyfills().then(() => {
  defineCustomElements(window);
});

const app = createApp(App).use(router);
app.mount('#app');
