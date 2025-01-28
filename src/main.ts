import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/styles/index.scss";

import router from "./router";

const app = createApp(App);

app.use(router);
/** 导入全部Element-icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.mount("#app");
