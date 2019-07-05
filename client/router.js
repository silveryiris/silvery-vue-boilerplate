import VueRouter from "vue-router"
import Hello from "./views/Hello.vue"
import HttpError404 from "./views/HttpStatus/Error404.vue"
import ThemeManager from "./helpers/ThemeManager.js"
import store from "./store/index.js"

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Hello, beforeEnter: persistTheme },
    { path: "*", component: HttpError404, beforeEnter: persistTheme }
  ]
})

function persistTheme(to, from, next) {
  const bodyNode = document.querySelector("body")
  const tm = new ThemeManager(bodyNode)
  tm.applyPresistentTheme()
  store.dispatch("changeTheme", tm.getCurrentTheme())
  next()
}

export default router
