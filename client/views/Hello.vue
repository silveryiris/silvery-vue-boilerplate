<template lang="pug">
main.hello.center-layout
  section.hello__section
    .hello__title.title Hello world!
    .hello__content This is a basic boilerplate page
    button.button.theme-switch__button(type="button" @click="toggleTheme") Switch Theme 
    
  section.hello__section
    .hello__display
      .title Data Display
      p 
        | Color Primary : 
        span.color--primary {{ primaryColor }}
      p 
        | Color Accent : 
        span.color--accent {{ accentColor }}
      p
        | Base Width : 
        span {{ baseWidth }}  
      p 
        | Current Theme : 
        span(:class="[{dark:(this.theme === 'dark')},{light:(this.theme === 'light')}]") {{ theme }}

  section.hello__section
    router-link.link(to="/404") 404 Not Found Page

  section.hello__section
    a.link(href="https://github.com/silveryiris/silvery-vue-boilerplate") Github
</template>
<style lang="stylus">
.hello
  &__section
    margin 2rem 0 1rem 0
    text-align center

  &__display
    margin 0 auto
    padding 0 1rem
    width 250px
    text-align left

  &__title
    color var(--color-primary)
    font-size 2rem

  &__content
    margin 0.75rem 0
    color var(--color-accent)

@media screen and (max-width: 768px)
  .hello
    &__display
      text-align center

@media screen and (max-width: 480px)
  .hello
    &__display
      width 100%
</style>
<script>
import ThemeManager from "../helpers/ThemeManager.js"
import { mapState } from "vuex"

export default {
  metaInfo: {
    titleTemplate: "%s - home",
    meta: [{ name: "Description", content: "Hello World!" }]
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize)
  },
  computed: {
    ...mapState({ theme: state => state.theme.theme }),
    themeSelector() {
      return this.theme === "dark" ? "[data-theme='dark']" : null
    },
    baseWidth() {
      const dummyForUpdateTrigger = this.innerWidth
      dummyForUpdateTrigger > 1 ? null : undefined
      return this.getStyleValue("--root-desktop-width", dummyForUpdateTrigger)
    },
    primaryColor() {
      return this.getStyleValue("--color-primary", this.themeSelector)
    },
    accentColor() {
      return this.getStyleValue("--color-accent", this.themeSelector)
    }
  },
  data: () => ({ innerWidth: null }),
  methods: {
    handleWindowResize() {
      this.innerWidth = window.innerWidth
    },
    getStyleValue(key, selector = null) {
      const bodyNode = document.querySelector("body")
      return window.getComputedStyle(bodyNode, selector).getPropertyValue(key)
    },
    toggleTheme() {
      const bodyNode = document.querySelector("body")
      const tm = new ThemeManager(bodyNode)
      const theme = tm.getCurrentTheme()
      const toggleKey = theme === "dark" ? "light" : "dark"
      tm.applyTheme(toggleKey)
      this.$store.dispatch("changeTheme", toggleKey)
    }
  }
}
</script>


