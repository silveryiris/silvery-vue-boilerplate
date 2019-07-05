import Vue from "vue/dist/vue.runtime.esm"
import VueMeta from "vue-meta"
import VueRouter from "vue-router"
import router from "./router.js"
import store from "./store/index.js"
import App from "./App.vue"

// include global styles
import "normalize.css"
import "./styles/main.styl"

Vue.use(VueRouter)
Vue.use(VueMeta)

const app = new Vue({ router, el: "#app", store, render: h => h(App) })

export default app
