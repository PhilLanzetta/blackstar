<template>
  <Container>
    <div :class="{'max-w-3xl mx-auto reduced-container': layout.reduced_container}">
      <SeenFullWidthMedia :layout="layout" />
    </div>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'SeenContainedMedia',
  mixins: [layout]
}
</script>

<style>
</style>
