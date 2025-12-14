<template>
  <Container>
    <Space :sm="true" />
    <CursorInteractInside>
      <div class="seen-feature-text" v-html="layout.text" />
    </CursorInteractInside>
    <Space :sm="true" />
  </Container>
</template>

<script>
import layout from '~/mixins/layout'
import CursorInteractInside from '~/components/global/CursorInteractInside'

export default {
  name: 'SeenFeaturedText',
  components: { CursorInteractInside },
  mixins: [layout]
}
</script>

<style>
.seen-feature-text {
  @apply text-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-seen_serif_light mx-auto md:leading-tight lg:leading-tight xl:leading-tight font-light;
}

.seen-feature-text a {
  @apply underline;
}
</style>
