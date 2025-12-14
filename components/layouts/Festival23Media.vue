<template>
  <Container>
    <Festival23BoxMask>
      <Festival23MediaItem :media="layout.media" />
    </Festival23BoxMask>
  </Container>
</template>

<script>
import layout from '~/mixins/layout'

export default {
  name: 'Festival23Media',
  mixins: [layout]
}
</script>

<style scoped>

</style>
