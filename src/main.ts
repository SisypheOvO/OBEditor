import { createApp } from "vue"
import { createPinia } from "pinia"
import "./styles/index.css"
import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).mount("#app")
