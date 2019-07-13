<template lang="pug">
 main.http-error-404.center-layout
  section.http-error-404__section
    .http-error-404__main-title.title 404 Not Found
    picture.http-error-404__cat-image
      source(:srcset="mainImageUrl" type="image/jpeg" )
      img(src="/img/default.jpg" alt="404 not found")

  section.http-error-404__section
    router-link.link.http-error-404__go-home(to="/")
      IconRocket.icon-svg
      span Go back to home page.

  Footer
</template>
<style lang="stylus">
.http-error-404
  &__section
    padding 1rem 0
    text-align center

  &__main-title
    font-size 3rem

  &__cat-image
    display block
    height 425px

    &:hover
      filter invert(100%) sepia(50%)

    img
      background var(--color-image-placeholder)

  &__go-home
    display flex
    justify-content center

@media screen and (max-width: 768px)
  .http-error-404
    &__cat-image
      width 100%
      height auto

      img
        width 100%
</style>
<script>
import Footer from "../../components/Footer.vue"
import IconRocket from "@primer/octicons/build/svg/rocket.svg"

export default {
  metaInfo: {
    titleTemplate: "%s - 404",
    meta: [{ name: "Description", content: "There is No content with this url, sorry." }]
  },
  components: { Footer, IconRocket },
  data: () => ({
    mainImageUrl: "https://i.imgur.com/GRoqrOu.jpg"
  })
}
</script>
