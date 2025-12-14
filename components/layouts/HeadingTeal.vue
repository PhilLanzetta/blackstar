<template>
  <div class="bg-teal text-white py-6">
    <Container>
      <h2 class="text-5xl font-medium" v-html="layout.heading" />
    </Container>
  </div>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'HeadingTeal',
  mixins: [layout]
}
</script>

<style scoped>

</style>
