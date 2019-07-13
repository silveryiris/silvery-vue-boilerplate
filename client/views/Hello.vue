<template lang="pug">
main.hello.center-layout
  section.hello__section
    .hello__title.title Hello world!
    .hello__content This is a basic boilerplate page
    button.button.theme-switch__button(type="button" @click="toggleTheme")
      IconPaintcan.icon-svg
      span Switch Theme 
    
  section.hello__section
    .hello__display
      .title.hello__list-title Data Display
      .hello__list-item
        | Color Primary : 
        span.color--primary {{ primaryColor }}
      .hello__list-item
        | Color Accent : 
        span.color--accent {{ accentColor }}
      .hello__list-item
        | Base Width : 
        span {{ baseWidth }}  
      .hello__list-item
        | Current Theme : 
        span(:class="[{dark:(this.theme === 'dark')},{light:(this.theme === 'light')}]") {{ theme }}

  section.hello__section
    router-link.link(to="/404") 404 Not Found Page

  Footer
</template>
<style lang="stylus">
.hello
  &__section
    margin 2rem 0 1rem 0
    text-align center

  &__display
    margin 0 auto
    padding 0
    width 250px
    text-align left

  &__title
    color var(--color-primary)
    font-size 2rem

  &__content
    margin 0.75rem 0
    color var(--color-accent)

  &__list-title
    margin 1.5rem 0
    font-size 1.25rem

  &__list-item
    display block
    margin 1rem 0
    padding 0 1.5rem

@media screen and (max-width: 768px)
  .hello
    &__display
      text-align center

@media screen and (max-width: 480px)
  .hello
    &__display
      width 100%

    &__section
      margin 1rem 0
</style>
<script>
import ThemeManager from "../helpers/ThemeManager.js"
import { mapState } from "vuex"
import Footer from "../components/Footer.vue"
import IconPaintcan from "@primer/octicons/build/svg/paintcan.svg"

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
  components: { Footer, IconPaintcan },
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


