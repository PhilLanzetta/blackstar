<template>
  <Festival23MediaItem :media="layout.media" :cinema="true" />
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival23MediaHero',
  mixins: [layout]
}
</script>

<style scoped>

</style>
