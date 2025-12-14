<template>
  <h3 :class="headingSizes"><slot /></h3>
</template>

<script>
import festival23HeadingSizes from '~/mixins/festival23HeadingSizes'

export default {
  name: 'Festival23H3',
  mixins: [festival23HeadingSizes]
}
</script>

<style scoped>

</style>
